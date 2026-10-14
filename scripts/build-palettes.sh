#!/usr/bin/env bash
# index.html é a fonte e usa a paleta v5 e css/v6.css. Este script xera /v6, unha copia
# de index.html (mesma paleta e contido). /v1–/v5 son versións conxeladas
# dun deseño e contido anteriores e xa non se rexeneran. Volver executar
# despois de cada cambio en index.html.
set -euo pipefail
cd "$(dirname "$0")/.."

v=6
mkdir -p "v$v"
sed -E \
  -e 's#(href|src)="(css|images|js)/#\1="../\2/#g' \
  -e "s#(<meta name=\"viewport\"[^>]*>)#\1\n  <meta name=\"robots\" content=\"noindex\">#" \
  -e "s#<title>(.*)</title>#<title>\1 (v$v)</title>#" \
  index.html > "v$v/index.html"
