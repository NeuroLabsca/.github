# Appendix A: Competitive research (Sept 2026)

Legend for the 22 attributes: **Y** = verified on vendor page, **3P** = third-party review/blog only, **?** = could not verify, **N** = not offered/stated. Attribute numbering: 1 number, 2 iOS, 3 Android, 4 SMS, 5 MMS, 6 calling, 7 shared inbox, 8 AI voice, 9 AI texting, 10 after-hours mode, 11 urgency detection, 12 personal-phone escalation, 13 push, 14 emergency call escalation, 15 biz/personal separation, 16 human takeover, 17 digest, 18 pricing, 19 Canada, 20 US, 21 setup, 22 target.

---

## A. The seven named products

### 1. Quo (formerly OpenPhone), quo.com
1 Y (1 local/toll-free per user, +$5/extra) · 2 Y · 3 Y · 4 Y · 5 Y · 6 Y (unlimited US/CA) · 7 Y (shared numbers/inbox is the core product) · 8 Y "Sona" AI voice agent · 9 Y (Sona SMS follow-up, in free beta) · 10 Y (business hours per number, after-hours voicemail/auto-reply/Sona call flow) · 11 **Partial**: Sona "gathers…urgency" as an intake field and you can add a "Transfer call" action "when a caller indicates their request is urgent," routed to "a dedicated after-hours phone number" (https://www.quo.com/product/ai/receptionist, https://www.quo.com/blog/filter-call-for-managers/). Rule/config-driven, not an autonomous decision · 12 Y via transfer to any number · 13 Y (standard app push; DND/work schedules mute after hours) · 14 N (no retry/escalating-call ladder) · 15 Y · 16 Y (transfer with summary) · 17 N (per-call summaries, no morning digest found) · 18 Starter $15/user/mo annual ($19 monthly), Business $23 ($33), Scale $35 ($47); Sona: 1,000 free credits/mo (about 10 calls), then $25/4,000 credits (40 calls), $49/10k, $99/25k, $199/60k; overage $1.00 to $0.45/call (https://www.quo.com/pricing) · 19 Y (Canadian numbers; USD pricing only) · 20 Y · 21 Low; Sona setup via call-flow blocks, paid plan required · 22 SMB/startup teams.
Scale: rebranded Sept 2025 with $105M growth financing (General Catalyst CVF $96M + $9M equity), about $161M total raised (https://www.prnewswire.com/news-releases/openphone-becomes-quo-new-name-updated-products-and-105-million-in-growth-financing-mark-major-inflection-point-for-ai-driven-front-office-solution-302562915.html). Customer count not found.

### 2. Phone2, phone2.io
1 Y (US or Canadian) · 2 Y · 3 Y · 4 Y (Basic: inbound-only SMS) · 5 Y (Pro+) · 6 Y · 7 Y (team inbox) · 8 Y ("Phone2 AI" receptionist, standalone $89/mo flat, unlimited AI-answered calls) · 9 N (auto-text-back only) · 10 Partial (24/7 answering; no distinct after-hours toggle documented) · 11 **Y: "identifies caller urgency levels (0 to 5 scale)"** (https://www.phone2.io/ai-receptionist) · 12 Partial (transfers "to a team member"; cell routing not explicit) · 13 3P (email + Slack alerts documented; push not explicit) · 14 N · 15 Y (explicitly marketed) · 16 Y (transfer) · 17 N · 18 Basic $7/mo annual (2 users, 1 number, 10 transcriptions), Pro $15/user/mo, Scale $39/user/mo; +$5 numbers; Pro carries $1.50/mo messaging fee + $5 carrier review; AI receptionist $89/mo (https://www.phone2.io/pricing) · 19 Y (Vancouver office, CA numbers) · 20 Y · 21 Low · 22 Solo founders to ~10-person teams. Claims "10,000+ businesses."

### 3. VeraDial, veradial.com (Toronto)
1 Y (US or CA) · 2 Y · 3 Y · 4 Y (fair use) · 5 Partial (photos in threads) · 6 Y (metered minutes) · 7 Partial (team invites on Plus+) · 8 Y (Vera screens/answers) · 9 **Y: drafts SMS replies "grounded in the call," you approve and send** · 10 Y (24/7 answer mode) · 11 **Y: calls flagged high/low priority and sorted into a "Needs you" list** (https://veradial.com/) · 12 Partial ("put the caller through to you") · 13 Y · 14 N · 15 Y · 16 Y · 17 Partial (dashboard; no scheduled digest) · 18 Lite $14.99/mo (50 AI-receptionist min, 150 calling min), Plus $29.99 (unlimited AI-receptionist min, 300 calling, 100 AI-outbound), Business $59.99 (3 lines, 900 min); extra lines $9.99 (https://veradial.com/pricing) · 19 Y (Canadian company) · 20 Y · 21 Very low · 22 Solopreneurs, trades, realtors. Funding: ElevenLabs Grants / Cartesia startup programs only.

### 4. Conduit, conduitapp.ai (NOT the YC "Conduit AI" at conduit.ai, which is hospitality)
1 Y (local number or forward existing) · 2 **"coming soon"** · 3 **"coming soon"** · 4 Y (AI two-way texting, 1 to 3 wk carrier registration) · 5 ? · 6 Inbound answering only · 7 Partial (unified inbox + Zapier) · 8 Y · 9 Y (confirmations, reminders, missed-call text-back, quiet-hours aware) · 10 Y · 11 **Y: trade-specific emergency triage (burst pipe, gas smell, sewage, etc.)** · 12 **Y: "the owner's phone rings" with caller on the line, then backup** · 13 Y (planned app: "selective notifications, jobs/emergencies only") · 14 **Y: "escalates via calls and texts to owner and backup contact until a human responds"** (https://conduitapp.ai/, https://conduitapp.ai/industries/plumbing) · 15 Y · 16 Y ("one-tap handoff", sensitive texts drafted for owner approval) · 17 **Y: "morning briefing"** · 18 Solo $129/mo (100 min, 300 texts), Growth $299 (350/750), Office $499 (600/1,500, 2 locations); no overage, degrades to message-taking; packs $29/100 min, $59/250 min, $10/250 texts (https://conduitapp.ai/pricing) · 19 ? · 20 Y · 21 ~30 min · 22 Trades/appointment SMBs. Funding/scale: nothing found; very early.
**Closest analog to the proposed product.** Weaknesses: no app yet, no outbound calling, expensive, no Canada statement.

### 5. Hey Jodie, heyjodie.com (Jodie AI Ltd, London; US/CA/UK sites)
1 N (forwarding model) · 2 Y · 3 Y · 4 Partial (SMS summaries to owner) · 5 N · 6 N · 7 N · 8 Y · 9 N · 10 Y · 11 **Y: captures "how urgent it is"**; when Jodie can't answer, "you get a notification right away" · 12 Partial · 13 **Y: "instant push notifications for every call"** (every call, not filtered) · 14 N · 15 N/A · 16 Y · 17 N · 18 US: Basic $49, Professional $99, Premium $199, Enterprise $500+/mo, unlimited minutes (https://heyjodie.com/en-us/pricing/); Canada: C$99/C$199/C$399 (https://heyjodie.com/en-ca/industries/small-business/) · 19 Y (CAD pricing, claims 1,600+ Canadian businesses) · 20 Y · 21 2 to 10 min · 22 Trades/home services/clinics/salons.

### 6. Callara, callara.ca (Quebec-focused)
1 Y (Canadian numbers auto-provisioned; conditional forwarding *72) · 2 ? · 3 ? · 4 Y (two-way SMS/MMS on Scale+) · 5 Y (Scale+) · 6 Inbound only · 7 N · 8 Y (bilingual EN/Québec French) · 9 Partial · 10 Y · 11 **Y: "urgency-flagging"** · 12 **Y: "configure escalation rules… complaint, emergency… transfers the call to your cell in a couple of seconds"**; "owner SMS pager" on Growth · 13 N (email summaries) · 14 Partial · 15 N/A · 16 Y · 17 N · 18 CAD: Starter $49/mo (75 min then $0.55/min), Scale $108 (fair-use unlimited, 3 transfer numbers, SMS), Growth $208; Enterprise custom (https://callara.ca/pricing) · 19 Y (data in ca-central-1, Loi 25/PIPEDA) · 20 ? · 21 ~10 min · 22 Quebec/Canadian SMBs.

### 7. OSQR
**No business-phone product found under this name.** osqr.app is a general "AI operating system for capability" (multi-model Q&A / second brain), not telephony (https://osqr.app/). No app-store or press trace.

---

## B. Incumbent business-phone systems

### Dialpad
1 to 7 Y; 8 Y via "Dialpad AI Agents" (quote-only); 9 Y; 10 Y; 11 N; 12 Partial; 13 Y; 14 N; 15 Y; 16 Y; 17 N. 18 Connect Standard $15/user/mo annual ($27 monthly), Pro $25 ($35, 3-seat min), Enterprise custom; SMS/MMS US/CA included, ~250 msg cap (https://www.cloudtalk.io/blog/dialpad-pricing/). 19 Y. 20 Y. 21 Medium. 22 Teams. dialpad.com/ai-receptionist returns 404.

### RingCentral RingEX + AI Receptionist (AIR)
1 to 7 Y. 8 Y (AIR, GA 2025). 9 Y. 10 Y. 11 **N: reviewer: "doesn't have dedicated emergency detection logic; an urgent caller gets the same routing as someone asking about hours"** (https://www.cloudtalk.io/blog/ringcentral-ai-receptionist-review/). 12 Partial. 13 Y. 14 N. 15 Y. 16 Y. 17 N. 18 AIR add-on $39/mo (100 min), standalone $49/mo, "AIR Everywhere" $59/mo (https://www.ringcentral.com/us/en/blog/ringcentral-air-everywhere-ai-receptionist-for-any-phone-system/). 19 Y. 20 Y.

### Nextiva + XBert
1 to 7 Y. 8/9 Y. 10 Y. 11 N. 12 Partial. 13 Y. 14 N. 15 Y. 16 Y. 17 N. 18 Core $15/Engage $25/Scale $75 per user/mo annual; XBert $99/mo for 100 "resolutions", $0.99 each after (https://www.nextiva.com/products/ai-receptionist). 19 ?. 20 Y.

### Ooma Office
1 to 7 Y (SMS capped). 8 Y. 9 Partial. 10 Y. 11 **Partial: AI Answering Service "flags calls as urgent for cases that require quick follow-up"** (https://www.ooma.com/small-business-phone-systems/ai-answering-service-ai-receptionist/). 12 Partial. 13 SMS/email. 14 N. 15 Y. 16 Y. 17 N. 18 Essentials $19.95 / Pro $24.95 / Pro Plus $29.95 per user; AI Answering Service $14.99/license (40 min), AI Receptionist $49.99/license (100 min) per press release (https://investors.ooma.com/news-releases/news-release-details/ooma-introduces-ooma-ai-streamline-business-call-management-and). 19 Y. 20 Y.

### Grasshopper (GoTo)
1 to 6 Y; 7 Partial; 8 N (Smith.ai/Ruby referrals); 9 N; 10 Y; 11 N; 12 N; 13 Y; 14 N; 15 Y; 17 N. 18 True Solo $14/mo annual ($18), Solo Plus $25 ($32), Small Business $55 ($70); 10DLC $19.50 + $1.50 to 10/mo (https://www.quo.com/blog/grasshopper-pricing/). "400,000+ customers served."

### Google Voice (Workspace)
1 to 6 Y; 7 N; 8 N; 9 N; 10 Y; 11 to 14 N; 15 Y; 17 N. 18 Starter $10, Standard $20, Premier $30 per user/mo + Workspace (https://workspace.google.com/products/voice/). 19 **Partial: Canada only with Workspace; no SMS on Canadian numbers** (https://www.quo.com/blog/google-voice-canada/).

### Line2 / Sideline
1 to 6 Y, 7 N/limited, 8 to 14 N, 15 Y, 17 N. Line2 $9.99/mo ($7.99 annual) (https://www.cloudtalk.io/blog/line2-pricing/). Sideline $14.49/mo or $9.99 to $14.99 tiers (https://www.selecthub.com/p/business-phone-systems/sideline-com/). **No AI at any price.**

### Textline
SMS-only shared inbox, no voice. Quote-based; 3P: $16/$24/$40 per agent, 3-agent min, ~$149/mo floor (https://www.textline.com/pricing).

### Podium
1 to 7 Y (Podium Phones $30/user/mo). 8/9 Y ("AI Employee"). 11 N. 18 3P: AI Employee $99 to $399/mo add-on, realistic all-in $450 to 800/mo (https://astucia.io/blog/podium-pricing-2026-what-smbs-actually-pay).

### Allo (withallo.com), "AI second business phone"
1 to 7 Y. 8 Y (AI receptionist add-on). 9 Y (AI-drafted texts, "nothing goes out until you send it"). 11 N. 12 Partial. 14 N. 15 Y. 17 N. 18 Starter $18/mo, Business $35/user/mo annual ($45), Ultra $100 (https://www.withallo.com/). Claims 6,000+ customers.

---

## C. AI answering services (forward-your-number model)

- **Smith.ai**: AI Receptionist Free 25 calls/mo, Pro $150/mo, Enterprise $500/mo; human receptionists from $292.50/mo (https://smith.ai/pricing/ai-receptionist). Emergency keyword rules → transfer to cell (3P).
- **Ruby** (human): Starter $250/50 min, Basic $395/100, Popular $720/200, Professional $1,725/500 (https://www.ruby.com/plans-and-pricing/).
- **Rosie**: Professional $49/250 min, Scale $149/1,000 min (adds live transfers), Growth $299/2,000 (waterfall transfers) (https://heyrosie.com/pricing).
- **Goodcall**: Starter $79/mo (100 unique callers), Growth $129, Scale $249 (https://www.goodcall.com/pricing). Takes messages; no urgency model.
- **My AI Front Desk**: $99/mo ($79 annual): 200 voice min, 400 SMS (https://www.myaifrontdesk.com/pricing).
- **NextPhone**: $199/mo flat; blog claims emergency phrases route to cell (https://www.getnextphone.com/blog/ai-receptionist).
- **Beside**: $29.99/mo (30 calls) or $99.99 unlimited; flags calls urgent and sends push (https://www.beside.com/pricing, https://www.beside.com/blog/ai-receptionist-for-electricians).
- **Clara**: $33.25 to $69.99/mo; second line; urgent-sounding calls flagged high priority (https://heyitsclara.com/us/pricing/). US/CA/GB.
- **Upfirst / AIRA / ServiceAgent / Marlie / OnCrew**: Upfirst $24.95 to $299; AIRA $24.95 to $159.95, "transfer urgent calls to a team member's cell"; ServiceAgent free to $39/mo; Marlie from $49/mo; **OnCrew $49/100 calls, $149/400, $349/1,000: "trade-specific emergency triage, on-call tech notifications in 90 seconds," second alert if first tech doesn't acknowledge** (https://oncrew.ai/ai-answering-service).
- **Safina AI**: forwarding-based; "assesses call urgency and forwards urgent calls to you"; $11.99 to $69.99/mo.
- **SimplyWise AI Receptionist** (iOS only): $0.99 to $29.99 IAPs; "urgent alerts flag priority messages."

---

## D. Vertical / enterprise

- **Slang.ai** (restaurants): $379 to $599 per location (https://www.slang.ai/pricing).
- **Numa** (auto dealers): quote-only; "heat case" alerts; 1,400+ dealerships.
- **Voicehub**: $197 to $349/mo; restaurant/retail.
- **Sameday AI** (home services): Launch $449/500 min, Scale $789/1,000 (https://sameday.ai/pricing).
- **Jobber AI Receptionist**: **$29/mo add-on (30 conversations, $0.79 each after), included on Plus**; answers calls + SMS 24/7; **escalation policy: urgent keywords ("emergency," "flood") → text alert or live transfer**; enable "after hours or when busy"; US/CA/UK numbers (https://help.getjobber.com/hc/en-us/articles/25315927533847-Receptionist-powered-by-Jobber-AI, https://www.getjobber.com/features/ai-receptionist/). Requires Jobber $69 to 349/mo.
- **Housecall Pro CSR AI / Voice**: add-on, price not public (3P ~$109/mo); **after-hours: "call you, send you a text, or just log the call"; emergency calls "trigger automatic routing or text alerts regardless of settings"** (https://help.housecallpro.com/en/articles/9740104-csr-ai-overview).
- **ServiceTitan Contact Center Pro / AI Voice Agent**: usage-billed (3P: from $2.75/call); escalates on live-agent request, frustration, keywords (https://help.servicetitan.com/v1/docs/ai-voice-agent-for-basic-phones-and-phones-pro-faq).
- **Native OS**: iOS 26 Call Screening and Pixel Call Screen screen unknown callers for free on the personal line.

---

## E. Synthesis

### (a) Who ships "AI urgency triage + escalation to the owner's cell"
Nobody ships the exact four-tier ladder as a general-purpose second-line app, but the pieces are widely shipped: Conduit (closest: triage, owner's phone rings, backup until human responds, selective notifications, morning briefing), OnCrew (90 s on-call notification, re-alert), Housecall Pro and Jobber (emergencies always break through, Jobber at $29), Callara (rules-based escalation to cell), VeraDial (priority flags + "Needs you" queue in a second-line app), Phone2 (0 to 5 urgency scoring, email notification), Beside/Safina/SimplyWise/Clara/AIRA/NextPhone/Ooma (urgent flagging, forward-to-cell), Quo Sona (urgency intake + transfer to after-hours number).

Almost every vendor's "urgency detection" is (a) keywords the owner lists, or (b) an LLM intake field. No one publishes precision/recall.

### (b) Gaps
1. No product combines a real business phone system with an autonomous urgency ladder ending in an escalating call to the owner's cell.
2. Text-side triage is weak everywhere; most AI receptionists are voice-first.
3. Acknowledgment loops exist only in Conduit and OnCrew.
4. Morning digest as a first-class feature: Conduit only.
5. Canada: CAD pricing only from Hey Jodie, Callara, Slang; Canadian numbers from Quo, Phone2, VeraDial, Jobber, RingCentral AIR, Clara.
6. Nobody uses iOS Focus/Android DND APIs or a call fallback as the wake mechanism in a horizontal product.

### (c) Pricing bands
Dumb second line $8 to 15/mo; business phone $15 to 35/user/mo; AI add-on $15 to 50/mo for 40 to 100 min; standalone AI receptionist $25 to 100/mo; trade-vertical AI with escalation $49 to 500/mo; human receptionists $250 to 1,725/mo. An all-in "phone + AI operator" for a solo owner must land at roughly $30 to 60/mo.

### (d) Blunt take
"AI decides when it is worth interrupting the owner" is the current marketing consensus, not whitespace. The specific combination is unshipped by any single vendor, so there is a real but narrow gap. Three things make it a hard keep: incumbents are one sprint away; the defensible part is classifier quality, which buyers cannot see; vertical players already have better triage because they know the domain.

### What could not be verified
OSQR as a phone product; Dialpad "AI Receptionist" SKU and pricing; Ooma AI current prices; Housecall Pro CSR AI and ServiceTitan per-call pricing; Textline per-seat prices; Podium exact AI Employee price; Canada availability for Conduit, Nextiva XBert, Smith.ai, Goodcall, Sameday, Beside, Podium; whether any vendor's urgency detection is model-based vs keyword-based; Quo/Phone2 customer counts.
