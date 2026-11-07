#!/bin/bash
# Rebuilds the resume PDF from resume.html with headless Chrome.
# usage: ./build.sh [out.pdf]   (default: ../public/resume.pdf)
set -e
cd "$(dirname "$0")"
out="$(realpath -m "${1:-../public/resume.pdf}")"
profile="$(mktemp -d)"
trap 'rm -rf "$profile"' EXIT
google-chrome --headless=new --disable-gpu --no-sandbox --user-data-dir="$profile" \
  --no-pdf-header-footer --virtual-time-budget=5000 --run-all-compositor-stages-before-draw \
  --print-to-pdf="$out" "file://$PWD/resume.html" 2>/dev/null
echo "Wrote $out ($(pdfinfo "$out" 2>/dev/null | awk '/^Pages/{print $2}') page)"
