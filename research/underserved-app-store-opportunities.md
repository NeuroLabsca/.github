# Underserved App Store niches worth building in (September 2026)

Scope: Apple App Store only, non-health. Goal: niches with paying demand where the current apps are thin, stale, or weak.

## Method

- Swept about 300 keyword searches against Apple's iTunes Search API (US storefront, up to 200 results each), then filtered each result set to apps whose name or description actually names the niche.
- Measured per niche: number of niche apps, the leader's rating count and stars, how many are updated in the last 12 months, and how many charge upfront.
- Cross-checked market facts with RevenueCat's State of Subscription Apps 2026, Sensor Tower's State of Mobile 2026, and CloneChart's category revenue model.
- Rating counts are a demand proxy, not search volume. Before building, confirm keyword volume in AppTweak or Astro and talk to 15 to 20 people in the niche.

## Market backdrop

| Fact | Source | Why it matters |
|---|---|---|
| Non-game IAP revenue passed games in 2025, up 21% YoY | Sensor Tower | Utility and admin subscriptions are where growth is |
| Finance and Business have the highest revenue per ranked app on the store | CloneChart (model estimate) | Money and admin niches pay well per app |
| Hard paywalls convert 10.7% vs 2.1% freemium at day 35; 17 to 32 day trials convert 42.5% vs 25.5% for short ones | RevenueCat 2026 | Pricing model matters as much as the idea |
| AI apps: 41% higher year-1 LTV but 36% worse 12-month retention | RevenueCat 2026 | Do not build a generic AI wrapper |
| Median solo developer earns under $1k/month; top quartile $3k to $15k/month after 12 to 18 months | RevenueCat, indie surveys | "Profitable" here means $3k to $15k/month |

## The pattern that held up

The strongest signal across 300 searches was not a hobby or a trend. It was a legal, court, or tax duty to keep records, combined with a person who has never done it before and a budget that is not their own. Executors, trustees, court-appointed guardians, volunteer treasurers, house flippers, and owner-operators all fit. Every one of those niches is empty or near-empty on the store while web tools charge $39 to $499.

## Shortlist

Scores 1 to 5. Demand = population times pain. Pay = who pays and how readily. Gap = how weak the incumbents are. Build = how cheap and low-risk it is to ship (5 = cheapest).

| # | Niche | Demand | Pay | Gap | Build | Evidence from the sweep |
|---|---|---|---|---|---|---|
| 1 | Family fiduciary suite: executor, successor trustee, guardian or conservator accounting | 4 | 5 | 5 | 3 | "conservator accounting", "guardianship annual report", "trustee accounting", "successor trustee": 0 apps each. Executor: 13 apps, leader 36 ratings; 3 launched summer 2026 with 0 ratings |
| 2 | House-flip rehab budget and project tracker | 3 | 5 | 5 | 4 | "rehab budget": 0 apps. Leader for "rehab estimate" has 19 ratings. FlipperForce is web at $79 to $499/month with a photo-only field app |
| 3 | Backyard flock and homestead records | 5 | 2 | 5 | 4 | 11 to 13M US households keep chickens. Flock leaders: 16 and 42 ratings, one from 2018; the BackYard Chickens forum app is 3.1 stars, last updated 2018 |
| 4 | Owner-operator per diem and expense log | 3 | 4 | 4 | 4 | "trucker per diem": leader 2.6 stars, last updated 2019. "trucker taxes": one app, 0 ratings. IFTA apps exist but do not count nights away |
| 5 | Volunteer treasurer for small groups (PTA, booster, club, tiny HOA) | 4 | 4 | 4 | 3 | "treasurer", "PTA treasurer", "booster club", "HOA treasurer": MoneyMinder is the only real entry (6 ratings, app shipped 2026, $299/year). BoosterHub 3.4 stars |
| 6 | Maker business pricing, COGS and booth sales | 4 | 3 | 4 | 4 | 5.6 to 8M Etsy sellers. Leaders: Craft Pricing Helper 37 ratings, Booth Math 6. Craftybase is web at $49 to $349/month |
| 7 | Homeschool records, attendance and transcripts | 4 | 4 | 3 | 3 | 3.4 to 4.3M students. 28 apps, leader HomeTrail 112 ratings. Six states mandate portfolios |
| 8 | T-bill and CD ladder tracker | 2 | 3 | 5 | 5 | "bond ladder": 3 apps, 0 to 2 ratings. TreasuryDirect is rated 1 star on complaint sites |

### 1. Family fiduciary suite

- Who: about 3M US deaths a year produce a first-time executor or successor trustee. 1.3M adults live under guardianship or conservatorship, with $50B in assets, and most states require an annual accounting filed with the court on a deadline (National Center for State Courts, state court self-help pages).
- Gap: zero apps for guardian, conservator, or trustee accounting. Executor apps are brand new and unrated. Web tools (EstateExec $199, SwiftProbate $39, GuardianFAS for lawyers) have no native presence.
- Product: one ledger model (assets, income, disbursements, receipts, mileage) with three views: estate, trust, guardianship. State-aware deadline calendar. Court-ready PDF accounting. Family sharing so siblings can see what the fiduciary did.
- Pricing: $99/year. Guardianship renews every year for years, which is the subscription engine. Executor and trustee users convert to one-time $79. Fees are reimbursable from the estate or ward's funds.
- Why first: highest willingness to pay, a content moat nobody has built, and a recurring court deadline that keeps people subscribed.
- Risks: 50-state content work. Needs firm "not legal advice" framing. Three executor competitors appeared this summer, so the executor module should ship first and fast.

### 2. House-flip rehab budget and project tracker

- Who: 297k flips in 2025 (ATTOM), roughly 8% of home sales. Typical gross profit $66k, so a $20/month tool is noise.
- Gap: "rehab budget" returns nothing. Flippers run spreadsheets from BiggerPockets. FlipperForce charges $79 to $499/month, web-first, and its mobile app only posts photos.
- Product: per-project scope of work with a cost database, budget versus actual by line item, receipt capture, draw schedule, holding-cost clock, contractor payments, and a deal-summary PDF for lenders.
- Pricing: $19.99/month or $149/year. Solo flippers priced out of FlipperForce are the target.
- Risks: flipping volume is at a five-year low. Audience is reachable but small. Keep scope to the rehab phase, not deal analysis, where DealCheck already wins.

### 3. Backyard flock and homestead records

- Who: 11M US households own backyard chickens (APPA 2025), up 28% since 2023, plus goats, ducks, bees, and gardens. About 30% of the 1.9M census farms sell under $10k a year.
- Gap: the store has games and two tiny egg trackers. Cattle is served (Ranchr, CattleMax). Everything smaller is empty.
- Product: flock and animal roster, egg log with cost per dozen, feed and supply spend, health and treatment log with withdrawal periods, breeding and hatch calendar, garden beds and harvest, equipment maintenance hours, sales for the farm stand. Local-first, no backend, the HabitKit model.
- Pricing: $2.99/month, $19.99/year, $39.99 lifetime. This is a volume play at low price, not a premium subscription.
- Risks: willingness to pay is the weak score. Win on breadth and delight, expect ads and word of mouth in chicken Facebook groups to do the marketing.

### 4. Owner-operator per diem and expense log

- Who: several hundred thousand owner-operators file Schedule C. The 2026 per diem is $80/day at 80% deductible, worth about $17,900 a year for a driver out 280 nights (ATBS). Company drivers cannot claim it, so target owner-operators only.
- Gap: Per Diem Plus is 2.6 stars and last updated 2019. Newer trucker expense apps have 0 to 17 ratings. IFTA apps handle fuel tax but not per diem nights.
- Apple edge: iPhone significant-location monitoring can log nights away from the tax home automatically, which is the one thing spreadsheets cannot do and the thing auditors ask for.
- Pricing: $9.99/month or $79/year. The deduction pays for it in a day.
- Risks: needs to survive an IRS audit, so the location log must be exportable and honest. Ad spend is cheap on trucker YouTube and forums but the audience is skeptical of apps.

### 5. Volunteer treasurer for small groups

- Who: roughly 25k PTAs, tens of thousands of booster clubs and youth sports leagues, 370k HOAs (most small and self-managed), 300k+ churches, 1.5M nonprofits, most run by a volunteer who inherited a shoebox.
- Gap: MoneyMinder is the only real entry and just shipped its app in 2026 at $299/year. BoosterHub is 3.4 stars. Nothing is mobile-first or priced for a $5k-a-year club.
- Product: budget versus actual, dues and fundraiser tracking, reimbursement requests with receipt photos, monthly board report PDF, clean hand-off to the next treasurer.
- Pricing: $79/year per organisation, paid from the club's account.
- Risks: MoneyMinder has 20 years of trust. Sales are seasonal (new treasurers every June and September). Bank sync adds cost and support burden, so start without it.

### 6 to 8 in brief

- Maker business: mobile-first materials, recipes, COGS, pricing, and craft-fair booth sales at $5.99/month. Craftybase is 10x the price and web-only. Risk is low seller income and churn.
- Homeschool: attendance, hours by subject, portfolio photos, transcripts, and state-specific requirement checklists. HomeTrail and Homeschool Ledger are ahead but small. Risk is that the audience expects free tools.
- Ladder tracker: rungs, maturities, auto-roll reminders, yield math for T-bills, CDs, and I-bonds. Cheapest build on the list. Risk is that demand follows the rate cycle.

## Also worth a look, but smaller

- Pottery studio notebook (kiln firings, glaze recipes, test tiles): four new 2026 entrants, all 1.9 to 3.4 stars. Demand is real and execution is weak.
- Name-change checklist after marriage or divorce: zero apps, web services charge $39 to $99, about 1.4M name changes a year. One-time $19.99. Good weekend build, no retention by design.
- Photographer and videographer gear inventory (serials, insurance schedule, rental log): four apps with 0 to 12 ratings.
- FFL bound book for small dealers: one unrated app, web incumbents at $8 to $9/month, ATF-mandated. Sticky but a compliance-heavy build.

## Looked at and rejected

- Crowded with strong leaders: pickleball, disc golf, ham radio, scuba, track day timers, expat and Schengen day counters, co-parenting expenses, home inventory, warranty trackers, family recipes, 1099 taxes (Keeper, Hurdlr), open-house sign-in, drone logs (DroneDeploy, Airdata), sourdough and fermentation, coin, watch, sneaker, and Lego collections, label printers, NFC, USCIS case trackers.
- Too small: chimney sweep, septic pumping, stand-up setlists, stage management, car-show judging, maple sugaring, storm chasing.
- No payer or wrong buyer: scout troops (official app), kid sports (TeamSnap), vending routes (hardware-tied), laundromats (hardware-tied), immigration document organisers (case-tracker apps will add it).
- Platform bets: visionOS is about 4,200 apps, roughly 75% enterprise-owned, builds start at $40k. Mac App Store is a companion, not a primary market.
- Generic AI wrappers: high acquisition, poor retention, and Apple's on-device models keep eroding the moat.

## Recommendation

Build the fiduciary suite, starting with the executor module. It has the highest willingness to pay on the list, the deepest moat (state content), zero competition in two of its three segments, and a court deadline that renews subscriptions. Ship executor first because three competitors appeared in the last 90 days, then add guardianship accounting where nobody is.

If you want a cheaper, faster first product to learn the store with, the flock and homestead app is the volume play: no backend, huge audience, low price, and no competition worth the name.

Two-week validation before code:

1. Pull keyword volume for "executor", "probate", "estate settlement", "guardianship" in an ASO tool.
2. Talk to 10 elder-law attorneys and 5 court self-help clerks. They are also the distribution channel.
3. Read 50 threads on r/EstatePlanning and the AgingCare forums to list the ten things first-time executors get wrong.
4. Put up a waitlist page with $99/year visible and measure sign-ups.

## Appendix: health niches (deprioritised)

An earlier pass found Parkinson's medication timing (87 apps, none paid, Watch API available), heart-failure weight zones, IEP parent advocacy, and dementia caregiver coordination as the thinnest health niches. They are set aside at the owner's preference, not for lack of evidence.
