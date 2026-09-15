# Appendix B: Unit economics, telecom compliance and app-store constraints (Sept 2026)

All prices USD, list/pay-as-you-go, from vendor pages or help centers in Sept 2026 unless noted.

---

## 1. CPaaS pricing (US + Canada)

### Phone numbers (monthly)
| Provider | US local | US toll-free | CA local | Notes |
|---|---|---|---|---|
| Twilio | $1.15 | $2.15 | $1.15 | BYO number $0.50. https://www.twilio.com/en-us/sms/pricing/us, https://www.twilio.com/en-us/sms/pricing/ca |
| Telnyx | $1.00 (+$0.10/mo to SMS-enable) | $1.00 | from $1.00 | volume tiers to $0.25 at 5k+ numbers. https://telnyx.com/pricing/numbers |
| Plivo | $0.50 | $1.00 | n/a | https://www.plivo.com/sms/pricing/us/ |
| Sinch | $1 (+$1 setup) | $2 | $1 | https://sinch.com/pricing/sms/ |
| Bandwidth | sales only | | | https://www.bandwidth.com/pricing/ |

### SMS per segment / MMS per message (base rate, before carrier fees)
| Provider | US SMS out / in | US MMS out / in | CA SMS out / in | CA MMS |
|---|---|---|---|---|
| Twilio | $0.0083 / $0.0083 | $0.022 / $0.0165 | $0.0083 / $0.0083 | $0.022 / $0.0165 |
| Telnyx | $0.004 / $0.004 | $0.015 / $0.005 | "from $0.004" | n/a |
| Bandwidth | $0.006 (10DLC) | $0.015 | not published | n/a |
| Plivo | $0.0077 / $0.0077 | $0.018 | not on page | n/a |
| Sinch | $0.0078 / $0.0078 | $0.02 / $0.01 | $0.0078 / $0.0078 | $0.02 / $0.01 |

Sources: Twilio pages above; https://telnyx.com/pricing/messaging; https://www.bandwidth.com/pricing/; https://www.plivo.com/sms/pricing/us/; https://sinch.com/pricing/sms/.

### Carrier passthrough fees
**US, per SMS segment, 10DLC (Twilio's table):** AT&T $0.0035 out / $0.0035 in; T-Mobile $0.0045 out / $0.0025 in; Verizon $0.0045 out / $0.007 in; US Cellular $0.005 out / $0.0025 in. MMS: T-Mobile $0.01, AT&T ~$0.009, Verizon $0.007 outbound. AT&T changed fees Apr 1 2026 and Verizon May 1 2026 (https://www.ghlscaleup.com/blog/a2p-10dlc-fees-explained). Blended US outbound about $0.0042, inbound about $0.0043.

**Canada, per SMS segment (Twilio CA page):** Bell/Virgin $0.0087 out / **$0.016 in**; Rogers/Fido $0.0084 out / **$0.017 in**; Telus $0.0073 out / $0.0146 in; Freedom/Videotron $0.0067 / $0.0089; others $0.0064 / $0.0079. Canadian inbound surcharges are roughly 4x US.

### Voice per minute
| Provider | US inbound local | US inbound TF | US outbound | CA inbound / outbound | Recording |
|---|---|---|---|---|---|
| Twilio | $0.0085 | $0.022 | $0.014 | $0.0085 / $0.014 | $0.0025/min + storage; transcription $0.05/min |
| Telnyx | ~$0.0052 | same | ~$0.007 | same | $0.002/min |
| Bandwidth | $0.0055 | n/a | $0.010 | not published | $0.002/min |

Sources: https://www.twilio.com/en-us/voice/pricing/us, https://www.twilio.com/en-us/voice/pricing/ca, https://telnyx.com/pricing/call-control.

---

## 2. A2P 10DLC (US)

- Registration is mandatory for application traffic to US numbers from 10-digit numbers; unregistered messages are blocked (Twilio error 30034) and still billed. https://www.twilio.com/docs/api/errors/30034
- **Fees (Twilio):** Sole Proprietor brand $4 one-time; Low-Volume Standard brand $4; Standard brand $44; campaign vetting $15 one-time; monthly campaign fee $1.50 (Low Volume Mixed), $2 (Sole Proprietor), $10 (Standard). Billed 3 months up front. https://www.twilio.com/en-us/phone-numbers/a2p-10dlc, https://support.telnyx.com/en/articles/5634625-10dlc-fees-and-charges
- **Throughput:** Sole Proprietor ~1,000 segments/day to T-Mobile; Low-Volume Standard 2,000/day.
- **Timeline:** brand near-instant; campaign vetting 24 to 72 h when clean, "up to 5 business days" officially; sole-prop 3 to 7 business days; rejections stretch to weeks. https://www.telgorithm.com/news/how-long-does-10dlc-registration-take-in-2026-whats-changed-and-what-hasnt
- **ISV/CSP:** Each SMB is its own Brand, so register a brand + campaign per customer: about $19 one-time + $1.50 to 2/mo per customer on the cheapest paths. Twilio ISV flow: Primary Customer Profile for you, Secondary Customer Profile + Brand per customer. https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-isv. Must collect EIN/BN, address, website, sample messages, opt-in evidence from every SMB. Quo charges $19.50 one-time + $1.50 to 3/mo; Phone2 charges $5 + $1.50/mo.
- **Toll-free alternative:** verification free, ~5 business days; unverified TF A2P blocked since Jan 2024; TF inbound voice $0.022/min vs $0.0085 local; SMBs want a local-looking number.

---

## 3. Canada

- Canadian carriers do not use TCR/10DLC but filter unregistered A2P long-code traffic (informal caps ~100 to 250 msgs/day/number). Twilio: Canadian numbers bought on/after Mar 26 2025 need full A2P registration or Twilio Persona verification before texting Canadian subscribers. Any traffic to a US recipient requires 10DLC. https://www.telerivet.com/blog/canada-sms-compliance-casl-10dlc-registration
- **CASL:** applies to any commercial electronic message incl. SMS. Express consent must be opt-in. Implied consent 2 years after purchase, 6 months after inquiry. Transactional/service messages (quotes, confirmations, safety info) exempt from consent but need sender identification and unsubscribe honored within 10 business days; no promotional content inside. Penalties up to $10M per violation. https://gowlingwlg.com/en/insights-resources/guides/2023/doing-business-in-canada-casl
- **Porting:** CRTC-mandated LNP; rate centre must be preserved. CPaaS ports take days to weeks. https://crtc.gc.ca/eng/archive/2005/dt2005-72.htm

---

## 4. Calling requirements

- **STIR/SHAKEN:** Twilio ISVs create a Secondary Business Profile per customer for "A" attestation. CRTC required STIR/SHAKEN since Nov 30 2021. Since Feb 5 2026 every US voice provider incl. resellers must maintain a Robocall Mitigation Database filing with annual recertification; budget $1 to 5k/yr and get counsel. https://viirtue.com/stir-shaken-robocall-mitigation-database-2026-filing-requirements-for-voip-providers-and-msps/
- **US 911:** interconnected VoIP must provide dispatchable/registered location. Twilio $0.75/number/mo for emergency address; **$75 per 911 call** from a number with no registered address; Telnyx $100 penalty. https://www.fcc.gov/mlts-911-requirements
- **Canada 911 (CRTC 2005-21, 2005-61, 2007-44, 2017-182):** local VoIP providers register with CRTC as reseller, deliver 911 via 0-ECRS routing, and give 911-limitation notices at signup, marketing and ToS. https://crtc.gc.ca/eng/phone/911/voip.htm
- **Call recording consent:** 11 clear all-party states plus 4 treated cautiously; Canada one-party under Criminal Code s.184 but PIPEDA requires notification. Play an announcement on every recorded call. https://www.priv.gc.ca/en/privacy-topics/surveillance/02_05_d_14/

---

## 5. AI inference and speech pricing

**Anthropic (per MTok in/out):** Haiku 4.5 $1/$5; Sonnet 5 $2/$10; Sonnet 4.6 $3/$15; Opus 5 $5/$25; Fable 5.1 $10/$50. Cache read 0.1x input. Batch 50% off. https://platform.claude.com/docs/en/about-claude/pricing

**OpenAI (via CloudZero):** GPT-5.6 Luna $0.20/$1.20; GPT-5.4 Nano $0.20/$1.25; GPT-5.4 Mini $0.75/$4.50; whisper-1 and gpt-4o-transcribe $0.006/min. https://www.cloudzero.com/blog/openai-pricing/

**STT:** Deepgram Nova-3 batch $0.0043/min; AssemblyAI Universal-2 $0.0025/min. https://deepgram.com/pricing, https://www.assemblyai.com/pricing

**Voice-AI platforms all-in:** Vapi about $0.08 to 0.13/min; Retell typical $0.11/min; Bland $0.12 to 0.14/min. At 200 min/month voice AI adds $16 to 28/customer, which alone exceeds a $19 price.

---

## 6. Push, app stores, billing

- APNs/FCM free. Apple Developer $99/yr; Google Play $25 one-time.
- **Apple commission:** 30% standard, 15% Small Business Program (<$1M), 15% on subscriptions after year one.
- **Google Play (since June 30 2026, US/EEA/UK):** 10% service fee on first $1M and all auto-renewing subscriptions, plus 5% billing fee with Play Billing; 0% billing fee with alternative billing or web link-out. https://android-developers.googleblog.com/2026/06/play-expanded-billing.html
- **Billing outside the store:** Guideline 3.1.3(c) covers only apps sold to organizations for employees; a solo plumber buying $29/mo in-app is IAP territory. Workable pattern: free app, pay on the web, unlock via 3.1.3(b) multiplatform. US link-out commission uncertain (0 to 15%). https://developer.apple.com/app-store/review/guidelines/

---

## 7. Per-customer monthly cost model

Volumes: 1 number, 300 in + 300 out SMS segments, 30 MMS, 200 voice min (100/100), 60 after-hours conversations x 6 turns x (1,500 in + 150 out tokens) = 540k input / 54k output tokens, 40 voicemail minutes, 10DLC amortized, support.

**AI:** Haiku 4.5: $0.54 + $0.27 = $0.81. Sonnet 5: $1.08 + $0.54 = $1.62. Plus $0.15 for classifier + voicemail summaries.

**10DLC amortized:** ($4 + $15)/12 + $1.75 = $3.33/mo at 12-month customer life.

**Other:** E911 $0.75 (Twilio) / $1.00 (Telnyx est.); voicemail recording + Deepgram batch; infra $0.75; support $2.00.

| Line item | Twilio + Haiku | Twilio + Sonnet 5 | Telnyx + Haiku | Telnyx + Sonnet 5 |
|---|---|---|---|---|
| Number + E911 | 1.90 | 1.90 | 2.10 | 2.10 |
| SMS (600 segments + carrier fees) | 7.53 | 7.53 | 3.75 | 3.75 |
| MMS (30) | 0.76 | 0.76 | 0.48 | 0.48 |
| Voice (200 min) | 2.25 | 2.25 | 1.22 | 1.22 |
| Voicemail rec + STT (40 min) | 0.27 | 0.27 | 0.25 | 0.25 |
| AI | 0.96 | 1.77 | 0.96 | 1.77 |
| 10DLC amortized | 3.33 | 3.33 | 3.33 | 3.33 |
| Infra | 0.75 | 0.75 | 0.75 | 0.75 |
| Support | 2.00 | 2.00 | 2.00 | 2.00 |
| **COGS** | **$19.75** | **$20.56** | **$14.85** | **$15.66** |

**Gross margin after payment take** (Stripe web 2.9% + $0.30; Apple SBP 15%; standard 30%):

| Price | Twilio+Haiku: Stripe / 15% / 30% | Telnyx+Haiku: Stripe / 15% / 30% | Telnyx+Sonnet 5: Stripe / 15% |
|---|---|---|---|
| $19 | -8% / -19% / -34% | 17% / 7% / -8% | 13% / 3% |
| $29 | 28% / 17% / 2% | 45% / 34% / 19% | 42% / 31% |
| $39 | 46% / 34% / 19% | 58% / 47% / 32% | 56% / 45% |
| $49 | 56% / 45% / 30% | 66% / 55% / 40% | 65% / 53% |

Read-outs: AI is 5 to 11% of COGS. Telecom is 50 to 60%. Twilio vs Telnyx is worth about $5/customer/month. 10DLC is the second largest item; pass it through. $19 does not work; $29 via web billing on Telnyx-class rates is the floor for a 45% margin.

**Tail risks:** a heavy customer (3,000 in + 3,000 out segments, 2,000 voice min) costs about $100/mo on Twilio, so cap SMS/minutes, not AI. Canada: same 300/300 SMS profile costs $12.18 vs $7.53 on Twilio because of inbound surcharges. Every $0.001 per-segment carrier change moves COGS $0.60/customer/month. Per-turn context growth can double AI tokens; still only $2 to 3. Fixed compliance costs (RMD filing, CRTC reseller registration, Form 499/USF if interconnected VoIP, E911 penalties, CASL) dominate below 500 customers.

---

## 8. App review and CPaaS acceptable-use risks

- **Apple:** VoIP apps must use CallKit; every PushKit VoIP push must immediately report a CallKit call or pushes are throttled. Reviewers test an inbound call. Free app + web subscription accepted if the app never steers to web outside the US.
- **Google Play:** SMS/Call Log permissions limited to default handlers; do not request READ_SMS/READ_CALL_LOG. https://support.google.com/googleplay/android-developer/answer/10208820
- **Twilio Messaging Policy:** prior express consent required; conversational exception lets you reply to someone who texted first but "does not provide you necessary consent to engage in ongoing recurring engagement"; STOP language, sender identification. 10DLC campaign description must state replies are automated. https://www.twilio.com/en-us/legal/messaging-policy. Telnyx AUP mirrors this. AI-initiated outbound needs express written consent; AI voice outbound is an artificial voice under the FCC's 2024 ruling. T-Mobile fines $500 to 10,000 per incident.

**Bottom line:** viable only at $29+ with wholesale rates, web billing, 10DLC passed through, and fair-use caps. AI cost is not the constraint.
