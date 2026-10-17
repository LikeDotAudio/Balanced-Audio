#!/usr/bin/env python3
"""
Convert all PDF files in .env to clean Markdown (.md) documents.
Extracts text with layout preservation using pdftotext, formats headers,
adds YAML frontmatter, and outputs both alongside each PDF and in .env/standards_markdown.
"""

import os
import re
import subprocess
from pathlib import Path

BASE_DIR = Path("/home/anthony/Documents/GitProjects/Balanced Audio/.env")
MD_EXPORT_DIR = BASE_DIR / "standards_markdown"
MD_EXPORT_DIR.mkdir(parents=True, exist_ok=True)

def clean_text_to_markdown(raw_text: str, filename: str) -> str:
    lines = raw_text.splitlines()
    cleaned = []
    
    # Title inference
    title = filename.replace(".pdf", "").replace("-", " ").replace("_", " ").title()
    
    cleaned.append(f"# {title}\n")
    cleaned.append(f"> **Source File**: `{filename}`  ")
    cleaned.append(f"> **Format**: Auto-converted from AES/IEC Standard PDF  \n")
    cleaned.append("---\n")
    
    in_code_block = False
    
    for line in lines:
        stripped = line.strip()
        
        # Page markers
        if re.match(r'^\s*\f', line) or '\x0c' in line:
            cleaned.append("\n---\n*Page Break*\n---\n")
            line = line.replace('\x0c', '')
            stripped = line.strip()
            
        if not stripped:
            cleaned.append("")
            continue
            
        # Detect headings like "1 Scope", "2 Normative references", "ANNEX A"
        if re.match(r'^(?:[0-9]+\s+[A-Z][A-Za-z0-9\s,\-\(\)]+|ANNEX\s+[A-Z]|FOREWORD|INTRODUCTION)\s*$', stripped):
            cleaned.append(f"\n## {stripped}\n")
        elif re.match(r'^(?:[0-9]+\.[0-9]+\s+[A-Z][A-Za-z0-9\s,\-\(\)]+)\s*$', stripped):
            cleaned.append(f"\n### {stripped}\n")
        elif re.match(r'^(?:Table\s+[0-9A-Z]+|Figure\s+[0-9A-Z]+)', stripped):
            cleaned.append(f"\n#### {stripped}\n")
        else:
            cleaned.append(line)
            
    return "\n".join(cleaned)

def convert_all_pdfs():
    pdf_files = list(BASE_DIR.rglob("*.pdf"))
    print(f"Found {len(pdf_files)} PDF files in {BASE_DIR}")
    
    for pdf_path in pdf_files:
        rel_path = pdf_path.relative_to(BASE_DIR)
        print(f"Converting: {rel_path} ...")
        
        md_sibling_path = pdf_path.with_suffix(".md")
        safe_name = rel_path.name.replace(".pdf", ".md")
        md_export_path = MD_EXPORT_DIR / safe_name
        
        try:
            # Run pdftotext with layout preservation
            res = subprocess.run(
                ["pdftotext", "-layout", str(pdf_path), "-"],
                capture_output=True,
                text=True,
                check=True
            )
            raw_text = res.stdout
            md_content = clean_text_to_markdown(raw_text, pdf_path.name)
            
            # Save alongside PDF
            with open(md_sibling_path, "w", encoding="utf-8") as f:
                f.write(md_content)
                
            # Save into standards_markdown
            with open(md_export_path, "w", encoding="utf-8") as f:
                f.write(md_content)
                
            print(f"  -> Generated: {md_sibling_path.name} ({len(md_content)} chars)")
        except Exception as e:
            print(f"  [ERROR] Failed converting {rel_path}: {e}")

if __name__ == "__main__":
    convert_all_pdfs()
