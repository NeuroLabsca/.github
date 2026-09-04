# Underserved App Store niches worth building in (September 2026)

Scope: Apple App Store only. Goal: find niches where paying demand exists and the current apps are thin, stale, or weak.

## Method

- Swept about 150 keyword searches against Apple's iTunes Search API (US storefront, up to 200 results each).
- Filtered each result set to apps whose name or description actually names the niche, then measured: number of niche apps, the leader's rating count and star rating, share updated in the last 12 months, and how many charge upfront.
- Cross-checked with RevenueCat's State of Subscription Apps 2026, Sensor Tower's State of Mobile 2026, and CloneChart's category revenue model.
- Rating counts are a demand proxy, not search volume. Before building anything below, confirm keyword volume in AppTweak or Astro, and talk to 15 to 20 people in the niche.

## Market backdrop that shapes the picks

| Fact | Source | Why it matters |
|---|---|---|
| Non-game IAP revenue passed games in 2025 and grew 21% YoY | Sensor Tower | Utility and health subscriptions are where growth is |
| Finance, Medical, Business have the highest revenue per ranked app; Medical has only 8 apps on the grossing chart | CloneChart (model estimate) | Small categories pay well per app |
| Hard paywalls convert 10.7% vs 2.1% freemium at day 35; long trials (17 to 32 days) convert 42.5% vs 25.5% for short | RevenueCat 2026 | Pricing model matters as much as the idea |
| AI apps: 41% higher year-1 LTV but 36% worse 12-month retention | RevenueCat 2026 | Do not build a generic AI wrapper |
| Median solo developer earns under $1k/month; top quartile $3k to $15k/month after 12 to 18 months | RevenueCat, indie surveys | "Profitable" here means $3k to $15k/month, not a unicorn |

## Shortlist

Scores are 1 to 5. Demand = population times pain. Pay = who pays and how readily. Gap = how weak the incumbents are. Edge = something Apple hardware or frameworks give you that a web app cannot.

| # | Niche | Demand | Pay | Gap | Edge | Evidence from the sweep |
|---|---|---|---|---|---|---|
| 1 | Parkinson's medication timing and ON/OFF diary (iPhone + Watch) | 4 | 4 | 5 | 5 | 87 niche apps, best has 774 ratings, all free, none built around Watch |
| 2 | Estate executor companion | 4 | 5 | 5 | 2 | 5 niche apps; 3 launched summer 2026 with 0 ratings; web incumbents charge $39 to $199 and have no native app |
| 3 | IEP parent advocate | 4 | 4 | 4 | 3 | 35 niche apps, leader 89 ratings; new entrants in 2026 but none with traction |
| 4 | Heart failure daily weight and symptom zones | 4 | 3 | 4 | 4 | 36 niche apps, leader 233 ratings (Welldoc) |
| 5 | Dementia family caregiver coordination | 5 | 3 | 4 | 2 | 57 niche apps, leader 116 ratings, one popular app at 3.1 stars |
| 6 | Homeschool records and compliance | 3 | 4 | 4 | 2 | 28 niche apps, leader 112 ratings |
| 7 | Transplant recipient medication and labs | 2 | 4 | 5 | 3 | 79 niche apps, leader 3.9 stars with 86 ratings (CareDx) |
| 8 | Homestead and small-flock records (chickens, goats, sheep) | 3 | 3 | 5 | 2 | Cattle is served (Ranchr, CattleMax); everything smaller is games and nothing else |

### 1. Parkinson's medication timing and ON/OFF diary

- Who: 1.1M people in the US, about 90k new diagnoses a year (Parkinson's Foundation). Levodopa timing is a daily, high-stakes problem: late doses cause OFF periods, and neurologists ask for ON/OFF diaries that patients keep on paper.
- Gap: the App Store has foundation apps, pharma apps, and research apps. None charge, none are Watch-first, and the best has 774 ratings. My CareCycle (2025) is the only modern consumer entry.
- Apple edge: Apple's Movement Disorder API (CMMovementDisorderManager) gives passive tremor and dyskinesia scoring on Watch. Watch haptic dose reminders work when the phone is across the room. HealthKit sleep and gait data round it out.
- Pricing: $6.99/month or $49.99/year, 14-day trial, hard paywall. Caregivers and adult children buy for parents.
- Risks: older demographic, so onboarding must be large-type and Watch-optional. Keep it a diary and reminder tool, not a diagnostic, to stay out of medical device territory. Foundation apps are free, so the paid pitch is "the diary your neurologist actually uses".

### 2. Estate executor companion

- Who: roughly 3M US deaths a year, most producing an executor who has never done it before. Executor expenses are reimbursable from the estate, which removes price sensitivity.
- Gap: EstateExec ($199) and SwiftProbate ($39) are web-only. On the App Store, three executor apps launched in June to August 2026 with zero ratings each. The gap is real and other people just noticed it, so speed matters.
- Product: state-aware checklist, deadline tracker, asset and debt ledger, receipts, beneficiary communication log, PDF export for the court and the family.
- Pricing: one-time $79 to $99 unlock, or $14.99/month for the 6 to 18 months an estate takes. Finance and Business categories carry the highest revenue per app on the store.
- Risks: 50-state legal content is the whole moat and the whole cost. Needs firm "not legal advice" framing. A web incumbent could ship an app; none has in years.

### 3. IEP parent advocate

- Who: 7.9M US students have IEPs (about 15% of public school students). Parents already pay advocates $100 to $300 an hour.
- Gap: leader is a $59.99 teacher tool with 89 ratings. Two 2026 entrants (IEPAssist, IEP Compass) do AI summaries of uploaded IEPs but have no traction yet.
- Apple edge: on-device Foundation Models can summarise and search IEP documents without sending a child's records to a server. That is a real privacy story for this audience. Limitation: iPhone 15 Pro and newer only, so ship a cloud fallback.
- Pricing: $9.99/month or $79/year. Seasonal spikes around annual reviews and back-to-school.
- Risks: documents vary wildly by district. Do not promise legal outcomes.

### 4. Heart failure daily weight and symptom zones

- Who: about 6.7M US adults. Standard discharge instruction is "weigh yourself every morning, call if you gain 2 to 3 lb in a day or 5 lb in a week", and the traffic-light zone sheet is universal.
- Gap: 36 niche apps, leader 233 ratings. Hospitals hand out paper.
- Apple edge: HealthKit already receives weight from smart scales, and Watch gives resting heart rate and step trends. A zone alert that watches the scale is a natural fit.
- Pricing: $4.99/month or $39.99/year. Adult children are the buyer.
- Risks: Medical category review, older users, some hospital systems run free remote monitoring programs.

### 5. Dementia family caregiver coordination

- Who: 12M+ unpaid US dementia caregivers (Alzheimer's Association 2026).
- Gap: generic tools (CaringBridge) and device-tied apps. Leader is 116 ratings; RAZ Care sits at 3.1 stars.
- Product wedge: shared family log of behaviour, meds, meals, and sleep, plus a shift calendar and a one-tap "what happened today" summary for siblings. Avoid the generic care-team-page approach that is already free.
- Pricing: family plan $8.99/month.
- Risks: emotionally heavy sales, high churn when care ends, low willingness to add work for the primary caregiver.

## Looked at and rejected

- Crowded with strong leaders: tinnitus (white noise apps and hearing-aid makers), hearing aids (OEM apps with 100k+ ratings), OCD (NOCD), epilepsy (Epsy), migraine, menopause and perimenopause, ADHD, fasting, GLP-1, budgeting, habits, meditation, sobriety, pilot logbooks, notary journals, home and boat maintenance (owned by marketplaces).
- Demand too small to fund a subscription: cluster headache, vitiligo, lymphedema, PICC line, anemia.
- No payer: foster parents (nonprofit and agency apps only), hospice families (B2B EHR apps), chemotherapy trackers (free provider apps, and charging cancer patients is a hard sell), post-surgery recovery (hospitals supply apps).
- Platform bets: visionOS has about 4,200 apps and is roughly 75% enterprise-owned; builds start at $40k. Mac App Store is fine as a companion, not a primary market.
- Generic AI wrapper apps: high acquisition, poor retention, and Apple's own on-device models keep eroding the moat.

## Recommendation

Build the Parkinson's app first. It has the clearest daily pain, the emptiest paid field, and the only opportunity on the list where Apple hardware is a genuine moat. Executor companion is the strongest second bet and the one to move on quickly if someone else's summer 2026 launch starts collecting ratings.

Before writing code, spend two weeks on validation:

1. Check monthly search volume for "parkinson", "parkinson's diary", "levodopa reminder", "on off diary" in an ASO tool.
2. Post in r/parkinsons and the Parkinson's Foundation forums asking how people track ON/OFF today; aim for 15 conversations.
3. Put up a one-page waitlist with the $49.99/year price visible and measure sign-ups.
4. Prototype the Watch reminder and Movement Disorder API read on a real Watch, since that is the moat and it has had API bugs before (watchOS 9.6.1 fixed one).

## Raw data

Sweep output (rating counts, freshness, leaders) was generated on 2026-09-04 from the US storefront. Re-run before acting, since three of the executor apps appeared in the last 90 days and the field can move in a quarter.
