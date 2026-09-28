#!/usr/bin/env bash
# index.html é a fonte e usa a paleta v5. Este script xera /v1 (paleta
# orixinal, sen ficheiro de paleta) e /v2–/v5 (css/palettes/vN.css) co mesmo
# contido. Volver executar despois de cada cambio en index.html.
set -euo pipefail
cd "$(dirname "$0")/.."

for v in 1 2 3 4 5; do
  if [ "$v" = 1 ]; then
    palette='/css\/palettes\/v5\.css/d'
  else
    palette="s#css/palettes/v5\\.css#css/palettes/v$v.css#"
  fi
  mkdir -p "v$v"
  sed -E \
    -e "$palette" \
    -e 's#(href|src)="(css|images|js)/#\1="../\2/#g' \
    -e "s#(<meta name=\"viewport\"[^>]*>)#\1\n  <meta name=\"robots\" content=\"noindex\">#" \
    -e "s#<title>(.*)</title>#<title>\1 (v$v)</title>#" \
    index.html > "v$v/index.html"
done
