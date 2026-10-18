#!/usr/bin/env python3
"""
scripts/bundle.py — AES-X152 Single-File Self-Contained HTML Bundler
(c) 2026 Audio Engineering Society SC-05-05 Standards Working Group

Compiles modular source files (css/style.css, js/*.js, and index.src.html markup)
into 100% self-contained, standalone single-file distribution artifacts:
  - INDEX.htm-YYYYMMDD-HHMM.html  (Timestamped standalone distribution snapshot)
  - index.htm                     (Standard offline distribution)
  - index.html                    (Standard root distribution)

All stylesheets, JavaScript engines, SVG icons, and datasets (including the 2,290-term
Dennis Bohn PAR Glossary and complete X152 paper dossier) are embedded inline so the
resulting file runs everywhere offline with zero external network or file dependencies.
"""

from datetime import datetime
import os
import re
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SCRIPTS_ORDER = [
    "js/ltp-fader.js",
    "js/audio-analyzer.js",
    "js/signal-generator.js",
    "js/story-sidebar.js",
    "js/floating-meters.js",
    "js/tree-data.js",
    "js/tree-viewer.js",
    "js/simulators.js",
    "js/definition-sims.js",
    "js/circuit-animator.js",
    "js/multichannel-breakout.js",
    "js/adapter-wiring.js",
    "js/xlr-hub.js",
    "js/transformer-sim.js",
    "js/vst-standards.js",
    "js/datasheet-generator.js",
    "js/par-glossary.js",
    "js/landmark-papers.js",
    "js/modules-data.js",
    "js/modules-viewer.js",
    "js/main.js",
]

def bundle(timestamp=None):
    css_path = os.path.join(BASE_DIR, "css", "style.css")
    source_html_path = os.path.join(BASE_DIR, "index.src.html")
    if not os.path.exists(source_html_path):
        source_html_path = os.path.join(BASE_DIR, "index.html")

    if not os.path.exists(css_path):
        print(f"Error: {css_path} not found.")
        sys.exit(1)

    with open(css_path, "r", encoding="utf-8") as f:
        css_content = f.read()

    combined_js = []
    for rel_path in SCRIPTS_ORDER:
        full_path = os.path.join(BASE_DIR, rel_path)
        if not os.path.exists(full_path):
            print(f"Error: script file {full_path} not found.")
            sys.exit(1)
        with open(full_path, "r", encoding="utf-8") as f:
            code = f.read()
            combined_js.append(f"/* ===== BUNDLED: {rel_path} ===== */\n{code}")

    all_js = "\n\n".join(combined_js)

    with open(source_html_path, "r", encoding="utf-8") as f:
        html = f.read()

    # 1. Inline CSS into <style id="bundled-style">
    css_link = '<link rel="stylesheet" href="css/style.css">'
    if css_link in html:
        html = html.replace(css_link, f'<style id="bundled-style">\n{css_content}\n</style>')
    elif '<style id="bundled-style">' in html:
        # Replace existing bundled style
        before = html.split('<style id="bundled-style">')[0]
        after = html.split('</style>')[1]  # first </style>
        html = before + f'<style id="bundled-style">\n{css_content}\n</style>' + after
    else:
        print("Warning: css_link not found and bundled-style not present.")

    # 2. Replace separate <script src="js/..."> tags with single bundled script
    start_marker = '  <script src="js/ltp-fader.js"></script>'
    end_marker = '  <script src="js/main.js"></script>'

    start_idx = html.find(start_marker)
    end_idx = html.find(end_marker)

    if start_idx != -1 and end_idx != -1:
        end_idx += len(end_marker)
        script_replacement = f'  <script id="bundled-application-logic">\n{all_js}\n  </script>'
        bundled_html = html[:start_idx] + script_replacement + html[end_idx:]
    elif '<script id="bundled-application-logic">' in html:
        # Already bundled, replace script tag content
        before = html.split('  <script id="bundled-application-logic">')[0]
        after = html.split('</script>')[-1]
        bundled_html = before + f'  <script id="bundled-application-logic">\n{all_js}\n  </script>' + after
    else:
        print("Error: Could not locate script block markers in HTML source.")
        sys.exit(1)

    # 3. Write out index.htm, index.html, and optional snapshot
    out_paths = [
        os.path.join(BASE_DIR, "index.htm"),
        os.path.join(BASE_DIR, "index.html"),
    ]
    if timestamp:
        out_paths.append(os.path.join(BASE_DIR, f"INDEX.htm-{timestamp}.html"))

    for path in out_paths:
        with open(path, "w", encoding="utf-8") as f:
            f.write(bundled_html)
        sz = os.path.getsize(path)
        print(f"Bundled successfully -> {os.path.basename(path)} ({sz:,} bytes / {sz / 1024 / 1024:.2f} MB)")

if __name__ == "__main__":
    ts = sys.argv[1] if len(sys.argv) > 1 else datetime.now().strftime("%Y%m%d-%H%M")
    bundle(ts)
