#!/usr/bin/env python3
"""
build.py — Unified Master Build System for Balanced Audio & AES-X152 Reference Portal
(c) 2026 Audio Engineering Society SC-05-05 Standards Working Group

Usage:
    python3 build.py [SNAPSHOT_TIMESTAMP] [-m "commit message"] [--no-push]

After a successful build the changes are committed and pushed to GitHub (main),
which also redeploys the GitHub Pages site. Pass --no-push to only build.

This script performs the complete end-to-end build pipeline:
  1. Ingests, validates, and parses all 100 Markdown modules in modules/
  2. Generates CSV catalogs:
       - modules.csv (root)
       - modules/modules.csv
       - modules/parts_summary.csv
  3. Generates JSON manifests & client-side datasets:
       - modules/modules-manifest.json
       - js/modules-data.js
  4. Generates a standalone illustrated textbook:
       - modules/curriculum.html
  5. Stitches all CSS, JS engines, SVG icons, datasets, and markup into 100%
     self-contained standalone distribution HTML files:
       - index.html
       - index.htm
       - INDEX.htm-YYYYMMDD-HHMM.html
"""

from datetime import datetime
import csv
import glob
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
MODULES_DIR = BASE_DIR / "modules"
CSS_PATH = BASE_DIR / "css" / "style.css"
SRC_HTML_PATH = BASE_DIR / "index.src.html"

SCRIPTS_ORDER = [
    "js/ltp-fader.js",
    "js/audio-analyzer.js",
    "js/signal-generator.js",
    "js/story-sidebar.js",
    "js/print-report.js",
    "js/floating-meters.js",
    "js/spice-view.js",
    "js/posters.js",
    "js/eight-channel-bench.js",
    "js/tree-data.js",
    "js/tree-viewer.js",
    "js/simulators.js",
    "js/definition-sims.js",
    "js/circuit-animator.js",
    "js/circuit-overlay.js",
    "js/multichannel-breakout.js",
    "js/adapter-wiring.js",
    "js/xlr-hub.js",
    "js/transformer-sim.js",
    "js/vst-standards.js",
    "js/datasheet-generator.js",
    "js/defined-in-index.js",
    "js/par-glossary.js",
    "js/landmark-papers.js",
    "js/review-comments.js",
    "js/modules-data.js",
    "js/modules-viewer.js",
    "js/activity-wayfinding.js",
    "js/hess-wiring.js",
    "js/main.js",
]

def parse_yaml_frontmatter(text):
    """Simple robust YAML parser for frontmatter without external dependencies."""
    if not text.startswith("---"):
        return {}, text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return {}, text
    fm_raw = parts[1].strip()
    body = parts[2].strip()

    meta = {}
    for line in fm_raw.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if ":" in line:
            key, val = line.split(":", 1)
            key = key.strip()
            val = val.strip()
            if val.startswith('"') and val.endswith('"'):
                val = val[1:-1]
            elif val.startswith("'") and val.endswith("'"):
                val = val[1:-1]
            elif val.startswith("[") and val.endswith("]"):
                try:
                    val = json.loads(val)
                except Exception:
                    val = [x.strip().strip('"').strip("'") for x in val[1:-1].split(",") if x.strip()]
            elif val.isdigit():
                val = int(val)
            meta[key] = val
    return meta, body

def extract_markdown_sections(body):
    """Extract standard sections from module markdown body."""
    sections = {}
    current_sec = "intro"
    current_lines = []

    for line in body.splitlines():
        sec_match = re.match(r"^##\s+(?:[0-9]+\.\s+)?(.+)", line)
        if sec_match:
            if current_lines:
                sections[current_sec] = "\n".join(current_lines).strip()
            current_sec = sec_match.group(1).strip().lower()
            current_lines = []
        else:
            current_lines.append(line)
    if current_lines:
        sections[current_sec] = "\n".join(current_lines).strip()
    return sections

def md_to_html(md_text):
    """Convert Markdown text to clean semantic HTML without external dependencies."""
    html = md_text

    # Escape HTML special chars inside code blocks first
    code_blocks = []
    def save_code_block(match):
        code_content = match.group(1)
        # Escape code content
        code_escaped = (code_content
            .replace('&', '&amp;')
            .replace('<', '&lt;')
            .replace('>', '&gt;'))
        idx = len(code_blocks)
        code_blocks.append(f'<pre class="module-code-block"><code>{code_escaped}</code></pre>')
        return f"__CODE_BLOCK_{idx}__"

    html = re.sub(r'```(?:\w+)?\n([\s\S]*?)```', save_code_block, html)

    # Inline code
    html = re.sub(r'`([^`]+)`', r'<code>\1</code>', html)

    # Headers
    html = re.sub(r'^### (.*)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'^## (.*)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^# (.*)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)

    # Blockquotes
    html = re.sub(r'^> (.*)$', r'<blockquote>\1</blockquote>', html, flags=re.MULTILINE)

    # Bold and Italic
    html = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', html)
    html = re.sub(r'\*(.*?)\*', r'<em>\1</em>', html)

    # Horizontal Rules
    html = re.sub(r'^---$', r'<hr class="module-divider"/>', html, flags=re.MULTILINE)

    # Lists
    def format_lists(text):
        lines = text.splitlines()
        in_list = False
        out = []
        for line in lines:
            if line.strip().startswith("- "):
                if not in_list:
                    out.append("<ul>")
                    in_list = True
                out.append(f"  <li>{line.strip()[2:]}</li>")
            else:
                if in_list:
                    out.append("</ul>")
                    in_list = False
                out.append(line)
        if in_list:
            out.append("</ul>")
        return "\n".join(out)

    html = format_lists(html)

    # Paragraphs (lines separated by double newlines)
    paragraphs = []
    for para in html.split("\n\n"):
        para = para.strip()
        if not para:
            continue
        if para.startswith("<h") or para.startswith("<blockquote") or para.startswith("<pre") or para.startswith("<ul") or para.startswith("<hr"):
            paragraphs.append(para)
        else:
            paragraphs.append(f"<p>{para.replace(chr(10), '<br/>')}</p>")
    html = "\n\n".join(paragraphs)

    # Restore code blocks
    for idx, cb in enumerate(code_blocks):
        html = html.replace(f"__CODE_BLOCK_{idx}__", cb)

    return html

def parse_all_modules():
    """Load and parse all 100 modules."""
    pattern = str(MODULES_DIR / "module-*.md")
    files = sorted(glob.glob(pattern))
    if len(files) == 0:
        print(f"Error: No module markdown files found matching {pattern}")
        sys.exit(1)

    modules = []
    for fpath in files:
        with open(fpath, "r", encoding="utf-8") as f:
            raw_text = f.read()

        meta, body = parse_yaml_frontmatter(raw_text)
        sections = extract_markdown_sections(body)
        word_count = len(body.split())

        mod_entry = {
            "num": meta.get("module_number", 0),
            "id": meta.get("module_id", f"MOD-{meta.get('module_number', 0):03d}"),
            "title": meta.get("title", "Untitled Module"),
            "part": meta.get("part_number", 1),
            "partTitle": meta.get("part_title", "General"),
            "slug": meta.get("slug", Path(fpath).stem),
            "filename": Path(fpath).name,
            "filepath": str(fpath),
            "tags": meta.get("tags", []),
            "standards": meta.get("standards", []),
            "equation": meta.get("key_equation", ""),
            "summary": meta.get("summary", ""),
            "authors": meta.get("authors", []),
            "word_count": word_count,
            "raw_md": raw_text,
            "body_md": body,
            "sections": sections
        }
        modules.append(mod_entry)

    # Sort strictly by module number
    modules.sort(key=lambda m: m["num"])
    return modules

EQUATIONS_DIR = BASE_DIR / "scripts" / "equations"
EQUATIONS_SVG_CACHE = MODULES_DIR / "equations-svg.json"

def render_equation_svgs(modules):
    """Render each module's LaTeX governing equation to a standalone SVG (MathJax via Node).

    Results are cached in modules/equations-svg.json so builds without Node (or without
    `npm install` in scripts/equations) still embed the last rendered SVGs.
    """
    node = shutil.which("node")
    script = EQUATIONS_DIR / "render-equations.mjs"
    if node and (EQUATIONS_DIR / "node_modules" / "mathjax-full").exists():
        with tempfile.TemporaryDirectory() as tmp:
            src = Path(tmp) / "equations.json"
            src.write_text(json.dumps({m["id"]: m["equation"] for m in modules}), encoding="utf-8")
            result = subprocess.run([node, str(script), str(src), str(EQUATIONS_SVG_CACHE)],
                                    capture_output=True, text=True)
            for line in (result.stdout + result.stderr).strip().splitlines():
                print(f"    {line}")
            if result.returncode != 0:
                print("    Equation rendering failed; falling back to cached SVGs.")
    else:
        print("    Node/MathJax not installed (cd scripts/equations && npm install); using cached SVGs.")

    svgs = {}
    if EQUATIONS_SVG_CACHE.exists():
        svgs = json.loads(EQUATIONS_SVG_CACHE.read_text(encoding="utf-8"))
    for m in modules:
        m["equation_svg"] = svgs.get(m["id"], "")
    print(f"    {sum(1 for m in modules if m['equation_svg'])}/{len(modules)} equations have SVG renderings.")

def generate_csv_files(modules):
    """Generate comprehensive CSV files for tabular analysis and reporting."""
    csv_paths = [
        BASE_DIR / "modules.csv",
        MODULES_DIR / "modules.csv"
    ]

    fieldnames = [
        "module_id",
        "module_number",
        "part_number",
        "part_title",
        "title",
        "slug",
        "standards",
        "key_equation",
        "summary",
        "authors",
        "tags",
        "word_count",
        "filename"
    ]

    for p in csv_paths:
        with open(p, "w", encoding="utf-8", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            for m in modules:
                writer.writerow({
                    "module_id": m["id"],
                    "module_number": m["num"],
                    "part_number": m["part"],
                    "part_title": m["partTitle"],
                    "title": m["title"],
                    "slug": m["slug"],
                    "standards": "; ".join(m["standards"]) if isinstance(m["standards"], list) else str(m["standards"]),
                    "key_equation": m["equation"],
                    "summary": m["summary"],
                    "authors": "; ".join(m["authors"]) if isinstance(m["authors"], list) else str(m["authors"]),
                    "tags": "; ".join(m["tags"]) if isinstance(m["tags"], list) else str(m["tags"]),
                    "word_count": m["word_count"],
                    "filename": m["filename"]
                })
        print(f"Generated CSV -> {p.relative_to(BASE_DIR)} ({len(modules)} rows)")

    # Generate parts summary CSV
    parts_map = {}
    for m in modules:
        pt = m["part"]
        if pt not in parts_map:
            parts_map[pt] = {
                "part_number": pt,
                "part_title": m["partTitle"],
                "module_count": 0,
                "total_words": 0,
                "standards_cited": set(),
                "first_mod": m["num"],
                "last_mod": m["num"]
            }
        parts_map[pt]["module_count"] += 1
        parts_map[pt]["total_words"] += m["word_count"]
        parts_map[pt]["last_mod"] = m["num"]
        for s in m["standards"]:
            parts_map[pt]["standards_cited"].add(s)

    parts_csv_path = MODULES_DIR / "parts_summary.csv"
    with open(parts_csv_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "part_number", "part_title", "module_range", "module_count", "total_words", "standards_count", "standards_list"
        ])
        writer.writeheader()
        for pt in sorted(parts_map.keys()):
            info = parts_map[pt]
            writer.writerow({
                "part_number": info["part_number"],
                "part_title": info["part_title"],
                "module_range": f"MOD-{info['first_mod']:03d} to MOD-{info['last_mod']:03d}",
                "module_count": info["module_count"],
                "total_words": info["total_words"],
                "standards_count": len(info["standards_cited"]),
                "standards_list": "; ".join(sorted(list(info["standards_cited"])))
            })
    print(f"Generated CSV -> {parts_csv_path.relative_to(BASE_DIR)} (10 parts summary)")

def generate_manifest_and_js(modules):
    """Generate modules-manifest.json and js/modules-data.js."""
    manifest_path = MODULES_DIR / "modules-manifest.json"
    manifest_data = {
        "title": "Balanced Audio & AES-X152 Master 100-Module Technical Curriculum",
        "total_modules": len(modules),
        "total_words": sum(m["word_count"] for m in modules),
        "build_date": datetime.now().isoformat(),
        "modules": [
            {
                "module_id": m["id"],
                "module_number": m["num"],
                "part_number": m["part"],
                "part_title": m["partTitle"],
                "title": m["title"],
                "slug": m["slug"],
                "filename": m["filename"],
                "tags": m["tags"],
                "standards": m["standards"],
                "equation": m["equation"],
                "summary": m["summary"],
                "authors": m["authors"],
                "word_count": m["word_count"]
            }
            for m in modules
        ]
    }
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest_data, f, indent=2)
    print(f"Generated JSON -> {manifest_path.relative_to(BASE_DIR)}")

    # js/modules-data.js
    js_data_path = BASE_DIR / "js" / "modules-data.js"
    client_modules = [
        {
            "id": m["id"],
            "num": m["num"],
            "title": m["title"],
            "part": m["part"],
            "partTitle": m["partTitle"],
            "slug": m["slug"],
            "filename": m["filename"],
            "tags": m["tags"],
            "standards": m["standards"],
            "equation": m["equation"],
            "equationSvg": m.get("equation_svg", ""),
            "summary": m["summary"],
            "authors": m["authors"],
            "myth": m["sections"].get("myth", m["sections"].get("1. industry misconceptions & the real-world problem", "")),
            "theory": m["sections"].get("theory", m["sections"].get("2. theoretical & physical foundations", "")),
            "math": m["sections"].get("math", m["sections"].get("3. mathematical proof & governing equations", "")),
            "schematic": m["sections"].get("schematic", m["sections"].get("4. technical schematic & circuit topography", "")),
            "takeaways": m["sections"].get("takeaways", m["sections"].get("6. real-world benchmarks & practical takeaways", "")),
            "quiz": m["sections"].get("quiz", m["sections"].get("7. self-assessment & review questions", ""))
        }
        for m in modules
    ]
    with open(js_data_path, "w", encoding="utf-8") as f:
        f.write("/**\n * Balanced Audio & AES-X152 100-Module Reference Curriculum Dataset\n")
        f.write(" * Compiled by build.py on " + datetime.now().strftime("%Y-%m-%d %H:%M") + "\n */\n\n")
        f.write("const BALANCED_MODULES_DATA = ")
        json.dump(client_modules, f, indent=2)
        f.write(";\n\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = { BALANCED_MODULES_DATA };\n}\n")
    print(f"Generated JS Data -> {js_data_path.relative_to(BASE_DIR)} ({len(client_modules)} modules)")

def generate_standalone_curriculum_html(modules):
    """Generate a dedicated standalone illustrated textbook containing all 100 modules in one HTML file."""
    curriculum_html_path = MODULES_DIR / "curriculum.html"

    module_blocks = []
    current_part = 0

    for m in modules:
        if m["part"] != current_part:
            current_part = m["part"]
            module_blocks.append(f"""
              <div class="part-header-banner" id="part-{current_part}">
                <span class="part-banner-tag">PART {current_part} OF 10</span>
                <h2 class="part-banner-title">{m['partTitle']}</h2>
                <div class="part-banner-rule"></div>
              </div>
            """)

        body_html = md_to_html(m["body_md"])

        module_blocks.append(f"""
          <article class="curriculum-module-article" id="module-{m['num']:03d}">
            <div class="module-article-header">
              <div class="module-article-meta">
                <span class="mod-id-badge">{m['id']}</span>
                <span class="mod-part-badge">Part {m['part']}</span>
                <span class="mod-standards-badge">Normative: {', '.join(m['standards'])}</span>
              </div>
              <h3 class="module-article-title">{m['title']}</h3>
              <p class="module-article-summary">{m['summary']}</p>
              <div class="module-article-equation">
                <strong>Governing Equation:</strong> {m.get('equation_svg') or f"<code>{m['equation']}</code>"}
              </div>
            </div>

            <div class="module-article-body">
              {body_html}
            </div>
            
            <div class="module-article-footer">
              <a href="#curriculum-toc" class="back-to-toc-link">&uarr; Back to Curriculum Table of Contents</a>
            </div>
          </article>
        """)

    toc_items = []
    current_part = 0
    for m in modules:
        if m["part"] != current_part:
            current_part = m["part"]
            toc_items.append(f'<li class="toc-part-item"><strong>Part {current_part}: {m["partTitle"]}</strong><ul>')
        toc_items.append(f'<li><a href="#module-{m["num"]:03d}"><strong>{m["id"]}:</strong> {m["title"]}</a></li>')
        if m["num"] % 10 == 0:
            toc_items.append('</ul></li>')

    toc_html = "\n".join(toc_items)
    all_modules_html = "\n".join(module_blocks)

    doc = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AES-X152 Balanced Audio 100-Module Reference Monograph</title>
  <style>
    :root {{
      --bg: #090d16;
      --bg-card: #111827;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --accent: #38bdf8;
      --border: #1f2937;
    }}
    body {{
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }}
    .curriculum-container {{
      max-width: 1040px;
      margin: 0 auto;
      padding: 2.5rem 1.5rem;
    }}
    header.curriculum-hero {{
      text-align: center;
      padding: 3rem 1rem 2rem;
      border-bottom: 2px solid var(--border);
      margin-bottom: 2.5rem;
    }}
    h1.hero-title {{
      font-size: 2.4rem;
      color: var(--accent);
      margin-bottom: 0.5rem;
    }}
    p.hero-lead {{
      color: var(--text-muted);
      font-size: 1.15rem;
      max-width: 800px;
      margin: 0 auto;
    }}
    nav.curriculum-toc {{
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 2rem;
      margin-bottom: 3.5rem;
    }}
    nav.curriculum-toc h2 {{
      margin-top: 0;
      color: var(--accent);
      font-size: 1.5rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.5rem;
    }}
    .toc-part-item {{
      margin-top: 1rem;
      color: #c084fc;
    }}
    .curriculum-toc ul {{
      padding-left: 1.5rem;
    }}
    .curriculum-toc li {{
      margin: 0.35rem 0;
    }}
    .curriculum-toc a {{
      color: var(--text);
      text-decoration: none;
    }}
    .curriculum-toc a:hover {{
      color: var(--accent);
      text-decoration: underline;
    }}
    .part-header-banner {{
      margin: 4rem 0 2rem;
      padding: 1.25rem 1.5rem;
      background: rgba(168, 85, 247, 0.1);
      border-left: 4px solid #a855f7;
      border-radius: 4px;
    }}
    .part-banner-tag {{
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: #c084fc;
    }}
    .part-banner-title {{
      margin: 0.25rem 0 0;
      font-size: 1.6rem;
      color: #fff;
    }}
    article.curriculum-module-article {{
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 2rem;
      margin-bottom: 2.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }}
    .module-article-header {{
      border-bottom: 1px solid var(--border);
      padding-bottom: 1.25rem;
      margin-bottom: 1.5rem;
    }}
    .mod-id-badge {{
      background: rgba(56, 189, 248, 0.15);
      color: var(--accent);
      border: 1px solid var(--accent);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: bold;
      font-family: monospace;
    }}
    .mod-part-badge {{
      background: rgba(168, 85, 247, 0.15);
      color: #c084fc;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      margin-left: 0.5rem;
    }}
    .mod-standards-badge {{
      color: var(--text-muted);
      font-size: 0.8rem;
      margin-left: 0.75rem;
    }}
    h3.module-article-title {{
      font-size: 1.6rem;
      color: #fff;
      margin: 0.75rem 0 0.5rem;
    }}
    p.module-article-summary {{
      color: var(--text-muted);
      font-size: 1.05rem;
      margin-bottom: 0.75rem;
    }}
    .module-article-equation {{
      background: #090d16;
      border: 1px solid var(--border);
      padding: 0.65rem 1rem;
      border-radius: 6px;
      font-size: 0.95rem;
      color: var(--accent);
    }}
    .module-article-body h2 {{
      color: var(--accent);
      font-size: 1.25rem;
      margin-top: 1.75rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 0.35rem;
    }}
    .module-article-body pre {{
      background: #060910;
      border: 1px solid #1e293b;
      padding: 1.25rem;
      border-radius: 6px;
      overflow-x: auto;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 0.85rem;
      color: #38bdf8;
      line-height: 1.4;
    }}
    .module-article-body blockquote {{
      border-left: 3px solid var(--accent);
      padding: 0.5rem 1rem;
      margin: 1rem 0;
      background: rgba(56, 189, 248, 0.05);
      color: #cbd5e1;
    }}
    .module-article-footer {{
      border-top: 1px solid var(--border);
      margin-top: 2rem;
      padding-top: 1rem;
      text-align: right;
    }}
    .back-to-toc-link {{
      color: var(--accent);
      text-decoration: none;
      font-size: 0.85rem;
    }}
    .back-to-toc-link:hover {{
      text-decoration: underline;
    }}
    @media print {{
      body {{ background: #fff; color: #000; }}
      article.curriculum-module-article {{ page-break-after: always; border: none; box-shadow: none; }}
      .curriculum-toc {{ page-break-after: always; }}
    }}
  </style>
</head>
<body>
  <div class="curriculum-container">
    <header class="curriculum-hero">
      <h1 class="hero-title">Balanced Audio &amp; AES-X152 Reference Curriculum</h1>
      <p class="hero-lead">
        The complete 100-module monograph of audio grounding, common-mode rejection, circuit topologies, 
        and transmission standards compiled into one offline reference document.
      </p>
      <div style="margin-top: 1rem; color: #94a3b8; font-size: 0.9rem;">
        Audio Engineering Society Standards Committee &bull; SC-05-05 Working Group &bull; 100 Modules Verified
      </div>
    </header>

    <nav class="curriculum-toc" id="curriculum-toc">
      <h2>Curriculum Table of Contents (100 Modules)</h2>
      <ul>
        {toc_html}
      </ul>
    </nav>

    <main>
      {all_modules_html}
    </main>

    <footer style="text-align: center; padding: 3rem 0; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 0.9rem;">
      Balanced Audio &amp; AES-X152 Standardized Reference Portal &bull; Audio Engineering Society SC-05-05 Working Group
    </footer>
  </div>
</body>
</html>
"""
    with open(curriculum_html_path, "w", encoding="utf-8") as f:
        f.write(doc)
    sz = os.path.getsize(curriculum_html_path)
    print(f"Generated Standalone Illustrated Monograph -> {curriculum_html_path.relative_to(BASE_DIR)} ({sz:,} bytes / {sz/1024/1024:.2f} MB)")

def data_uri(path):
    """Read a file and return it as a base64 data: URI."""
    import base64
    import mimetypes
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    if path.suffix == ".woff2":
        mime = "font/woff2"
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode("ascii")

def inline_font_css():
    """css/fonts.css with every url(...) font file replaced by a data URI."""
    css_dir = BASE_DIR / "css"
    css = (css_dir / "fonts.css").read_text(encoding="utf-8")
    return re.sub(r"url\(([^)]+\.woff2)\)", lambda m: f"url({data_uri((css_dir / m.group(1)).resolve())})", css)

def bundle_portal(timestamp=None):
    """Compile and bundle modular source files into standalone single-file distribution artifacts."""
    if not CSS_PATH.exists():
        print(f"Error: {CSS_PATH} not found.")
        sys.exit(1)

    source_html_path = SRC_HTML_PATH
    if not source_html_path.exists():
        source_html_path = BASE_DIR / "index.html"

    with open(CSS_PATH, "r", encoding="utf-8") as f:
        css_content = f.read()

    combined_js = []
    for rel_path in SCRIPTS_ORDER:
        full_path = BASE_DIR / rel_path
        if not full_path.exists():
            print(f"Error: script file {full_path} not found.")
            sys.exit(1)
        with open(full_path, "r", encoding="utf-8") as f:
            code = f.read()
            combined_js.append(f"/* ===== BUNDLED: {rel_path} ===== */\n{code}")

    all_js = "\n\n".join(combined_js)

    with open(source_html_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Stamp the document version (shown in the sidebar and on every printed page)
    version = datetime.strptime(timestamp, "%Y%m%d-%H%M") if timestamp else datetime.now()
    html = html.replace('<meta name="doc-version" content="dev">',
                        f'<meta name="doc-version" content="{version:%Y-%m-%d %H:%M}">', 1)

    # 0. Inline fonts: css/fonts.css with each woff2 as a data URI
    fonts_link = '<link rel="stylesheet" href="css/fonts.css">'
    if fonts_link in html:
        html = html.replace(fonts_link, f'<style id="bundled-fonts">\n{inline_font_css()}\n</style>')

    # 1. Inline CSS
    css_link = '<link rel="stylesheet" href="css/style.css">'
    if css_link in html:
        html = html.replace(css_link, f'<style id="bundled-style">\n{css_content}\n</style>')
    elif '<style id="bundled-style">' in html:
        before = html.split('<style id="bundled-style">')[0]
        after = html.split('</style>')[1]
        html = before + f'<style id="bundled-style">\n{css_content}\n</style>' + after

    # 2. Inline JavaScript
    start_marker = '  <script src="js/ltp-fader.js"></script>'
    end_marker = '  <script src="js/main.js"></script>'

    start_idx = html.find(start_marker)
    end_idx = html.find(end_marker)

    if start_idx != -1 and end_idx != -1:
        end_idx += len(end_marker)
        script_replacement = f'  <script id="bundled-application-logic">\n{all_js}\n  </script>'
        bundled_html = html[:start_idx] + script_replacement + html[end_idx:]
    elif '<script id="bundled-application-logic">' in html:
        before = html.split('  <script id="bundled-application-logic">')[0]
        after = html.split('</script>')[-1]
        bundled_html = before + f'  <script id="bundled-application-logic">\n{all_js}\n  </script>' + after
    else:
        print("Error: Could not locate script block markers in HTML source.")
        sys.exit(1)

    # 3. Inline images under assets/ as data URIs
    bundled_html = re.sub(r'src="(assets/[^"]+)"', lambda m: f'src="{data_uri(BASE_DIR / m.group(1))}"', bundled_html)

    # 4. Embed the module Markdown so the "Raw .MD" buttons work offline (js/modules-viewer.js)
    md_files = {p.name: p.read_text(encoding="utf-8") for p in sorted(MODULES_DIR.glob("*.md"))}
    md_json = json.dumps(md_files, ensure_ascii=False).replace("</", "<\\/")
    # (the last </body>: bundled scripts contain "</body>" inside generated-document strings)
    end = bundled_html.rfind("</body>")
    bundled_html = (bundled_html[:end]
                    + f'  <script id="bundled-markdown" type="application/json">{md_json}</script>\n'
                    + bundled_html[end:])

    out_paths = [
        BASE_DIR / "index.htm",
        BASE_DIR / "index.html",
    ]
    if timestamp:
        out_paths.append(BASE_DIR / f"INDEX.htm-{timestamp}.html")

    for path in out_paths:
        with open(path, "w", encoding="utf-8") as f:
            f.write(bundled_html)
        sz = os.path.getsize(path)
        print(f"Bundled successfully -> {path.name} ({sz:,} bytes / {sz / 1024 / 1024:.2f} MB)")

def parse_args(argv):
    """[SNAPSHOT_TIMESTAMP] [-m MESSAGE] [--no-push]"""
    opts = {"ts": None, "message": None, "push": True}
    i = 0
    while i < len(argv):
        a = argv[i]
        if a == "--no-push":
            opts["push"] = False
        elif a in ("-m", "--message") and i + 1 < len(argv):
            opts["message"] = argv[i + 1]
            i += 1
        elif not a.startswith("-") and opts["ts"] is None:
            opts["ts"] = a
        i += 1
    return opts

def push_to_github(message):
    """Commit everything the build changed and push main (GitHub Pages redeploys from it)."""
    def git(*args, check=True):
        return subprocess.run(["git", *args], cwd=BASE_DIR, capture_output=True, text=True, check=check)
    try:
        if not git("status", "--porcelain").stdout.strip():
            print("    Nothing changed; nothing to push.")
            return
        git("add", "-A")
        git("commit", "-m", message)
        out = git("push", "origin", "HEAD:main", check=False)
        if out.returncode == 0:
            print("    Pushed to GitHub (main). The Pages site redeploys in a minute or two.")
        else:
            print("    Push failed (build and commit kept locally):")
            print("    " + (out.stderr.strip() or out.stdout.strip()).replace("\n", "\n    "))
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        print(f"    Could not commit/push: {e}")

def main():
    opts = parse_args(sys.argv[1:])
    ts = opts["ts"] or datetime.now().strftime("%Y%m%d-%H%M")
    print(f"\n================================================================================")
    print(f"   BALANCED AUDIO & AES-X152 MASTER BUILD SYSTEM [{ts}]")
    print(f"================================================================================\n")

    # Step 1: Parse all 100 modules
    print(">>> Step 1: Parsing and validating 100 Markdown modules...")
    modules = parse_all_modules()
    print(f"    Loaded {len(modules)} modules ({sum(m['word_count'] for m in modules):,} total words).")

    # Step 1b: Render governing equations to SVG
    print("\n>>> Step 1b: Rendering governing equations to SVG...")
    render_equation_svgs(modules)

    # Step 1c: Index which standard defines each term (names + clause numbers only)
    print("\n>>> Step 1c: Indexing defined terms across the standards...")
    subprocess.run([sys.executable, str(BASE_DIR / "scripts" / "build_defined_in.py")], check=False)

    # Step 2: Generate CSV files
    print("\n>>> Step 2: Generating CSV catalogs...")
    generate_csv_files(modules)

    # Step 3: Generate JSON manifests & JS data feed
    print("\n>>> Step 3: Generating JSON manifest & JS runtime datasets...")
    generate_manifest_and_js(modules)

    # Step 4: Generate Standalone Illustrated Textbook
    print("\n>>> Step 4: Stitching all 100 modules into standalone publication HTML...")
    generate_standalone_curriculum_html(modules)

    # Step 5: Bundle single-file distribution artifacts
    print("\n>>> Step 5: Bundling all CSS, JS, SVGs, and datasets into distribution HTML...")
    bundle_portal(ts)

    print(f"\n================================================================================")
    print(f"   BUILD COMPLETE: ALL 100 MODULES, CSVs, AND HTML FILES SUCCESSFULLY GENERATED")
    print(f"================================================================================\n")

    # Step 6: Commit and push to GitHub (skipped with --no-push)
    if opts["push"]:
        print(">>> Step 6: Committing and pushing to GitHub...")
        push_to_github(opts["message"] or f"build: {ts}")

if __name__ == "__main__":
    main()
