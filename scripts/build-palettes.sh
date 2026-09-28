#!/usr/bin/env bash
# Xera /v2, /v3, /v4 e /v5 a partir de index.html: mesmo contido, outra paleta
# (css/palettes/vN.css). Volver executar despois de cada cambio en index.html.
set -euo pipefail
cd "$(dirname "$0")/.."

for v in 2 3 4 5; do
  mkdir -p "v$v"
  sed -E \
    -e 's#(href|src)="(css|images|js)/#\1="../\2/#g' \
    -e "s#(<link rel=\"stylesheet\" href=\"\.\./css/style\.css\">)#\1\n  <link rel=\"stylesheet\" href=\"../css/palettes/v$v.css\">#" \
    -e "s#(<meta name=\"viewport\"[^>]*>)#\1\n  <meta name=\"robots\" content=\"noindex\">#" \
    -e "s#<title>(.*)</title>#<title>\1 (v$v)</title>#" \
    index.html > "v$v/index.html"
done
