# US Lead Marketplace: Feasibility Report

**Question:** What is the fastest legitimate path to generating our first US lead and getting paid for it?

**Research date:** 2026-09-15. Every price and program detail below was checked against a live page or a dated 2025-2026 source on that day. Items marked UNVERIFIED could not be confirmed from a public page and must be confirmed during network onboarding before we rely on them.

---

## 1. Short answer

**Recommendation: residential roofing, one hail-belt metro, sold as web-form leads (ping/post) plus inbound calls, to established aggregators rather than our own buyers.**

- **Vertical:** Roofing (replacement and storm/insurance repair). Widest buyer liquidity of any home-services trade, highest job value in the Tier 1 list ($9k to $18k), and a live buyer bid median of about $130 per lead and $42 per call in September 2026.
- **Geography:** One storm-belt metro chosen by live ZIP-level bid data, not by gut. Shortlist: Denver Front Range, Kansas City, Minneapolis-St Paul, Oklahoma City, Dallas-Fort Worth. Default pick is **Denver**, for reasons in section 6.
- **Monetization on day one:** Modernize (QuinStreet) ping/post API and Networx for form leads; Service Direct, MarketCall and Lead Smart for calls; Prime Lead Exchange as a self-serve backup. None require us to bring advertisers.
- **Fastest first dollar:** roughly 5 to 8 weeks from start, and it will come from a small paid-search test (about $500), not organic. Organic is the scaling strategy and takes 6 to 12 months to matter.

Two things you should hear plainly:

1. **The MVP is a publisher, not a marketplace.** The networks are the marketplace. Our job is manufacturing consented intent and posting it. The site can look like a consumer marketplace, but the admin, data model and revenue all follow the publisher model until we have direct buyers.
2. **Paid roofing arbitrage against aggregator payouts will likely lose money.** Contractors pay $75 to $150 per lead on Google, and aggregators keep a cut before paying publishers. Paid traffic is only justified as a short test to prove the plumbing works (acceptance, pricing, rejection rates), not as a channel. Margin exists only on organic and on calls.

---

## 2. The core question, answered

**Can a brand-new publisher with no advertiser relationships generate leads and get paid by an existing network?** Yes. Five programs verified on 2026-09-15 accept new publishers and pay per lead or per call:

| Program | Type | What they take | How we submit | Pay terms | Status of evidence |
|---|---|---|---|---|---|
| Modernize (QuinStreet) | Aggregator | Roofing, windows, HVAC, solar, plumbing, pest, siding, gutters, 100+ trades | Ping/post API v3 (public docs). Ping returns a price; post within 30 min. TrustedForm token mandatory; exact consent text passed with each lead | Not published. Approval and production tag ID come from an account manager | Verified: apidoc.modernize.com, modernize.com/affiliates |
| Networx | Aggregator | HVAC, plumbing, roofing, remodel, electrical, more | Tracking links, embeddable form, or API | Not published (contractors pay $10 to $120 per lead) | Verified program page; pricing UNVERIFIED |
| Service Direct | Pay-per-call marketplace | 60+ home-service categories including roofing, water damage, pest | Earn API (ping/post for calls) or a static tracking number; Direct Sync webhook returns dispositions | NET7, $50 minimum (third-party listing). Billable on intent, scored by a human, not duration | Verified via blog and listings; site bot-walls fetchers |
| MarketCall | CPA pay-per-call network | Home services among others. Live offer: "Roofing Bundle Inbounds" $70 per call, 120 second minimum, homeowner, replacement only, SEO/paid search allowed, 15 calls/day cap, 7-day hold | Tracking numbers | Weekly | Verified on OfferVault 2026-09-15 |
| Lead Smart Inc | Pay-per-call network (since 2008) | Home services; publishes live per-ZIP buyer bids | Tracking numbers; Loom video required at signup | Monthly, $100 minimum (third-party listing) | Verified benchmark press releases and coverage tool |
| Prime Lead Exchange | Ping/post exchange | 12 home-services verticals incl. roofing, windows, HVAC, water damage | API/webhook/form. TrustedForm or Jornaya cert mandatory | Weekly, $100 min (check/PayPal), $1,000 min (ACH). 21-day hold for new publishers. Chargebacks: 90 days quality, 2 years TCPA, unlimited fraud. 30-day exclusivity | Verified publisher agreement. Company formed 2026, no external footprint |

Programs that are **not** a path for us, with the reason:

| Program | Verdict | Evidence |
|---|---|---|
| Buyerlink | Publisher portal offline; presents as a lead seller, not an exchange | publishers.buyerlink.com and the seller signup returned HTTP 522 on three attempts; company is solvent ($40M credit facility, May 2026) but buyer-facing only |
| LeadBank (Home Alliance) | Accepts applications, publishes no prices, no API docs, legal links broken | leadbank.homealliance.com, terms dated Feb 2026 |
| iLeads | Data and analytics vendor, no publisher intake | ileads.com product pages |
| LiveTransfers.com | Financial and insurance verticals; roofing not listed; stale site; complaints about dialer traffic | livetransfers.com/sell-leads, BBB profile |
| Leadrula Exchange | Paid SaaS ($99 to $299/month) with no verified buyers; domain registered 2026-05-30 | leadrula.com/pricing, RDAP |
| Angi / HomeAdvisor | Affiliate link pays on completed bookings only; third-party lead channel fell from about 40% to under 10% of Angi leads and is "not strategic" | Angi FY2025 10-K, Q3 2025 earnings call |
| Porch, 33 Mile Radius, Clean Energy Experts | Affiliate programs dead or unreachable | FlexOffers "not currently offering"; Cloudflare 1001; Framer 404 |
| PX | Documented ping/post with live pricing, but onboarding is sales-led and geared to volume | api.px.com specs, leads.px.com publisher page |
| boberdoo, LeadsPedia, Phonexa | Software, not demand. Useful later for routing | vendor pages |

---

## 3. Network scorecard

Scores 1 (worst) to 5 (best). "Trust" reflects track record and payment-risk terms.

| Network | Accessibility | Roofing demand | Payout level | Payout transparency | Integration | Pay terms | Trust | Total /35 |
|---|---|---|---|---|---|---|---|---|
| Modernize | 4 | 5 | 3 | 3 (price at ping) | 5 | 3 | 5 | 28 |
| Service Direct (calls) | 4 | 5 | 4 | 3 (dynamic) | 4 | 5 (NET7) | 4 | 29 |
| MarketCall (calls) | 5 | 4 | 4 | 5 ($70 posted) | 3 | 4 (weekly) | 3 | 28 |
| Networx | 4 | 4 | 3 | 1 | 4 | 2 | 4 | 22 |
| Lead Smart (calls) | 3 | 4 | 3 | 5 (per-ZIP bids) | 3 | 2 | 3 | 23 |
| Prime Lead Exchange | 5 | 3 | 3 | 1 | 4 | 3 | 2 | 21 |
| PX | 2 | 4 | 3 | 4 | 5 | 2 | 4 | 24 |
| MaxBounty ($11.25 roofing CPL) | 5 | 3 | 1 | 5 | 2 | 3 | 4 | 23 |
| Buyerlink | 1 | 4 | 3 | 1 | 1 | 1 | 3 | 14 |
| Leadrula | 3 | 1 | 1 | 2 | 4 | 1 | 1 | 13 |

**Plan:** apply to Modernize, Networx, Service Direct, MarketCall and Lead Smart in week 1. Two form buyers and two call buyers is enough redundancy to survive one rejection.

---

## 4. Vertical scorecard

Scores 1 to 5, higher is better for us (so "Competition 1" means brutal competition, "Compliance 5" means simple).

| Vertical | Buyer demand | Lead payout | Consumer demand | Competition | SEO potential | Qualification ease | Compliance | Network access | Tech difficulty | Startup cost | Time to first $ | Total /55 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Roofing** | 5 | 4 | 5 | 2 | 3 | 3 | 4 | 5 | 4 | 4 | 3 | **42** |
| Windows/doors | 4 | 4 | 3 | 3 | 4 | 3 | 4 | 4 | 4 | 4 | 3 | 40 |
| Pest control | 4 | 2 | 4 | 2 | 3 | 5 | 4 | 4 | 4 | 4 | 3 | 39 |
| Water/fire restoration | 5 | 5 | 2 | 4 | 2 | 2 | 4 | 4 | 3 | 4 | 2 | 37 |
| HVAC | 5 | 3 | 5 | 1 | 2 | 4 | 4 | 5 | 4 | 4 | 2 | 39 |
| Plumbing | 5 | 3 | 5 | 1 | 2 | 4 | 4 | 5 | 4 | 4 | 2 | 39 |
| Kitchen/bath remodel | 3 | 4 | 3 | 1 | 2 | 2 | 4 | 4 | 4 | 4 | 2 | 33 |
| Solar | 2 | 3 | 3 | 1 | 2 | 1 | 3 | 3 | 4 | 4 | 1 | 27 |
| Auto insurance (T2) | 5 | 2 | 5 | 1 | 1 | 3 | 1 | 4 | 3 | 3 | 2 | 30 |
| Mortgage (T2) | 4 | 3 | 3 | 1 | 1 | 3 | 1 | 3 | 3 | 3 | 1 | 26 |
| Legal PI (T2) | 5 | 5 | 3 | 1 | 1 | 2 | 1 | 3 | 3 | 3 | 2 | 29 |
| Business financing (T2) | 4 | 3 | 2 | 2 | 2 | 3 | 2 | 4 | 3 | 3 | 2 | 30 |

**Economic inputs behind the scores** (September 2026, sources in section 9):

| Vertical | What contractors pay per lead | What publishers get (calls, median live bid) | Avg job | 2026 market |
|---|---|---|---|---|
| Roofing | Google LSA $126 median charged lead; Angi shared $40 to $120; exclusive $75 to $150, up to $220 in big metros | $42 per call (top decile $85+); buyer CPL bids median $130 | $9.2k to $18k | Flat to stable; hail season above average |
| Windows | Shared $20 to $90; exclusive $80 to $200 | $102 per call | $8.7k to $10k+ whole house | Soft, discretionary |
| Water/fire | LSA $109 median; exclusive $150 to $400+ | $201 water, $193 fire | $3.5k to $8k | Healthy, non-discretionary, call-only |
| HVAC | LSA $73 median; Angi $15 to $85 | $37 to $39 per call | $1.4k service, $7.8k install | Steady; refrigerant change lifts tickets |
| Plumbing | LSA $63 median; shared $25 to $60 | $32 to $39 per call | $200 to $5k | Stable |
| Pest control | LSA $63 median; exclusive $45 to $150 | $42 per call | LTV $1.2k to $2.5k | Healthy, recurring |
| Solar | Exclusive $40 to $120; calls $100 to $400 | UNVERIFIED | $20k to $30k | Weak: residential forecast down 21% in 2026 after the 25D credit ended |
| Remodel | Exclusive $50 to $200 | $100 to $120 per call | $16k to $27k | Slowing |

Publisher payout on **form** leads through aggregators is UNVERIFIED until we are approved. Bounding estimate: 30 to 50 percent of the buyer price, so roughly $15 to $60 per shared roofing lead, with a lead sold to up to four buyers.

**Why roofing beats the runners-up:**
- Water damage pays 5x more per call but is emergency, phone-only intent that a content site rarely captures, and "near me" results are closed to publishers (Local Pack on 97.6 percent of SERPs, LSAs on 49 percent of city queries).
- HVAC and plumbing have the same "near me" problem, plus lower payouts.
- Windows is the best second vertical: same buyers (Modernize, Networx, Prime Lead Exchange), higher per-call payout, softer SERPs, and a small programmatic publisher already ranks page 1 for "window replacement cost Phoenix." Add it once roofing is producing.
- Solar demand is impaired through 2026 and qualification (ownership, roof age, shade, credit, bill) rejects most leads.
- Tier 2 verticals all carry licensing or statutory constraints (RESPA, state insurance producer licensing, bar rules, commercial financing disclosure laws) that outweigh their payouts for a two-person team.

---

## 5. Compliance floor (applies to any vertical)

Current state as of September 2026:

- **FCC one-to-one consent rule is dead.** Vacated by the Eleventh Circuit in IMC v. FCC on 2025-01-24; the FCC has not re-proposed. Pre-2023 prior-express-written-consent governs federally, and "marketing partners" consent is permissible. Buyers still contractually require named-partner consent text, a TrustedForm or Jornaya certificate, and 5-year retention.
- **TrustedForm is de facto mandatory.** Modernize will not accept a post without a token; Prime Lead Exchange requires it; PX and Networx expect it. The publisher-side script is free. ActiveProspect now owns both TrustedForm and Jornaya (Jan 2026), so this is a single-vendor dependency.
- **FTC** treats lead gen as a priority: HomeAdvisor $7.2M (2023), Response Tree $7M (2024), MediaAlpha $45M (Aug 2025). No "free," "government program," or unsubstantiated lead-quality claims. Buyers cannot rely on our consent for prerecorded calls (Mar 2025 TSR guidance), which is their problem, but our consent text must be accurate.
- **State law.** About 15 mini-TCPA states. Texas SB 140 (eff. 2025-09-01) covers texts and requires telemarketer registration with a $10k bond. Florida, Oklahoma, Maryland, Georgia, Connecticut have private rights of action. CCPA treats selling a lead as a "sale": we need a "Do Not Sell or Share" link and opt-out handling, and we may fall under the California Delete Act data-broker registration ($6,000 fee) if we sell California consumers' data. Most other state privacy laws exempt us at our size.

**What the landing page must have** (build into the MVP, not later):
1. Unchecked, adjacent consent disclosure at the submit button naming the site and either the specific buyer or a hyperlinked, versioned partner list. Calls, texts, email, automated technology, AI voice, prerecorded messages, "even if on a do-not-call list," "consent is not a condition of purchase," message rates, STOP to cancel.
2. TrustedForm script on every form; store the certificate URL with the lead.
3. Capture and store: timestamp with timezone, IP, user agent, page URL, form version, consent text version, partner list version.
4. Privacy policy with CCPA disclosures and opt-out; terms; lead-sharing disclosure page.
5. No pre-checked boxes, no pre-populated contact fields, no incentives, no co-registration.
6. Homeowner attestation and ZIP-level geo capture, since buyers reject renters and out-of-footprint ZIPs.

---

## 6. Geographic strategy

**Approach:** one metro, chosen by live buyer bids, not by search volume. Lead Smart's founder puts it directly: ZIP-level bid variance exceeds trade variance. Their public coverage tool exposes daily per-ZIP payouts, and Modernize's ping response quotes a price per ZIP once we are in production. Use both before writing a single page.

**Selection criteria:** hail and storm exposure (drives insurance-funded replacements and Q2 to Q3 spikes), roof replacement cost above the national median, no state telemarketer-registration burden, state privacy law that exempts small businesses, and a SERP that is not already three Angi city pages plus ten roofers.

| Metro | Storm exposure | Roof cost | State compliance burden | Notes |
|---|---|---|---|---|
| **Denver Front Range (default pick)** | Top-2 hail claims state | High ($10k to $15k typical) | Low: no mini-TCPA, Colorado privacy law exempts under 100k consumers | Large insurance-driven replacement market; competitive but not Dallas-level |
| Dallas-Fort Worth | Highest hail volume in US | High | Medium: Texas SB 140 registration and bond affects buyers; SERP already Angi plus local roofers | Biggest market, hardest SERP |
| Kansas City | High | Medium | Low | Smaller, less contested |
| Minneapolis-St Paul | High | High | Low | Strong seasonality |
| Oklahoma City | High | Medium | Medium: Oklahoma mini-TCPA | Cheap SERP |

**Before committing to a metro, run this 1-day check:** pull Lead Smart per-ZIP roofing bids for the top 30 ZIPs in each shortlisted metro, count page-1 non-Angi domains for five "[roofing query] [city]" searches, and pick the metro with the best bid-to-competition ratio. Denver is the default if the data is a wash.

---

## 7. Unit economics and the go/no-go test

The question is: can we manufacture consented demand for $X and sell it for more than $X?

**Organic path (the real business):**
- Cost per lead is content and hosting only. A single-metro site realistically reaches a few thousand visits per month in 9 to 18 months on windows, remodel and roofing cost content. AI Overviews now appear on about 25 percent of queries and cut organic clicks by roughly 47 percent where present, so plan on long-tail, decision-stage pages ("does insurance cover hail damage on a roof in Colorado," "roof replacement cost per square Denver," "roof financing options") rather than head terms.
- At 3,000 visits/month, a 2 to 4 percent lead rate, 80 percent buyer acceptance and a blended $35 to $60 per lead, that is roughly $1,700 to $5,800 per month per metro per vertical. Small, but it is margin, and it repeats.

**Paid test (only to prove the pipe):**
- Publisher long-tail roofing clicks in a mid-size metro run $8 to $25. At 12 percent form conversion, that is $65 to $200 per lead. Against a $15 to $60 aggregator form payout, expect to lose 30 to 70 percent on each lead.
- Calls change the math: a MarketCall roofing call pays $70 and a Service Direct call is dynamically priced, often $40 to $100 in hail markets. A mobile page with a prominent tap-to-call can push a meaningful share of paid visits into calls.
- Budget $500 to $800, target 15 to 25 leads and calls. Success criteria: at least 70 percent acceptance, at least one lead sold above our blended cost, and no compliance rejections. That is enough to validate the integration, the consent flow and real payouts. It is not a channel.

**Go/no-go:** if after 8 weeks we cannot get a lead accepted and paid by at least one network, stop. If we can, the organic build continues and the second vertical (windows) launches on the same site and buyers.

---

## 8. Timeline to first revenue

| Week | Milestone |
|---|---|
| 0 to 1 | Entity, EIN, W-9, business bank account (networks require these). Domain and brand. Apply to Modernize, Networx, Service Direct, MarketCall, Lead Smart. Run the metro selection check. |
| 1 to 3 | Build the roofing landing page and quote funnel, TrustedForm, consent capture, privacy and terms, lead store, ping/post client (Modernize staging first), call tracking numbers. Publish 6 to 10 decision-stage content pages. |
| 3 to 4 | Modernize staging test, production tag ID. Call offers approved. |
| 4 to 6 | Paid test. First leads posted, first calls. |
| 5 to 8 | First payout: Service Direct NET7, MarketCall weekly after a 7-day hold, Modernize on their terms (UNVERIFIED, expect net 30). |
| 6 onward | Organic content cadence; add windows; measure revenue per visitor and per lead by source. |

Cash needed to reach the go/no-go: under $1,500 (domain, hosting, paid test, misc). No inventory, no ad budget beyond the test, no sales hires.

---

## 9. What the MVP must be, given the above

This section sets scope only. Implementation starts after this report is accepted.

- **One site, one vertical, one metro**, structured so vertical and metro are data, not code: a `verticals` table (roofing first) with per-vertical question schemas, a `markets` table (metro plus ZIP list), and content pages keyed to both.
- **Funnel:** ZIP, service type (replace, repair, storm/insurance), roof type and size, timeline, homeowner attestation, contact, consent. Mobile-first, one question per screen, tap-to-call visible throughout.
- **Lead record:** all consent evidence from section 5, UTM and referrer, device, session, TrustedForm cert, duplicate hash (phone plus email plus ZIP, 30-day window), fraud signals (disposable email, VoIP phone, bot timing, IP velocity).
- **Routing:** buyer adapters behind one interface. First adapter is Modernize ping/post; second is a generic ping/post adapter for Prime Lead Exchange and Networx; call tracking numbers are configuration, not code. Store every ping price, post result, rejection reason and later disposition.
- **Revenue:** per-lead sale price from the post response; call payouts reconciled from network reports; both attributed back to source and content page.
- **Admin:** leads, status, buyer response, sale price, rejects, duplicates, revenue per visitor and per lead, by source and page. Nothing more until there is revenue to look at.
- **Stack:** any modern full-stack framework with server rendering for SEO, a relational database, and a static or edge host. Keep it boring.

---

## 10. Sources

Networks and programs (all accessed 2026-09-15): apidoc.modernize.com/publishers/ping-post.html; modernize.com/affiliates; affiliates.networx.com; blog.servicedirect.com/what-to-expect-selling-calls-to-service-direct (2025-09-10); affnext.com/affiliate-networks/service-direct; marketcall.com/affiliates; offervault.com (MarketCall Roofing Bundle, MaxBounty SelectMyQuotes Roofing CPL, 33 Mile Radius offers); leadsmartinc.com/affiliate-register; leadsmart-coverage.netlify.app; prunderground.com (Lead Smart benchmarks, Aug 2026); primeleadexchange.com publisher agreement; buyerlink.co and publishers.buyerlink.com (HTTP 522); leadbank.homealliance.com; ileads.com; livetransfers.com/sell-leads; leadrula.com/pricing and RDAP; Angi FY2025 10-K and Q3 2025 call transcript; flexoffers.com (Modernize, Porch, EnergySage listings); api.px.com/v2/verticals; leads.px.com/publishers-new-landing-page; boberdoo.com, leadspedia.com, phonexa.com.

Pricing and market: 99calls.com/LSA-Cost-Estimator (Sept 2026); getbiddable.com roofing benchmarks (Feb 2026); leadtruffle.co and inshalytics.com Angi pricing (2026); help.networx.com lead cost article; callscaler.com/marketplace/home-services; woodmac.com and seia.org Q2 2026 solar reports; jchs.harvard.edu remodeling outlook (2026); ibisworld.com roofing contractors (2026); webfx.com Local Pack and LSA study (May 2026); contently.com AI Overview traffic study (Apr 2026).

Compliance: IMC v. FCC, 11th Cir. No. 24-10277 (2025-01-24); McLaughlin Chiropractic v. McKesson (SCOTUS, 2025-06-20); FCC DA 26-12 revoke-all extension (2026-01-06); FTC press releases on HomeAdvisor (2023), Response Tree (2024), MediaAlpha (2025-08-07); FTC TSR direct-consent guidance (Mar 2025); Texas SB 140 (eff. 2025-09-01); cppa.ca.gov Delete Act announcements (2026); activeprospect.com TrustedForm certificate guide; g2.com TrustedForm pricing (2026).
