# Keep/Kill: AI Business Second-Phone App

**Decision: KILL** (as specified). Weighted score 4.75 / 10.

Date: 2026-09-15. Prepared for NeuroLabs. Research appendices with sources are in `research/appendix-*.md`.

---

## 1. Verdict

Kill the horizontal "second business phone with an AI night shift." The pitch "AI decides when it is worth interrupting you" is not a wedge; it is the category's marketing consensus. Ooma, Beside, Safina, VeraDial, Phone2, Callara, Hey Jodie, Housecall Pro, Jobber, OnCrew and Conduit all sell some version of "only bothers you when it matters." Conduit already ships the exact escalation ladder plus a morning briefing for trades. Jobber ships calls, texts and keyword escalation for $29/mo inside the tool 200k contractors already use. Quo has $161M, Canadian numbers, an after-hours AI agent with an urgency field and transfer-to-cell; the autonomous ladder is one sprint for them, not a product. The one thing a new entrant could win on, classifier quality, is invisible to buyers before purchase and unproven in any published data. Unit economics work only at $29+ on wholesale telecom with web billing. Customer acquisition against these incumbents is paid-search-unaffordable for a bootstrapped studio. The problem is real but already "good enough" solved, and the real after-hours volume (10 to 14% of calls per ServiceTitan data) is far smaller than vendor marketing claims.

## 2. Biggest reason to keep

No single vendor combines a true business phone system (number, shared inbox, MMS, outbound calling, iOS + Android) with an autonomous urgency ladder that ends in an acknowledged phone call to the owner's personal cell, plus a morning digest, with Canadian numbers and CAD pricing. Owners pay $250 to $720/mo to human services that mostly take messages. The always-on pain is documented in owners' own words and predates AI.

## 3. Biggest reason to kill

The gap is narrow and closing. Conduit and OnCrew have the ladder in trades. Jobber and Housecall Pro have "emergencies always break through" inside the FSM tools owners already pay for. Quo and Phone2 have the phone system and urgency scoring. Whoever adds the missing piece first wins, and all of them have more distribution than a new app. Meanwhile the defensible core, trustworthy urgency classification, has no published evidence of >95% emergency recall on short texts, and human raters only agree about 85% of the time.

## 4. Competitive landscape

Five tiers, all crowded:

| Tier | Examples | Price band |
|---|---|---|
| Dumb second line | Line2, Sideline, Grasshopper True Solo, Google Voice | $8 to $15/mo |
| Business phone with team features | Quo, Phone2, Dialpad, Nextiva, Allo, Ooma | $15 to $35/user/mo |
| AI answering add-on to a phone system | Quo Sona, Ooma AI, RingCentral AIR, Jobber Receptionist | $15 to $50/mo for 40 to 100 min |
| Standalone AI receptionist | Beside, Clara, Hey Jodie, Rosie, Phone2 AI, My AI Front Desk | $25 to $100/mo |
| Trade-vertical AI with escalation | OnCrew, Conduit, Sameday | $49 to $500/mo |
| Human receptionists | Ruby, Smith.ai, AnswerConnect | $250 to $1,725/mo |

Native OS erosion: iOS 26 Call Screening and Pixel Call Screen now screen unknown callers for free on the personal line.

Canada specifically: Canadian numbers from Quo, Phone2, VeraDial (Toronto), Jobber, RingCentral AIR, Clara. CAD pricing from Hey Jodie, Callara (Quebec) and Slang. Google Voice is crippled in Canada (no SMS). This is an open slot but a small one.

OSQR: no business-phone product exists under that name. osqr.app is a general AI Q&A tool.

## 5. Closest 5 competitors

1. **Conduit (conduitapp.ai)**. Trade-specific emergency triage, owner's phone rings with caller on the line, escalates by call and text to owner and backup until a human responds, selective notifications, morning briefing. Gaps: no mobile app yet, $129+/mo, inbound only, Canada unstated. This is the proposed product for trades, minus the app.
2. **Quo (formerly OpenPhone)**. Full phone system, shared inbox, Canadian numbers, DND schedules, Sona AI agent captures urgency and transfers to an after-hours number, SMS agent in beta. $15 to $47/user plus $25+/mo for AI. $161M raised.
3. **Jobber AI Receptionist**. $29/mo for 30 conversations, included on Plus. Answers calls and SMS 24/7, keyword escalation policy ("emergency", "flood") to text alert or live transfer, after-hours enable, US/CA/UK numbers. Locked to Jobber ($69 to $349/mo).
4. **Phone2**. Second line with US/CA numbers, iOS/Android/web, team inbox, AI receptionist at $89/mo flat with 0 to 5 urgency scoring, explicit business/personal separation. Notification is email, no ladder.
5. **VeraDial (Toronto)**. $14.99 to $59.99/mo second line, AI screens calls, flags high/low priority into a "Needs you" list, drafts SMS replies for approval. No ladder, tiny company.

Also watch OnCrew ($49/mo, 90-second on-call notification with re-alert if unacknowledged) and Housecall Pro CSR AI (emergency calls route or text "regardless of settings").

## 6. Feature comparison

Y = verified, P = partial, N = not offered, ? = unverified.

| Feature | Proposed | Conduit | Quo | Jobber AI | Phone2 | VeraDial |
|---|---|---|---|---|---|---|
| Business number | Y | Y | Y | Y | Y | Y |
| iOS / Android app | Y | coming | Y | Y | Y | Y |
| SMS / MMS | Y | Y / ? | Y | Y / ? | Y | Y / P |
| Outbound calling | Y | N | Y | via Jobber | Y | Y |
| Shared inbox | later | P | Y | Y | Y | P |
| AI voice answering | later | Y | Y | Y | Y | Y |
| AI texting | Y | Y | beta | Y | N | draft-approve |
| After-hours mode | Y | Y | Y | Y | P | Y |
| Urgency detection | LLM | trade rubric | intake field | keywords | 0 to 5 score | hi/lo flag |
| Personal-phone escalation | Y | Y | transfer | text/transfer | P | P |
| Escalating call chain with ack | Y | Y | N | N | N | N |
| Morning digest | Y | Y | N | N | N | P |
| Human takeover | Y | Y | Y | Y | Y | Y |
| Business/personal separation | Y | Y | Y | N/A | Y | Y |
| Canadian numbers | Y | ? | Y | Y | Y | Y |
| CAD pricing | Y | N | N | N | N | N |

Nobody publishes urgency precision/recall. Most "urgency detection" is either an owner keyword list or an LLM intake field, not calibrated judgment.

## 7. Pricing comparison

| Product | Base | AI | All-in for a solo owner |
|---|---|---|---|
| Quo | $19/mo monthly ($15 annual) | Sona $25/mo for ~40 calls | $44 to $68 |
| Phone2 | $7 to $15/mo | $89/mo flat | $96 to $104 |
| Jobber | $69 to $349/mo (FSM) | $29/mo or included | $98+ (but they already pay for Jobber) |
| Conduit | n/a | $129 / $299 / $499 | $129 |
| VeraDial | $14.99 / $29.99 / $59.99 | included | $15 to $30 |
| OnCrew | forwarding | $49 / $149 / $349 | $49 |
| Beside | forwarding | $29.99 / $99.99 | $30 to $100 |
| Ruby (human) | forwarding | $250 to $1,725 | $250+ |

Both Quo and Phone2 pass 10DLC through as a separate fee ($19.50 one-time + $1.50 to 3/mo; $5 + $1.50/mo).

## 8. Best initial customer

Residential plumbing, owner-operators with 1 to 5 trucks, HVAC as the adjacent expansion. Highest-value emergencies (active leak, sewer backup, 24 to 48 hour mold window), owner carries the phone, existing $250 to $720/mo human-service spend to displace, dense communities (r/Plumbing 66K, Plumbing Hacks FB 36K, ContractorTalk 124K), and a real triage mix (toilet overflowing vs. remodel quote). Locksmith and towing score high on urgency but nearly every call is urgent, so a classifier adds nothing.

Critical caveat: emergencies arrive by phone. A FIELDBOSS survey of 1,000 homeowners found 50% prefer phone, 24% text. A text-only MVP would see the routine tail and miss the urgent head. If text-first is mandatory, small property management (tenants text, PMs already publish emergency lists) is the better text-native wedge, but AppFolio, Buildium and Property Meld already intermediate maintenance requests.

## 9. Differentiation hypothesis

Tested hypothesis: "Existing business phone apps provide infrastructure, but none make intelligent interruption the central experience."

Result: partly true, not defensible. The combination is unshipped by any single vendor, but the interruption logic is a feature everyone claims, incumbents are one release away, and vertical players already have better domain rubrics than a horizontal app could. The only durable moat would be measured classifier quality plus an acknowledged call ladder, and buyers cannot see classifier quality before purchase. "Your business has a night shift" is a good tagline for Conduit, which already uses that positioning.

## 10. Technical feasibility

- **Classifier alone: not trustworthy.** Best analog data (ED and patient-portal triage) shows LLMs are strong on obvious routine and obvious emergency, 70 to 85% in the middle, with pooled sensitivity of 61% for the highest-acuity class across 11 studies. "When unsure, escalate" without calibration wakes the owner for everything (Gemini 2.5 Pro: 91% sensitivity, 23% specificity).
- **The workflow can be trustworthy.** Customer self-escalation ("reply URGENT or call this number"), one clarifying question, an owner-defined rubric, and an acknowledged PSTN call chain with answering-machine detection move safety off the classifier. Nobody ships the SMS clarifying-question or self-escalate pattern; only Conduit and OnCrew ship the acknowledged chain.
- **You cannot intercept the owner's existing SMS** on iOS or Android. The product needs its own VoIP number. Confirmed.
- **Push is not a reliable interrupt.** APNs/FCM are best-effort. Time Sensitive works if the user allows it. Critical Alerts entitlement is effectively unavailable to a small business app. The reliable wake is a repeated phone call to the owner's real cell.
- **10DLC** is a per-customer brand and campaign registration, 3 to 7 business days when clean, weeks when rejected, repeated for every customer. Canadian numbers bought after March 2025 also need registration or Persona verification.
- **Liability.** Air Canada was held liable for its chatbot's invented policy. AI replies must never state times or prices; use owner-approved templates.

## 11. Estimated MVP cost and complexity

Text-only MVP (Telnyx number, SMS and voicemail webhooks, LLM classify and reply with rubric, clarifying question, self-escalate, Time Sensitive push plus call chain, correction UI, digest, Expo app): 8 to 14 person-weeks, roughly $60k to $140k at contract rates or two founder-months. Recurring under $300/mo for pilots. Add 3 to 6 weeks of calendar time for 10DLC and App Store review of a CallKit app. Voice AI is out of scope for the MVP and would add $16 to $28/customer/mo at 200 minutes.

Before any of that, a 2 to 3 week classifier evaluation on 300 to 500 real after-hours messages from friendly plumbers costs nothing but time and answers the feasibility question.

## 12. Estimated pricing

If it were built: $59/mo USD flat per business (CAD equivalent), fair-use caps on SMS and minutes, 10DLC passed through, billed on the web. $19 is unworkable. $29 is the floor for a 45% margin. Above $90 it collides with Phone2 AI and Conduit.

## 13. Gross-margin considerations

Per-customer COGS at typical SMB volume (600 SMS segments, 30 MMS, 200 voice minutes, 60 AI conversations, 40 voicemail minutes, 10DLC amortized, support):

| Stack | COGS | GM at $29 (web) | GM at $49 (web) | GM at $49 (Apple 15%) |
|---|---|---|---|---|
| Twilio + Haiku 4.5 | $19.75 | 28% | 56% | 45% |
| Telnyx + Haiku 4.5 | $14.85 | 45% | 66% | 55% |
| Telnyx + Sonnet 5 | $15.66 | 42% | 65% | 53% |

AI is 5 to 11% of COGS. Telecom is 50 to 60%. Twilio vs Telnyx is worth more per customer than the whole AI bill. Canadian inbound SMS surcharges ($0.015 to 0.017 per segment) make a Canadian customer about $5/mo worse than a US one. Fixed compliance costs (Robocall Mitigation Database filing, CRTC reseller registration, E911 at $0.75/number and $75 to $100 per unregistered 911 call, CASL exposure) dominate below 500 customers. A heavy customer at 6,000 segments and 2,000 minutes costs $100/mo on Twilio, so caps are mandatory.

## 14. Customer acquisition strategy

Paid search is out: plumbing CPCs run $8 to $45, non-brand CPL about $183, which a $59/mo product with 5% monthly churn cannot recover. Remaining channels for a bootstrapper: Facebook trade groups (Plumbing Hacks 36K, Plumbers Alert 15.5K, Blue Collar Millionaire), ContractorTalk and PlumbingZone, Jobber App Marketplace (100+ apps, but Jobber sells its own receptionist), PHCC Connect and Service World Expo (booths under $5k). All are slow and put you directly against Jobber's bundled $29 add-on. This is the weakest part of the case.

## 15. What would have to be true

1. After-hours volume for the target owner is materially higher than ServiceTitan's 10 to 14%, or the value per missed emergency is high enough that 10% justifies $59/mo.
2. Owners will let an AI decide what wakes them, given an override list and audit trail. Currently 78% of SMB owners say they do not trust AI without oversight.
3. A pipeline (rubric + clarify + self-escalate + call chain) reaches at least 95% urgent recall at a false-wake rate owners tolerate, measured on their own messages.
4. Conduit, Quo, Jobber and Housecall Pro do not close the ladder gap within 12 months. Unlikely.
5. A channel exists where a Canadian studio can acquire trades customers under $150 each.

## 16. Recommended next experiment (if you refuse to kill)

Two weeks, no code:

1. Fifteen to twenty interviews with 1 to 5 truck plumbers and HVAC owners who currently pay Ruby, Smith.ai or AnswerConnect. Ask what they would pay to be woken only for true emergencies and whether they would accept AI making that call with an override list. Fewer than a third saying yes at $59+/mo means kill.
2. Collect 300 to 500 real after-hours texts and voicemail transcripts from 5 to 10 of them. Have each owner label their own messages into the four classes. Measure owner-vs-owner agreement (kappa under 0.6 means the target is inherently fuzzy). Run Haiku 4.5, Sonnet 5 and one open 8B model zero-shot, 12-shot and with the owner's rubric. Sweep the escalation threshold and plot urgent recall vs false wake-ups.

## 17. Kill conditions

- Fewer than a third of interviewed owners would pay $59+/mo.
- Urgent + critical recall under 95% on the owners' own labeled set, or false-wake rate at that recall above what owners say they tolerate.
- Owner-vs-owner labeling agreement under kappa 0.6.
- Conduit ships its mobile app or Quo ships autonomous escalation before the experiment finishes.
- No acquisition channel under $150 per customer after 60 days in trade communities.

## 18. If KEEP: exact MVP scope

Not recommended. For the record, the only version worth building is vertical (plumbing/HVAC), voice-inclusive (a "press 1 for emergency" IVR plus SMS), with the acknowledged call chain on day one, at $59/mo with Canadian numbers. Text-only fails the channel test in section 8.

## 19. Why KILL, and adjacent ideas

Why: the score is 4.75. Competition (3) and differentiation (4) are the two heaviest weights and both fail. The problem is real but already solved to "good enough" by tools the customer already pays for. The defensible piece is invisible to buyers and unproven. Acquisition is the weakest link for a bootstrapped studio.

Adjacent ideas worth a look:

1. **Concierge version as a NeuroLabs service.** Configure Quo Sona or Jobber Receptionist plus an escalation rubric for local PEI and Maritime trades as a flat-fee setup and monthly retainer. No infrastructure, immediate revenue, and it produces the labeled after-hours message corpus and owner interviews that would inform any future product. Fits the studio's existing services model.
2. **Tenant maintenance text line for small landlords.** Text-native (tenants text), Canadian, below the AppFolio and Buildium threshold (1 to 20 units). AI triages "no heat" vs "dripping tap," logs requests, escalates true emergencies to the landlord or on-call contractor, produces a morning list. Validate that small landlords are reachable and will pay before building.
3. **Urgency evaluation harness for the vendors.** Every AI receptionist claims urgency detection and none publishes accuracy. A labeled trades triage benchmark and a hosted eval could be sold to Conduit-class vendors and FSM platforms. Small market, but the data asset is the one thing nobody has, and it doubles as the go/no-go tool if you ever revisit this product.

## Scoring

| Category | Weight | Score | Weighted | Basis |
|---|---|---|---|---|
| Problem severity | 20% | 6 | 1.20 | Real, documented, but after-hours is 10 to 14% of volume and cheap workarounds exist |
| Existing competition | 20% | 3 | 0.60 | Six tiers, funded incumbents, Conduit and Jobber cover the workflow |
| Differentiation | 20% | 4 | 0.80 | Combination unshipped, but claim is category consensus and one sprint for incumbents |
| Willingness to pay | 15% | 6 | 0.90 | $250 to $720/mo human spend exists, but Jobber bundles at $29 |
| Technical feasibility | 10% | 5 | 0.50 | Buildable, but classifier untrustworthy alone and emergencies arrive by voice |
| Gross margin | 10% | 5 | 0.50 | 45 to 65% at $29 to $49 only on wholesale rates with web billing |
| Customer acquisition | 5% | 4 | 0.20 | No affordable paid channel, slow community channels against bundled incumbents |
| **Total** | | | **4.75** | **KILL** |

## Research caveats

Reddit blocks automated access, so owner quotes come from the Mike Holt electrician forum, Capterra and vendor-written syntheses. PlumbingZone and ContractorTalk thread bodies were paywalled. No independent false-negative incident for AI triage in the trades was found either way, which reflects how new and vendor-dominated the category is. Several competitor prices are from third-party reviews where vendor pages hide pricing (Dialpad, Ooma AI, Housecall Pro CSR AI, ServiceTitan). Full source lists are in the appendices.
