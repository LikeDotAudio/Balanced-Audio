#!/usr/bin/env python3
"""
scripts/build.py — Wrapper delegating to root build.py
"""
import os
import sys
from pathlib import Path

ROOT_BUILD_PY = Path(__file__).resolve().parent.parent / "build.py"
os.execv(sys.executable, [sys.executable, str(ROOT_BUILD_PY)] + sys.argv[1:])
