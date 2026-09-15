#!/usr/bin/env bash
# End-to-end smoke test against a running dev server (default http://localhost:3000).
set -euo pipefail
BASE=${BASE:-http://localhost:3000}
echo "GET landing";  curl -sf -o /dev/null -w "%{http_code}\n" "$BASE/roofing/denver"
echo "GET content";  curl -sf -o /dev/null -w "%{http_code}\n" "$BASE/roofing/denver/roof-replacement-cost"
echo "GET quote";    curl -sf -o /dev/null -w "%{http_code}\n" "$BASE/quote/roofing?zip=80202"
echo "GET sitemap";  curl -sf -o /dev/null -w "%{http_code}\n" "$BASE/sitemap.xml"
echo "POST visit";   VISIT=$(curl -sf -X POST "$BASE/api/track/visit" -H 'content-type: application/json' -d '{"landingUrl":"'$BASE'/roofing/denver?utm_source=google&utm_medium=cpc","referrer":"https://www.google.com/","utm":{"source":"google","medium":"cpc"}}' | sed -E 's/.*"visitId":"([^"]+)".*/\1/'); echo "$VISIT"
echo "POST lead";    curl -s -X POST "$BASE/api/leads" -H 'content-type: application/json' -d '{"verticalSlug":"roofing","zip":"80202","answers":{"projectType":"replace","roofType":"asphalt","propertyType":"single_family","roofAge":"gt20","insuranceClaim":"maybe"},"timeline":"asap","homeowner":true,"firstName":"Smoke","lastName":"Tester","email":"smoke'$RANDOM'@example.com","phone":"303-2'$(printf %02d $((RANDOM%90+10)))'-'$(printf %04d $((RANDOM%9000+1000)))'","consent":true,"consentTextVersion":"2026-09-15.1","partnerListVersion":"2026-09-15.1","formVersion":"roofing-v1","pageUrl":"'$BASE'/quote/roofing","sessionSeconds":30,"visitId":"'$VISIT'"}'; echo
echo "GET admin (unauth)"; curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" "$BASE/admin"
