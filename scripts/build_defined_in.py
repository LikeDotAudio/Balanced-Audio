#!/usr/bin/env python3
"""
build_defined_in.py — Index of which standard defines which term (and in which clause).

Reads the private standards texts in .env/standards_markdown (gitignored) and writes
js/defined-in-index.js containing ONLY term names, document names and clause numbers —
never the standards' definition text, which is copyrighted and must not be published.

Sources:
  * each standard's own definitions clause ("3 Definitions" / "3 Terms and definitions")
  * the AES-X152 draft's consolidated definitions list (clause 5), whose entries cite their
    source standard, e.g. "bond (noun) (AES54-2-3.18)"

Usage: python3 scripts/build_defined_in.py
"""

import json
import re
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
SRC = BASE / ".env" / "standards_markdown"
OUT = BASE / "js" / "defined-in-index.js"

# Standards whose own definitions clause is parsed: file name -> document label
STANDARD_FILES = {
    "aes14-1992-s2014-f.md": "AES14",
    "aes26-2001-s2017-f.md": "AES26",
    "aes59-2012-f__For_CBC_use_only_Do_not_distribute.md": "AES59",
    "aes72-2019-f.md": "AES72",
    "Collection - #AES - #AES11 aes11-2009-r2014-f.md": "AES11",
    "IEC-61938_2018_CDV.md": "IEC 61938",
}
X152_FILE = "AES-SC-05-05-X152-20220122.md"


def norm_doc(raw):
    """'AES 48' -> 'AES48', 'AES 14id' -> 'AES14id', 'IEC 61938' kept spaced."""
    raw = raw.strip()
    if raw.upper().startswith("IEC"):
        return "IEC " + re.sub(r"^IEC\s*", "", raw, flags=re.I)
    return re.sub(r"\s+", "", raw)


def clean_term(t):
    t = re.sub(r"[*_`#]", "", t).strip(" .:-–—\t")
    return re.sub(r"\s+", " ", t)


def definitions_section(text):
    """Text of clause 3 (definitions) up to clause 4."""
    m = re.search(r"^(?:##\s*)?(?:\d+\s+)?3\s+(?:Terms and definitions|Definitions)[^\n]*$", text, re.M | re.I)
    # skip the table-of-contents hit (dotted leaders) and take the real heading
    hits = [h for h in re.finditer(r"^(?:##\s*)?(?:\d+\s+)?3\s+(?:Terms and definitions|Definitions)[^\n]*$", text, re.M | re.I)
            if "...." not in h.group(0)]
    if not hits:
        return ""
    start = hits[0].end()
    end = re.search(r"^(?:##\s*)?(?:\d+\s+)?4\s+[A-Z]", text[start:], re.M)
    return text[start:start + end.start()] if end else text[start:start + 20000]


def parse_standard(text, doc):
    """'3.2' then the term on the same or next line."""
    entries = []
    lines = text.splitlines()
    for i, line in enumerate(lines):
        m = re.match(r"^\s*(?:###\s*)?(?:\d+\s+)?(3\.\d+(?:\.\d+)?)\b\s*(.*)$", line)
        if not m:
            continue
        clause, clause_rest = m.group(1), m.group(2).strip()
        term = clause_rest
        if not term:
            for nxt in lines[i + 1:i + 4]:
                cand = re.sub(r"^\s*(?:##\s*)?\d+\s+", "", nxt).strip()
                if cand:
                    term = cand
                    break
        term = clean_term(term)
        # a definition sentence is not a term
        if term and len(term) <= 60 and not re.match(r"^(shall|is|the|a|an)\b", term, re.I):
            entries.append({"term": term, "doc": doc, "clause": clause})
    return entries


def parse_x152(text):
    """Consolidated list: 'N. term (SOURCE-clause) definition…'."""
    entries = []
    sec = text[text.find("5. Definitions and abbreviation"):]
    src = re.compile(r"\((AES\s?\d+(?:id)?(?:-\d+)?|IEC\s?\d+(?:-\d+)?)-(\d+(?:\.\d+)+)\)")
    for m in re.finditer(r"^\s*\d+\.\s+(.+)$", sec, re.M):
        line = m.group(1)
        s = src.search(line)
        if not s:
            continue
        term = clean_term(line[:s.start()])
        term = re.sub(r"\s*\((?:noun|adjective|verb)[^)]*\)\s*$", "", term, flags=re.I)
        if term and len(term) <= 60:
            entries.append({"term": term, "doc": norm_doc(s.group(1)), "clause": s.group(2)})
    return entries


def key_of(term):
    k = term.lower()
    k = re.sub(r"\([^)]*\)", " ", k)
    k = re.sub(r"^(the|a|an)\s+", "", k.strip())
    k = re.sub(r"[-/–]", " ", k)
    k = re.sub(r"[^a-z0-9 ]", "", k)
    k = re.sub(r"\s+", " ", k).strip()
    return k[:-1] if k.endswith("s") and len(k) > 4 else k


def main():
    if not SRC.exists():
        print(f"    {SRC.relative_to(BASE)} not found; keeping existing {OUT.relative_to(BASE)}")
        return
    entries = []
    for fname, doc in STANDARD_FILES.items():
        p = SRC / fname
        if p.exists():
            entries += parse_standard(definitions_section(p.read_text(encoding="utf-8", errors="ignore")), doc)
    p = SRC / X152_FILE
    if p.exists():
        entries += parse_x152(p.read_text(encoding="utf-8", errors="ignore"))

    index = {}
    for e in entries:
        k = key_of(e["term"])
        if not k:
            continue
        slot = index.setdefault(k, {"term": e["term"], "refs": []})
        ref = {"doc": e["doc"], "clause": e["clause"]}
        if ref not in slot["refs"]:
            slot["refs"].append(ref)
    for slot in index.values():
        slot["refs"].sort(key=lambda r: (r["doc"], [int(x) for x in r["clause"].split(".")]))

    OUT.write_text(
        "/**\n * Defined-in index: which standard defines each term, and in which clause.\n"
        " * Generated by scripts/build_defined_in.py from the standards texts (term names and clause\n"
        " * numbers only; definition text is not reproduced).\n */\n\n"
        "const DEFINED_IN_INDEX = " + json.dumps(index, indent=1, ensure_ascii=False) + ";\n",
        encoding="utf-8",
    )
    docs = sorted({r["doc"] for s in index.values() for r in s["refs"]})
    print(f"    Indexed {len(index)} defined terms across {len(docs)} documents: {', '.join(docs)}")


if __name__ == "__main__":
    main()
