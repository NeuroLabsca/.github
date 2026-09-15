# Appendix D: AI urgency-triage feasibility (Sept 2026)

## 1. Prior art and benchmarks

Nobody has published numbers on this exact task (short, context-poor customer texts, 3 to 4 urgency classes, business-specific rubric). The closest analogues show LLMs are good at the easy ends and unreliable in the middle, and the miss rate on the highest-acuity class is the weak spot.

- 2026 meta-analysis of 11 ED-triage studies (3,088 cases): pooled **sensitivity 61% (CI 48 to 73%), specificity 97%** for the highest-acuity class; LLMs under-triage. All retrospective. https://pmc.ncbi.nlm.nih.gov/articles/PMC13520277/
- 1,057 real ED triage conversations, binary urgent vs non-urgent, zero-shot: Gemini 2.5 Flash 73.8% accuracy, sensitivity 67.9%, specificity 88.9%. Gemini 2.5 Pro sensitivity 90.9% but specificity 23.3% (escalates almost everything). GPT-4.1 70.6% / 81.3% / 42.9%. Failure modes: over-triage driven by keywords and under-triage when context was absent. https://pmc.ncbi.nlm.nih.gov/articles/PMC12403343/
- 4-class patient-inquiry triage, few-shot: Claude Haiku 4.5 at 12-shot reached macro-F1 0.475. "Self-care agreement is reliable, urgent-clinician-review is not"; suitable for "selective human review, not autonomous deployment." https://arxiv.org/abs/2605.15680
- Human ceiling: PMR-Bench portal-message urgency, two expert annotators agreed only 85% (Krippendorff alpha 0.63). Fine-tuned 8B models gained 15 to 16 points over off-the-shelf. https://arxiv.org/abs/2601.13178
- The one great result (accuracy 0.99, sensitivity 0.98 on 1,020 Vanderbilt portal messages) required a knowledge-graph RAG from a 225-protocol nurse triage book; plain-prompt LLM underperformed. A structured domain rubric matters more than model choice. https://pubmed.ncbi.nlm.nih.gov/40220286/
- Anthropic ticket-routing guide: retrieval of similar labeled examples moved accuracy from 71% to 93%; 95% is a reasonable deployment threshold. https://platform.claude.com/docs/en/about-claude/use-case-guides/ticket-routing

**Ambiguity:** "no hot water" or "no heat" is not resolvable from text alone; industry guidance uses outdoor temperature, vulnerable occupants, active hazard. https://www.covenantairesolutions.com/post/what-is-considered-an-hvac-emergency

**Expectation:** with a good rubric plus 10 to 30 owner-specific examples plus a clarifying question, a frontier model should reach ~90%+ agreement on Routine and unambiguous Critical, with the Needs-owner/Urgent boundary at 70 to 85%. No published evidence supports Critical recall >98% from prompts on short texts.

## 2. How existing products handle it

| Product | Mechanism | Escalation | Notes |
|---|---|---|---|
| Smith.ai | Humans + AI; owner keyword rules | Transfer to cell; $3 per AI-to-human transfer | Top complaint: unauthorized transfers inflating bills. https://contractortoolstack.com/software/smith-ai/ |
| Ruby | Live humans | Transfer to on-call | Ruby recommends message-only late at night "so that we aren't trying to transfer a call at 3am." https://rubyhelpcenter.helpjuice.com/answering-hours/extended-hours-247-reception-service |
| Rosie | LLM-driven urgency, no keyword config | Transfer on $149 plan | No fallback if owner doesn't answer; zero verified reviews. https://contractortoolstack.com/software/rosie/ |
| Goodcall | None | Takes a message | https://contractortoolstack.com/compare/rosie-vs-goodcall/ |
| CallsAround | Keywords + custom phrases | Escalation chain, AMD, press-1 gate, SMS each hop, fallback; $229/mo | https://contractortoolstack.com/software/callsaround/ |
| Jobber AI Receptionist | Owner keyword list | Text with transcript snippet or transfer; $29/mo | https://help.getjobber.com/hc/en-us/articles/25315927533847-Receptionist-powered-by-Jobber-AI |
| Dialpad AI Agent | Intent/urgency + rules | Transfer | Mid-market. |
| Quo Sona | Instructed transfers for "escalations or emergencies" | Transfer | SMS triage not documented. https://support.quo.com/core-concepts/ai-automations/sona-ai-agent |
| Numa | Dealership "heat case" detection | Alert | Pivoted away from SMB. |

The dominant pattern in trades is owner keyword lists plus a transfer. Nobody publishes false-negative/false-positive rates. Documented failures: over-escalation billed as a fee (Smith.ai), and accessibility failure (UK GP practice decommissioned an AI receptionist after a stroke patient could not get through, https://thenextweb.com/news/ai-gp-receptionist-stroke-patient-accessible-information-standard). Air Canada was held liable for its chatbot's invented policy (Moffatt v. Air Canada, 2024 BCCRT 149), the precedent for "yes we'll be there at 8am." https://www.pinsentmasons.com/out-law/news/air-canada-chatbot-case-highlights-ai-liability-risks

## 3. Mitigations and who ships them

- **Owner-defined rubric / keywords:** Smith.ai, Jobber, CallsAround ship keyword lists; nobody ships a structured per-business rubric.
- **"When unsure, escalate":** uncalibrated, this wakes everyone (Gemini 2.5 Pro). Needs a measured threshold from a labeled set. https://arxiv.org/html/2506.11887v3
- **Clarifying question before deciding:** no trades product documents this for SMS. Must default to escalate on timeout.
- **Customer self-escalation ("reply URGENT or call NNN"):** trivial, nobody documents it, converts a classifier problem into a UX problem. Highest value per effort.
- **Voice fallback "press 1 for emergency":** standard IVR; CallsAround and Smith.ai effectively do this.
- **Escalation chain with AMD and acknowledgement gate:** only CallsAround. Twilio AMD $0.0075/call. https://www.twilio.com/docs/voice/answering-machine-detection
- **Learning from owner corrections / eval harness:** nothing public.

## 4. Telecom and platform constraints

- **Cannot intercept the owner's existing SMS.** iOS `ILMessageFilterExtension` sees only unknown senders, sandboxed, no network. https://developer.apple.com/documentation/sms_and_call_reporting/ilmessagefilterextension. Android READ_SMS/RECEIVE_SMS only for the default SMS handler. https://support.google.com/googleplay/android-developer/answer/10208820. Product needs its own VoIP number.
- **Push is best-effort.** APNs keeps one queued notification per app; Android Doze and OEM battery killers delay pushes. https://firebase.blog/posts/2025/04/fcm-on-android/
- **iOS interruption levels:** Time Sensitive needs only a capability and breaks through Focus if the user allows it. Critical Alerts require an entitlement Apple grants to health, public safety, home security; "vague 'our notifications are important' rarely passes." https://newly.app/how-to/critical-alerts-entitlement. PagerDuty has it; assume no for a small business app.
- **Android:** `setBypassDnd` requires user-granted DND policy access. Full-screen intents restricted to calling/alarm apps on Android 14+.
- **VoIP push:** every PushKit push must report a CallKit call; iOS 26 SDK enforces strictly. https://developer.apple.com/forums/thread/801446
- **SMS latency:** Twilio queues can hold 4 hours; A2P filtering drops silently. Fine for digest, not the Critical interrupt. https://www.twilio.com/docs/messaging/guides/scaling-queueing-latency
- **The reliable interrupt is a PSTN call to the owner's real cell**, repeated with AMD + press-1, then a backup contact. This is what PagerDuty does over Twilio.
- **10DLC:** 3 to 6 weeks end-to-end is common; per-business brand as an ISV. https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-isv

## 5. Build estimate (text-only MVP, 1 to 2 people)

Scope: Twilio/Telnyx number per business, inbound SMS + voicemail-transcript webhooks, LLM classify + reply with rubric and few-shot, clarifying-question turn, self-escalate keyword, push (Time Sensitive) + fallback call chain with AMD, owner correction UI, morning digest, Expo app.

- Weeks 1 to 2: telephony plumbing, webhook service, data model, 10DLC submission on day 1.
- Weeks 2 to 4: classifier + reply generator with hard guardrails (templates only; no free-text commitments on times/prices), eval harness, 200 to 300 labeled messages.
- Weeks 4 to 6: Expo app, push, call-chain escalation, digest, correction loop.
- Weeks 6 to 8: pilot with 3 to 5 businesses, threshold tuning, TestFlight/App Store.

Effort: 8 to 14 person-weeks. At $150 to 250/hr contract rates, $60 to 140k. Recurring: <$300/mo for a handful of pilots; LLM cost single-digit dollars.

Major risks: 10DLC blocks pilots 3 to 6 weeks per customer; App Store review of a CallKit app adds 1 to 3 weeks; reply generation hallucinating commitments; spam/prompt-injection via inbound SMS; push unreliability means the call chain is the product; owners won't whitelist or answer.

## 6. Verdict

As an unassisted classifier, no. As one layer in a system whose safety comes from the customer's own escalation, a clarifying question, an owner rubric, and a phone-call chain with acknowledgement, plausibly yes. The defensible product is the workflow, not the classifier. Missing a real emergency once loses the customer; waking them for nothing three times also does.

**Evaluation to run before building (2 to 3 weeks, no app):**
1. Collect 300 to 500 real after-hours texts/voicemail transcripts from 5 to 10 friendly plumbers/HVAC/electricians.
2. Each owner labels their own messages with the 4 classes; measure owner-vs-owner and owner-vs-self agreement. Kappa under ~0.6 means the target is inherently fuzzy.
3. Run 3 to 4 models zero-shot, 12-shot, and with the owner's rubric. Report per-class precision/recall with bootstrap CIs.
4. Sweep an escalation threshold and plot recall vs false-wakeup; ask owners how many false 2am calls per month before they turn it off.
5. Add the clarifying-question step and measure how many ambiguous cases it resolves.
6. Adversarial set: injection, gibberish, non-English, wrong-number, hedged emergencies.

If Critical recall with the full pipeline is under ~95%, or the false-wakeup rate at that recall exceeds what owners tolerate, kill or reposition as a morning-digest tool with self-escalation only.
