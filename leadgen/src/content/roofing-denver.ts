import type { ContentPage } from "@/content/types";

// Roofing content for the Denver, Colorado metro. Figures were checked in
// September 2026 against the sources listed on each page. Where a number is a
// range, the drivers are stated in the copy. Keep "updated" current when you
// re-verify.

const UPDATED = "2026-09-15";

export const pages: ContentPage[] = [
  // ---------------------------------------------------------------------------
  // 1. Roof replacement cost
  // ---------------------------------------------------------------------------
  {
    slug: "roof-replacement-cost",
    title: "Roof Replacement Cost in Denver (2026)",
    h1: "Roof Replacement Cost in Denver (2026)",
    description:
      "What a new roof costs in the Denver metro in 2026: price per square and per home for asphalt, Class 4 and metal, plus what moves the number.",
    intent: "cost",
    updated: UPDATED,
    blocks: [
      {
        type: "p",
        text: "Most Denver-area homeowners replacing an asphalt shingle roof in 2026 are paying somewhere between $12,000 and $22,000, with the metro midpoint for a 2,000 to 2,400 square foot home landing around $15,000 to $17,000. Metal roofs run roughly two to three times that. This page breaks the number down so you can tell whether a quote is fair before you sign anything.",
      },
      { type: "h2", text: "Price per square in Denver" },
      {
        type: "p",
        text: "Roofers price by the square, which is 100 square feet of roof surface. Current installed prices on the Front Range, including tear-off, disposal, underlayment, new flashing and a permit, fall in these ranges:",
      },
      {
        type: "table",
        headers: ["Material", "Per sq ft installed", "Per square (100 sq ft)", "Notes"],
        rows: [
          ["Architectural asphalt", "$4.50 to $8.00", "$450 to $800", "The default in most Denver neighborhoods"],
          ["Class 4 impact-resistant asphalt", "$5.50 to $9.50", "$550 to $950", "Adds about $1.00 to $1.50 per sq ft over standard"],
          ["Standing seam metal", "$11 to $20", "$1,100 to $2,000", "Most Colorado quotes land at $15 to $18 per sq ft"],
          ["Three-tab asphalt", "$4.00 to $5.00", "$400 to $500", "Cheapest, but rarely worth it in hail country"],
        ],
      },
      {
        type: "p",
        text: "The low end of each range assumes a simple gable roof with a walkable pitch, one layer of old shingles, sound decking and easy driveway access. The high end assumes a steep or cut-up roof with multiple valleys, dormers or skylights, and a busy post-storm market.",
      },
      { type: "h2", text: "Typical totals by home size" },
      {
        type: "p",
        text: "The table below applies the per-square ranges to common Denver home sizes. It assumes a one-story or story-and-a-half home, where the roof area runs about 15 to 30 percent larger than the living area because of pitch and overhangs. A two-story home with the same square footage has a smaller roof and usually lands at or below the low end.",
      },
      {
        type: "table",
        headers: ["Home size", "Approx. squares", "Architectural asphalt", "Class 4 asphalt", "Standing seam metal"],
        rows: [
          ["1,500 sq ft", "18 to 20", "$8,000 to $15,000", "$10,000 to $18,000", "$20,000 to $38,000"],
          ["2,000 sq ft", "22 to 26", "$10,000 to $19,000", "$12,000 to $22,000", "$25,000 to $48,000"],
          ["2,500 sq ft", "28 to 32", "$13,000 to $24,000", "$15,000 to $27,000", "$32,000 to $58,000"],
          ["3,000 sq ft", "33 to 38", "$15,000 to $28,000", "$18,000 to $32,000", "$38,000 to $68,000"],
        ],
      },
      {
        type: "p",
        text: "These are computed ranges, not quotes. The only way to know your number is to have two or three licensed roofers measure the roof. Ask each one for the square count on their estimate so you can compare bids on the same basis.",
      },
      { type: "h2", text: "What drives the price on the Front Range" },
      {
        type: "ul",
        items: [
          "Pitch and complexity. Anything steeper than about 7:12 needs harnesses and staging, which slows the crew and adds labor. Valleys, hips, dormers, chimneys and skylights each add flashing work.",
          "Tear-off layers. Denver requires a full tear-off to the deck whenever two or more layers already exist. A second layer adds roughly $1 to $2 per square foot in labor and dump fees.",
          "Decking repairs. Rotted or delaminated sheathing is replaced by the sheet, typically $70 to $150 per 4x8 sheet installed. Most contracts price this as an allowance because nobody knows the deck condition until the old roof is off.",
          "Underlayment and ice barrier. Denver's building department does not require self-adhering ice and water shield at the eaves, but most reputable roofers still install it in valleys and around penetrations, and shingle manufacturers may require it for their enhanced warranties. Expect it as a line item.",
          "Wind rating. Denver assigns minimum shingle wind ratings by location: 115 mph east of Federal Boulevard, 125 mph between Federal and Sheridan, and 140 mph between Sheridan and Kipling. Higher-rated shingles cost a little more.",
          "Permit and inspection. Denver's re-roof permit is valuation-based and usually runs a few hundred dollars for a single-family home. The contractor must pull it. A failed inspection triggers a $100 re-inspection fee.",
          "Class 4 shingles. Impact-resistant shingles add $1,000 to $3,000 on a typical Denver roof, and most Colorado insurers discount the premium in return. See the Class 4 page for the math.",
          "Timing. Bids climb after a large hailstorm when every crew in the metro is booked. If your roof is not leaking, quoting in late fall or winter often gets a better price.",
        ],
      },
      { type: "h2", text: "What a complete quote should include" },
      {
        type: "p",
        text: "A Denver roofing quote that leaves out any of these items will grow before the job is done: tear-off and disposal, new synthetic underlayment, ice and water shield in valleys and around penetrations, new drip edge at eaves and rakes (required by Denver code), new pipe boots and flashing, ridge vent or other ventilation, the permit fee, decking allowance per sheet, and the manufacturer warranty tier being registered.",
      },
      {
        type: "callout",
        title: "Insurance changes the math",
        text: "If hail is the reason you need a roof, your cost is your deductible plus any upgrades, not the full bid. Many Colorado policies now carry a 1 or 2 percent wind and hail deductible, which is $5,000 to $10,000 on a $500,000 dwelling limit. Get the deductible amount from your policy declarations page before you talk to roofers.",
      },
      { type: "cta", text: "Ready to see real numbers for your roof? Get up to three quotes from licensed Denver roofers." },
    ],
    faqs: [
      {
        q: "How much is a new roof for a 2,000 square foot house in Denver?",
        a: "In 2026, an architectural asphalt roof on a 2,000 square foot Denver home usually runs $10,000 to $19,000 installed. Class 4 impact-resistant shingles add $1,000 to $3,000. Standing seam metal typically costs $25,000 to $48,000 for the same house.",
      },
      {
        q: "What is a roofing square?",
        a: "One square is 100 square feet of roof surface. Denver roofers quote installed prices of roughly $450 to $800 per square for architectural asphalt and $1,100 to $2,000 per square for standing seam metal.",
      },
      {
        q: "Do I need a permit to replace my roof in Denver?",
        a: "Yes. Denver requires a permit for any full re-roof and for repairs covering more than 10 percent of the roof or two squares, whichever is smaller. The licensed contractor pulls the permit, and a final inspection is required.",
      },
      {
        q: "Why are Denver roof prices higher than the national average?",
        a: "Labor costs, Denver-specific code requirements such as full tear-off of multi-layer roofs and location-based wind ratings, high demand after hail season, and the popularity of Class 4 shingles all push Front Range prices above national figures.",
      },
      {
        q: "Can I put new shingles over my old ones to save money?",
        a: "Denver code allows a recover over a single existing layer, but not over two or more. Most roofers advise against it in Colorado because it hides deck damage, voids many manufacturer warranties, and disqualifies the roof from most insurer Class 4 discounts.",
      },
    ],
    sources: [
      "https://coreroofing.com/resources/roof-replacement-cost-denver",
      "https://www.angi.com/articles/how-much-does-roof-replacement-cost/co/denver",
      "https://303roofer.com/roof-replacement-cost-denver/",
      "https://www.denverroofingguide.com/guides/denver-roof-replacement-cost",
      "https://www.angi.com/articles/how-much-does-metal-roofing-cost/co/denver",
      "https://www.westernstatesmetalroofing.com/metal-roof-cost",
      "https://denver.prelive.opencities.com/files/assets/public/v/4/community-planning-and-development/documents/ds/inspections/roofing_guidelines_and_checklist.pdf",
      "https://www.excelroofing.com/blog/2026-roofing-insurance-deductible-changes-in-colorado-wyoming",
      "https://www.statefarm.com/insurance/home-and-property/homeowners/discounts/roofing-materials",
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. Roof repair cost
  // ---------------------------------------------------------------------------
  {
    slug: "roof-repair-cost",
    title: "Roof Repair Cost in Denver (2026)",
    h1: "Roof Repair Cost in Denver by Problem",
    description:
      "Denver roof repair prices for leaks, flashing, missing shingles, hail spot repairs and vent boots, and how to decide between repair and replacement.",
    intent: "cost",
    updated: UPDATED,
    blocks: [
      {
        type: "p",
        text: "Most Denver roof repairs cost between $400 and $2,500. A pipe boot or a handful of wind-lifted shingles sits at the low end; a chimney flashing rebuild or a leak that has soaked the decking sits at the high end. Anything above about $3,000 on an asphalt roof deserves a second look at whether replacement makes more sense.",
      },
      { type: "h2", text: "Repair cost by problem" },
      {
        type: "table",
        headers: ["Problem", "Typical Denver cost", "What drives it"],
        rows: [
          ["Pipe boot or vent boot replacement", "$200 to $400 each", "Count of boots, roof pitch, whether shingles around it must be replaced"],
          ["Missing or wind-damaged shingles", "$150 to $450 for a small patch", "Whether matching shingles are available, number of courses disturbed"],
          ["Flashing reseal or repair", "$200 to $600", "Chimney, skylight or sidewall location, whether counterflashing is cut into masonry"],
          ["Full flashing replacement", "$500 to $1,500 or more", "Chimney size, stucco or brick tie-in, cricket needed behind chimney"],
          ["Leak repair, contained", "$400 to $1,800", "Time to locate the source, decking patch, interior access"],
          ["Leak repair with decking and drywall", "$2,000 to $5,000", "Square feet of sheathing replaced, insulation, interior finish work"],
          ["Hail spot repair", "$300 to $1,500 per slope", "Industry estimates; matching aged shingles is the hard part"],
          ["Valley reline", "$500 to $1,500", "Length, open metal versus closed valley, shingles removed on both sides"],
        ],
      },
      {
        type: "p",
        text: "Most Denver roofers charge a minimum service call of $150 to $350 that covers the trip, a ladder inspection and minor sealing. If the fix is bigger, the minimum usually gets folded into the repair price.",
      },
      { type: "h2", text: "What is different about repairs in Denver" },
      {
        type: "ul",
        items: [
          "Permits kick in fast. Denver requires a roofing permit when a repair covers more than 10 percent of the roof area or two squares, whichever is smaller. A licensed contractor pulls it. Anything under that threshold is permit-free, but the work still has to meet code.",
          "Matching is hard. High-altitude UV fades asphalt shingles quickly, so a five-year-old roof will show a patch. Discontinued colors are common. Ask the roofer whether they can source the exact product or whether the repair will be visible from the street.",
          "Hail damage is rarely a spot fix. If an adjuster finds enough hits per test square, insurers typically pay to replace the whole slope or roof rather than patch. Spot repairs make sense for a few isolated hits on a newer roof, not for a storm that dented the whole south face.",
          "Ice dams are a real leak source. Denver does not require an ice barrier at the eaves, so many older roofs have none. A recurring winter leak near the gutter line is often an ice dam, and the durable fix is adding ice and water shield at the next replacement, not another tube of sealant.",
        ],
      },
      { type: "h2", text: "Repair or replace?" },
      {
        type: "p",
        text: "Use three questions. First, how old is the roof? Architectural asphalt lasts roughly 15 to 25 years on the Front Range because of UV and hail, so a roof past 15 is close to its end regardless of today's problem. Second, how much of the roof is affected? If the repair touches more than about a quarter of a slope, a replacement bid will not be much more per square. Third, is there an insurance angle? If the damage is from a covered storm and you are within your policy's reporting window, a claim may cover replacement with only your deductible out of pocket.",
      },
      {
        type: "table",
        headers: ["Situation", "Usually the better call"],
        rows: [
          ["Roof under 10 years, single failed boot or flashing", "Repair"],
          ["Roof 10 to 15 years, two or more separate leaks", "Get both bids; lean replace if repair exceeds $3,000"],
          ["Roof over 15 years, any structural leak", "Replace"],
          ["Storm damage across multiple slopes", "Insurance inspection, then replace"],
          ["Two layers already on the roof", "Replace; Denver requires tear-off to deck"],
          ["Selling within a year", "Repair, unless the inspector will flag the roof"],
        ],
      },
      {
        type: "callout",
        title: "Do not wait on a known leak",
        text: "A $500 flashing fix in September can become a $4,000 decking and drywall job after one wet spring. Water that reaches the sheathing also gives an insurer grounds to deny part of a later claim as long-term neglect rather than storm damage.",
      },
      { type: "h2", text: "How to get a fair repair price" },
      {
        type: "ul",
        items: [
          "Ask for photos of the problem area before and after. Most Denver roofers shoot them anyway, and it is your proof for insurance or resale.",
          "Get a written scope, even for a $400 job. It should name the material, the number of shingles or the length of flashing, and whether sealant alone is being used.",
          "Ask what warranty covers the repair. One to two years on workmanship is standard for repairs; a roofer who offers none is telling you something.",
          "Skip anyone who wants full payment before starting. Repairs are normally paid on completion.",
        ],
      },
      { type: "cta", text: "Not sure whether to repair or replace? Get quotes for both from licensed Denver roofers and compare." },
    ],
    faqs: [
      {
        q: "How much does it cost to fix a roof leak in Denver?",
        a: "A contained leak from failed flashing or a small damaged area usually costs $400 to $1,800. If water has reached the decking, insulation or drywall, expect $2,000 to $5,000 including interior repairs.",
      },
      {
        q: "Does homeowners insurance cover roof repairs?",
        a: "Insurance covers sudden storm damage such as hail or wind, minus your deductible. It does not cover wear, age or maintenance failures like a cracked pipe boot. Small repairs often cost less than a percentage deductible, so check your deductible before filing.",
      },
      {
        q: "Do I need a permit for a roof repair in Denver?",
        a: "Only when the repair exceeds 10 percent of the roof area or two squares, whichever is smaller. Any new roof penetration, such as a skylight or vent, always requires a permit.",
      },
      {
        q: "Can hail damage be spot repaired?",
        a: "Sometimes, for a few isolated hits on a newer roof. But hail usually damages an entire slope, aged shingles are hard to match, and insurers generally pay to replace the slope or roof once the hit count crosses their threshold.",
      },
      {
        q: "When does a repair stop making sense?",
        a: "A common rule on the Front Range is that once a single repair on an asphalt roof over 15 years old exceeds about $3,000, or you are on your second leak in two years, replacement usually costs less over the next five years.",
      },
    ],
    sources: [
      "https://www.highimpactco.com/blog/roof-repair-cost",
      "https://baileyroofingandexteriors.com/roofing/repair/",
      "https://homeguide.com/costs/roof-repair-cost",
      "https://www.fixr.com/costs/repair-roof-leaks",
      "https://denver.prelive.opencities.com/files/assets/public/v/4/community-planning-and-development/documents/ds/inspections/roofing_guidelines_and_checklist.pdf",
      "https://www.coloradoroofing.org/news/how-long-should-your-roof-last-in-colorados-climate",
      "https://coreroofing.com/resources/how-long-does-a-roof-last-in-colorado",
    ],
  },

  // ---------------------------------------------------------------------------
  // 3. Hail damage insurance claims
  // ---------------------------------------------------------------------------
  {
    slug: "hail-damage-insurance-claims",
    title: "Hail Damage Roof Claims in Colorado (2026)",
    h1: "How Hail Damage Roof Insurance Claims Work in Colorado",
    description:
      "How a Colorado hail roof claim works: inspection, filing, the adjuster, ACV vs RCV, deductibles, SB 38 contractor rules, deadlines and when not to file.",
    intent: "insurance",
    updated: UPDATED,
    blocks: [
      {
        type: "p",
        text: "The Front Range sits in the part of the country insurers call Hail Alley. Colorado ranks second only to Texas for hail claims, and a 2026 Colorado Division of Insurance study found hail accounts for 26 to 54 percent of a homeowner's premium depending on county. If you own a roof here, you will probably file a hail claim at some point. Here is how the process actually runs.",
      },
      { type: "h2", text: "Step 1: Document before anyone touches the roof" },
      {
        type: "p",
        text: "Right after a storm, photograph hailstones next to a coin or tape measure, dented gutters and downspouts, damaged screens, splatter marks on the AC condenser, and any interior stains. Note the date and time. Then have a licensed local roofer inspect and photograph the roof itself. Hail bruises on asphalt are small, dark, soft spots where granules have been knocked off; they are hard to see from the ground.",
      },
      { type: "h2", text: "Step 2: Decide whether to file" },
      {
        type: "p",
        text: "A claim is only worth filing if the covered damage is clearly worth more than your deductible. Many Colorado policies now carry a separate wind and hail deductible of 1 or 2 percent of the dwelling coverage, which is $5,000 to $10,000 on a $500,000 limit, and a few carriers use 5 percent on older roofs. Pull your declarations page and read the deductible line before you call. Also check whether your roof is on a replacement cost (RCV) or actual cash value (ACV) settlement basis; many insurers switch roofs older than 10 to 20 years to ACV through a roof payment schedule endorsement.",
      },
      {
        type: "callout",
        title: "When not to file",
        text: "Skip the claim if a roofer finds only a few hits on one slope, if the repair estimate is close to your deductible, or if the damage is wear rather than storm impact. Claims stay on your CLUE report for years and can affect renewal pricing even when the insurer pays nothing.",
      },
      { type: "h2", text: "Step 3: File and meet the adjuster" },
      {
        type: "p",
        text: "Report the loss through your carrier's app or claims line with the storm date. Colorado regulation requires the insurer to acknowledge the claim within 15 days and to make a decision or pay within 60 days of receiving a complete claim unless there is a reasonable dispute. The adjuster will chalk test squares on each slope and count hits. You are allowed to have your roofer present, and it is a good idea: your roofer can point out damage, but under Colorado law cannot negotiate the claim on your behalf or act as a public adjuster.",
      },
      { type: "h2", text: "Step 4: Understand the settlement" },
      {
        type: "ul",
        items: [
          "RCV policies pay in two parts. The first check is the actual cash value, meaning replacement cost minus depreciation, minus your deductible. The second check, the recoverable depreciation, is released after the work is done and you submit the invoice.",
          "ACV policies pay only the depreciated value, minus the deductible. On a 15-year-old roof that can be less than half the replacement cost, and the rest is on you.",
          "Deadlines matter. Most policies give 180 days to one year from the first payment to complete repairs and claim depreciation. Ask for an extension in writing before the date passes; carriers usually grant it if you ask early.",
          "Supplements are normal. If the roofer finds code items the adjuster missed, such as drip edge or decking, they submit a supplement with photos. Denver code requires drip edge and full tear-off of multi-layer roofs, and most policies cover code upgrades under ordinance or law coverage.",
        ],
      },
      { type: "h2", text: "Colorado law on roofers and your deductible" },
      {
        type: "p",
        text: "Colorado Senate Bill 38, in effect since 2012 as CRS 6-22-101 through 6-22-105, sets the rules for residential roofing paid by insurance. A roofer may not pay, waive, rebate or promise to absorb any part of your deductible, and may not advertise that they will. Any offer of a free upgrade or a rebate that happens to equal your deductible is the same thing with a different name. The contract must be in writing with the scope, cost, dates, contact information and proof of insurance, and it must disclose the deductible rule. Your deposit has to be held in trust until materials are delivered or most of the work is done. If the insurer denies the claim in whole or in part, you may cancel within 72 hours of learning that and get your deposit back within 10 days, less any work already performed.",
      },
      {
        type: "p",
        text: "The reason this matters to you and not just the roofer: a waived deductible is usually recovered by inflating the invoice to the insurer, which is insurance fraud. Insurers can also disregard estimates from a contractor who violates the statute, which stalls your claim.",
      },
      { type: "h2", text: "Timeline from storm to new roof" },
      {
        type: "table",
        headers: ["Stage", "Typical time in the Denver metro"],
        rows: [
          ["Roofer inspection after storm", "1 to 7 days; longer after a metro-wide event"],
          ["Insurer acknowledgment", "Within 15 days by regulation"],
          ["Adjuster inspection", "1 to 3 weeks, up to 6 weeks after major storms"],
          ["Claim decision and ACV payment", "Within 60 days of a complete claim"],
          ["Contract, permit, materials", "1 to 3 weeks"],
          ["Installation", "1 to 2 days for asphalt"],
          ["Depreciation released after invoice", "1 to 3 weeks"],
        ],
      },
      { type: "cta", text: "Have hail damage? Get inspections and quotes from licensed Denver roofers who know the Colorado claim process." },
    ],
    faqs: [
      {
        q: "How long do I have to file a hail claim in Colorado?",
        a: "Policies require notice as soon as practicable, and most Colorado carriers treat one year from the storm as the practical limit, with some allowing two. Some insurers extended windows after the largest storms. Check your policy and file well inside the window.",
      },
      {
        q: "Can a roofer waive my deductible in Colorado?",
        a: "No. Under CRS 6-22-105, a roofing contractor may not pay, waive, rebate or advertise to absorb any part of an insurance deductible. Offers of a free upgrade in place of the deductible are the same violation.",
      },
      {
        q: "What is the difference between ACV and RCV on a roof?",
        a: "RCV pays what it costs to replace the roof, minus your deductible, with depreciation released after the work is complete. ACV pays the depreciated value only. Many Colorado policies move roofs to ACV once they pass 10 to 20 years old, so check your endorsements.",
      },
      {
        q: "Will my rates go up if I file a hail claim?",
        a: "In Colorado, a single weather claim usually does not trigger a surcharge the way an at-fault auto claim does, but claims history is a rating factor and multiple claims can affect renewal. Hail losses across the region are the main reason Colorado premiums roughly doubled between 2020 and 2025.",
      },
      {
        q: "Can I keep the insurance money and not replace the roof?",
        a: "On an ACV policy, generally yes, but the roof damage becomes a pre-existing condition and future claims may be denied. On an RCV policy, you forfeit the recoverable depreciation if the work is not done. If you have a mortgage, the lender is usually a payee on the check and may require proof of repair.",
      },
      {
        q: "Should I use a public adjuster?",
        a: "For a routine hail roof claim, usually not; the fee of 10 to 20 percent of the settlement eats most of what they recover. Consider one for large, disputed or underpaid losses. Roofers cannot legally act as adjusters in Colorado.",
      },
    ],
    sources: [
      "https://www.cbsnews.com/colorado/news/hail-driving-colorado-high-insurance-rates/",
      "https://kdvr.com/weather/when-is-hail-season-in-colorado/",
      "https://www.coloradoroofing.org/news/filing-a-roofing-insurance-claim-in-colorado",
      "https://www.coloradoroofing.org/news/waiving-insurance-deductibles-is-illegal-in-colorado",
      "https://colorado.public.law/statutes/crs_6-22-104",
      "https://colorado.public.law/statutes/crs_6-22-105",
      "https://www.propertyinsurancecoveragelaw.com/blog/failure-to-make-timely-decisions-payments-in-colorado-will-lead-to-penalties-for-insurers-pursuant-to-title-3-colo-code-regs-%C2%A7-702-5-1-14/",
      "https://uphelp.org/claim-guidance-publications/frequently-asked-questions-about-property-damage-insurance-claims-in-colorado/",
      "https://www.excelroofing.com/blog/2026-roofing-insurance-deductible-changes-in-colorado-wyoming",
      "https://www.hilltopcontractinggc.com/blog/hail-claim-time-limit-colorado",
      "https://integrityroofingandpainting.com/how-long-do-i-have-to-complete-my-repairs-and-still-recover-my-depreciation/",
      "https://denver.prelive.opencities.com/files/assets/public/v/4/community-planning-and-development/documents/ds/inspections/roofing_guidelines_and_checklist.pdf",
    ],
  },

  // ---------------------------------------------------------------------------
  // 4. Class 4 impact-resistant shingles
  // ---------------------------------------------------------------------------
  {
    slug: "class-4-impact-resistant-shingles",
    title: "Class 4 Shingles in Denver: Cost and Discounts",
    h1: "Class 4 Impact-Resistant Shingles in Denver: Are They Worth It?",
    description:
      "What Class 4 means, what Colorado insurers discount for it, the cost premium on a Denver roof, and the 2026 state law that funds resilient roofs.",
    intent: "comparison",
    updated: UPDATED,
    blocks: [
      {
        type: "p",
        text: "If you are replacing a roof anywhere along the I-25 corridor, Class 4 shingles are the one upgrade that reliably pays for itself. They cost $1,000 to $3,000 more on a typical Denver roof, most Colorado insurers discount the premium for them, and a new state law is about to make those discounts enforceable. Here is what you are actually buying.",
      },
      { type: "h2", text: "What Class 4 means" },
      {
        type: "p",
        text: "Class 4 is the top rating under UL 2218, a lab test that drops a 2-inch steel ball from 20 feet onto the shingle. To pass, the shingle must take two hits in the same spot without cracking through when bent. A newer test, FM 4473, fires ice balls at about 76 mph to mimic real hail more closely, and some manufacturers now advertise both. Class 4 asphalt shingles get there with a polymer-modified (SBS) asphalt that stays flexible, or with a reinforcing mesh in the mat. Many standing seam metal roofs and some stone-coated steel and synthetic slate products also carry a Class 4 rating.",
      },
      {
        type: "p",
        text: "Class 4 is not a hail-proof guarantee. Golf-ball hail at 60 mph will still leave marks, and 2-inch stones can damage anything. What the rating buys you is a roof that usually stays watertight through the 1-inch storms that total ordinary shingles, which in Denver is most of them.",
      },
      { type: "h2", text: "Insurance discounts in Colorado" },
      {
        type: "p",
        text: "Colorado statute CRS 10-4-110.8 requires homeowner insurers to account for impact-resistant roofing in their rates, which is why nearly every carrier writing in the state offers some discount. Roofers and agents commonly cite 15 to 30 percent off the dwelling or wind-and-hail portion of the premium, with some carriers tiering by hail zone. State Farm, USAA, Farmers and Allstate all have programs. The Division of Insurance's own 2026 estimate is more conservative: $82 to $387 per year per household from hail-fortified roofs. On a Denver premium that averaged $6,630 in early 2026, either figure is real money.",
      },
      {
        type: "ul",
        items: [
          "Get the form first. State Farm and others require a roofing certification form completed by the installer with the product name and rating. Ask your agent for it before the shingles go on.",
          "Overlays do not qualify. Most carriers exclude roofs installed over an existing layer.",
          "Read the endorsement. Some carriers pair the discount with a cosmetic damage exclusion, so dents that do not cause leaks are not covered. That is a fair trade for many owners but you should know you made it.",
          "Ask about ACV. A Class 4 discount does not change whether your roof is settled on actual cash value; that is a separate endorsement.",
        ],
      },
      { type: "h2", text: "The 2026 law: Strengthen Colorado Homes" },
      {
        type: "p",
        text: "Governor Polis signed SB26-155 on June 4, 2026, effective August 12. It creates the Strengthen Colorado Homes Enterprise inside the Division of Insurance, funded by a 0.5 percent fee on homeowner premiums that insurers may not pass to policyholders. At least 85 percent of the money goes to grants for retrofitting primary residences with resilient roofs, prioritized by income, roof age and storm exposure. Starting in 2027, insurers must report the discounts they actually apply for resilient roofs, which turns today's voluntary discounts into something the regulator can audit. As of September 2026 the board is being appointed and no grants have been paid yet, so do not delay a needed roof waiting for one. Watch the Division of Insurance site for the application window.",
      },
      { type: "h2", text: "The payback math for a Denver home" },
      {
        type: "table",
        headers: ["Item", "Standard architectural", "Class 4 architectural"],
        rows: [
          ["Installed cost, 2,000 sq ft home", "$10,000 to $19,000", "$12,000 to $22,000"],
          ["Premium discount", "None", "Roughly $100 to $700 per year depending on carrier"],
          ["Breakeven on the upgrade", "n/a", "About 3 to 10 years"],
          ["Expected claims over 20 years in Denver", "2 to 3 replacements", "Fewer; cosmetic marks likely, leaks less likely"],
          ["Deductibles avoided", "n/a", "Each avoided claim saves a 1 to 2 percent deductible, often $5,000 or more"],
        ],
      },
      {
        type: "p",
        text: "The deductible line is the one people miss. With percentage deductibles now standard in Colorado, one avoided claim is worth more than the entire upgrade cost. The premium discount is the bonus.",
      },
      {
        type: "callout",
        title: "When Class 4 is not the answer",
        text: "If you plan to sell within two years and the current roof is sound, the upgrade rarely shows up in the sale price. And if your carrier has moved you to an ACV roof schedule, ask whether a new Class 4 roof resets you to replacement cost; that question matters more than the discount.",
      },
      { type: "cta", text: "Compare Class 4 and standard shingle quotes from licensed Denver roofers and see the difference on your roof." },
    ],
    faqs: [
      {
        q: "How much more do Class 4 shingles cost in Denver?",
        a: "About $1.00 to $1.50 more per square foot installed, which works out to $1,000 to $3,000 on a typical metro Denver roof depending on size and product.",
      },
      {
        q: "How much is the Colorado insurance discount for a Class 4 roof?",
        a: "It varies by carrier. Contractors and agents commonly cite 15 to 30 percent off the dwelling or wind-and-hail portion of the premium; the Colorado Division of Insurance estimates $82 to $387 per household per year. Ask your agent for the exact figure before you buy.",
      },
      {
        q: "Are Class 4 shingles required in Denver?",
        a: "No. Denver's building code sets wind ratings by location but does not require an impact rating. Class 4 is a choice driven by insurance savings and avoided claims.",
      },
      {
        q: "Do Class 4 shingles still get hail damage?",
        a: "Yes, especially cosmetic marks from large hail. The rating means the shingle is far less likely to crack or lose its waterproofing in typical 1 to 1.5 inch Front Range hail, which is what turns a storm into a claim.",
      },
      {
        q: "Is there a Colorado grant for a Class 4 roof?",
        a: "SB26-155, signed in June 2026, funds a grant program for resilient roofs through the Strengthen Colorado Homes Enterprise. Funding starts with insurer fees collected in 2027, and no grants had been issued as of September 2026.",
      },
    ],
    sources: [
      "https://abrahambensonroofing.com/class-4-shingles-colorado-insurance-discount/",
      "https://www.statefarm.com/insurance/home-and-property/homeowners/discounts/roofing-materials",
      "https://www.cbsnews.com/colorado/news/hail-driving-colorado-high-insurance-rates/",
      "https://leg.colorado.gov/bills/SB26-155",
      "https://doi.colorado.gov/news-releases-consumer-advisories/governor-polis-and-division-of-insurance-announce-call-for",
      "https://www.theinsurer.com/ti/news/colorado-insurance-regulator-praises-hail-mitigation-grant-law-to-ease-2026-06-05/",
      "https://coreroofing.com/resources/roof-replacement-cost-denver",
      "https://www.garagejournal.com/forum/threads/what-homeowners-insurance-companies-give-discounts-for-class-3-or-4-shingles.501295/",
      "https://denver.prelive.opencities.com/files/assets/public/v/4/community-planning-and-development/documents/ds/inspections/roofing_guidelines_and_checklist.pdf",
    ],
  },

  // ---------------------------------------------------------------------------
  // 5. Asphalt vs metal
  // ---------------------------------------------------------------------------
  {
    slug: "asphalt-vs-metal-roof",
    title: "Asphalt vs Metal Roof in Denver: Which Wins?",
    h1: "Asphalt vs Metal Roofing in Denver: Cost, Hail, Snow and Resale",
    description:
      "Asphalt shingles vs standing seam metal for Colorado: price, lifespan, hail performance, snow, HOA rules and what you get back at resale.",
    intent: "comparison",
    updated: UPDATED,
    blocks: [
      {
        type: "p",
        text: "In the Denver metro, a metal roof costs roughly two to three times what a Class 4 asphalt roof costs and lasts two to three times as long. Whether that trade makes sense depends almost entirely on how long you plan to own the house and how you feel about dents. Here is the comparison for Colorado conditions specifically, not the national averages.",
      },
      { type: "h2", text: "Side by side for Front Range homes" },
      {
        type: "table",
        headers: ["Factor", "Architectural or Class 4 asphalt", "Standing seam metal"],
        rows: [
          ["Installed cost, 2,000 sq ft home", "$10,000 to $22,000", "$25,000 to $48,000"],
          ["Realistic lifespan in Colorado", "15 to 25 years; up to 30 for premium Class 4", "40 to 50 years; 70 for premium panels"],
          ["Hail, 1 inch", "Standard: often totaled. Class 4: usually fine", "Cosmetic dents possible, rarely leaks"],
          ["Hail, 2 inch or larger", "Damaged", "Dented; panels may need replacement for appearance"],
          ["Snow", "Holds snow; ice dams possible at eaves", "Sheds snow fast; snow guards needed over doors and walks"],
          ["High-altitude UV", "Main cause of early aging", "Kynar or PVDF finishes hold color 30 years or more"],
          ["Wind", "Rated 115 to 140 mph by Denver zone", "Typically rated 140 mph or higher"],
          ["Installation", "1 to 2 days", "3 to 7 days; Denver requires a mid-roof inspection"],
          ["Insurance", "Class 4 discount", "Class 4 discount on most panels; cosmetic exclusion common"],
          ["Resale, national 2025 data", "About 68 percent of cost recouped", "About 50 percent of cost recouped"],
        ],
      },
      { type: "h2", text: "Cost" },
      {
        type: "p",
        text: "Denver asphalt installs run $4.50 to $8 per square foot, or $5.50 to $9.50 for Class 4. Standing seam metal runs $11 to $20 per square foot installed, and most Colorado quotes cluster at $15 to $18. Exposed-fastener metal panels are cheaper, around $8 to $12, but the screws back out with freeze-thaw cycling and are the usual leak point after 15 years. Add roughly $1,500 for snow guards on a metal roof and more if the roof has many valleys, since metal valleys and trim are custom-bent.",
      },
      { type: "h2", text: "Hail" },
      {
        type: "p",
        text: "Metal does not crack, lose granules or leak the way asphalt does, and most standing seam panels carry a Class 4 rating. What metal does is dent. After a large storm you may have a roof that is perfectly watertight and visibly pocked. Many Colorado insurers handle this with a cosmetic damage exclusion on metal roofs, which means they will pay for a leak but not for looks. If the appearance matters to you, a heavier gauge (24 rather than 26 or 29) and a striated or textured panel profile hide dents better. Class 4 asphalt is the middle path: the shingle usually survives 1-inch hail without a claim, and if it is destroyed, replacement is cheap enough that insurance handles it cleanly.",
      },
      { type: "h2", text: "Snow and ice" },
      {
        type: "p",
        text: "Denver's ground snow load is 35 pounds per square foot, moderate by Colorado standards. Asphalt holds snow, which is fine structurally but sets up ice dams on north eaves of poorly insulated homes. Metal sheds snow in sheets, often all at once on a sunny afternoon. That is great for the roof and dangerous for whoever is under it, so budget for snow guards above entries, decks, gas meters and parked cars.",
      },
      { type: "h2", text: "HOA and code issues" },
      {
        type: "p",
        text: "Many Denver-area HOAs, especially in Highlands Ranch, Parker, Castle Rock and newer Aurora subdivisions, restrict roof color, profile or material through architectural review. Colorado law now prevents HOAs from banning fire-hardened materials (HB24-1091) and protects solar, but there is no statute that forces an HOA to accept metal. Get written architectural approval before you sign a metal contract. On the code side, Denver requires metal shingles to be on slopes of 3:12 or steeper, requires a mid-roof inspection for tile and metal, and requires valley flashing of the same material as the roof.",
      },
      { type: "h2", text: "Resale" },
      {
        type: "p",
        text: "Zonda's 2025 Cost vs Value report puts asphalt roof replacement at about 68 percent of cost recouped at resale and metal at about 50 percent nationally. Buyers pay for a roof that will not be an issue, not for a roof that will outlive them. A five-year-old Class 4 asphalt roof and a five-year-old metal roof reassure an inspector equally. Metal pays off through ownership, not through sale.",
      },
      { type: "h2", text: "The decision" },
      {
        type: "ul",
        items: [
          "Staying 20 years or more, hate dealing with claims, and the HOA allows it: metal is the lower lifetime cost.",
          "Staying under 15 years, or the budget is tight: Class 4 asphalt with the insurance discount.",
          "Mountain-style or modern architecture, or a steep roof that is expensive to re-roof: metal, because you only want to do it once.",
          "Older brick bungalow in a historic district: asphalt, dimensional shingles in a muted color, and check with Landmark Preservation before changing materials.",
        ],
      },
      { type: "cta", text: "Get asphalt and metal quotes side by side from licensed Denver roofers and compare the real numbers for your home." },
    ],
    faqs: [
      {
        q: "How much more does a metal roof cost than asphalt in Denver?",
        a: "On a 2,000 square foot Denver home, standing seam metal runs about $25,000 to $48,000 installed versus $10,000 to $22,000 for architectural or Class 4 asphalt. Metal is typically two to three times the price.",
      },
      {
        q: "Does hail damage metal roofs?",
        a: "Hail dents metal but rarely causes leaks. Many Colorado insurers apply a cosmetic damage exclusion to metal roofs, so dents that do not affect function may not be covered. Heavier 24-gauge panels resist denting better.",
      },
      {
        q: "How long does an asphalt roof last in Colorado?",
        a: "About 15 to 25 years for architectural shingles, less than the national figure because of high-altitude UV and repeated hail. Premium Class 4 products can reach 30. Standing seam metal typically lasts 40 to 50 years here.",
      },
      {
        q: "Can my HOA stop me from installing a metal roof?",
        a: "Often yes. Colorado law protects fire-hardened materials and solar panels, but not metal roofing specifically. Check your covenants and get written architectural approval before signing a contract.",
      },
      {
        q: "Is a metal roof louder in rain or hail?",
        a: "Over a solid deck with underlayment and attic insulation, which is how it is installed on Denver homes, a metal roof is only slightly louder than asphalt. The barn-roof noise people imagine comes from open-framed metal with no deck.",
      },
    ],
    sources: [
      "https://www.angi.com/articles/how-much-does-metal-roofing-cost/co/denver",
      "https://www.westernstatesmetalroofing.com/metal-roof-cost",
      "https://northernlightsexteriors.com/denver-roofing/metal-roofing-companies/",
      "https://coreroofing.com/resources/roof-replacement-cost-denver",
      "https://www.coloradoroofing.org/news/how-long-should-your-roof-last-in-colorados-climate",
      "https://coreroofing.com/resources/how-long-does-a-roof-last-in-colorado",
      "https://theroofingbrief.com/roof-replacement-roi-resale-value-report/",
      "https://www.opendoor.com/articles/does-a-new-roof-increase-home-value-roi-costs-and-what-sellers-need-to-know",
      "https://dre.colorado.gov/division-notifications/hoa-center-advisory-hoa-information-resource-center-announcement-hb24-1091",
      "https://denver.prelive.opencities.com/files/assets/public/v/4/community-planning-and-development/documents/ds/inspections/roofing_guidelines_and_checklist.pdf",
      "https://www.parkerlipman.com/blog/2026/april/denied-or-underpaid-navigating-the-cosmetic-dama/",
    ],
  },

  // ---------------------------------------------------------------------------
  // 6. Roof financing
  // ---------------------------------------------------------------------------
  {
    slug: "roof-financing",
    title: "Roof Financing in Denver: Options Compared (2026)",
    h1: "How to Pay for a New Roof in Denver",
    description:
      "Roof financing for Denver homeowners: contractor financing, HELOCs, personal loans, insurance proceeds, PACE status in Colorado, and what to watch for.",
    intent: "financing",
    updated: UPDATED,
    blocks: [
      {
        type: "p",
        text: "A $15,000 to $20,000 roof is one of the larger unplanned bills a Denver homeowner faces, and it usually cannot wait for a savings plan. The good news is that the cheapest money for a roof is often the money you already have access to. Here are the realistic options in September 2026, ranked roughly from cheapest to most expensive.",
      },
      { type: "h2", text: "1. Insurance proceeds" },
      {
        type: "p",
        text: "If the roof was damaged by hail or wind, the claim pays most of the cost and you owe only the deductible plus any upgrades. Under a replacement cost policy you receive the actual cash value first and the recoverable depreciation after the work is invoiced, so the roofer is typically paid in two installments. If you have a mortgage, the insurer usually makes the check payable to you and the lender, and the lender's loss draft department will endorse it once it has the contract and sometimes an inspection. Build a week or two into the schedule for that. Colorado law bars roofers from waiving the deductible, so plan to pay it yourself.",
      },
      { type: "h2", text: "2. Home equity line of credit or home equity loan" },
      {
        type: "p",
        text: "For most Denver owners with equity, this is the lowest rate available. In mid-September 2026 the national average HELOC rate was about 7.1 percent and the average fixed home equity loan about 7.4 percent, both for strong credit and combined loan-to-value under 70 percent. Individual lenders range from about 6 to 18 percent, so shop at least two credit unions and your current mortgage servicer. A HELOC takes two to six weeks to close, so start the application when you start getting roof bids, not after you pick one. Interest may be tax deductible when the funds improve the home; ask a tax professional.",
      },
      { type: "h2", text: "3. Contractor financing" },
      {
        type: "p",
        text: "Most larger Denver roofers offer financing through lenders such as GreenSky, Service Finance, Hearth or Synchrony, with approval in minutes and no lien on the house. Published GreenSky plans in 2026 include a fixed 12.99 percent over 120 months and promotional plans from about 16 to 25 percent. The catch is that contractors pay the lender a dealer fee of roughly 3 to 15 percent, highest on 0 percent promotions, and that fee is priced into your quote. Ask for the cash price and the financed price separately. A 0 percent same-as-cash plan can be a good deal only if you can clear the balance inside the promotional window; deferred-interest plans charge all the back interest if you miss it by a day.",
      },
      { type: "h2", text: "4. Personal loan" },
      {
        type: "p",
        text: "Unsecured personal loans from banks, credit unions and online lenders fund in a few days with no home appraisal. Rates in 2026 run from about 8 percent for excellent credit to over 30 percent for weak credit, with terms of two to seven years. They make sense when you lack equity, need the money fast, or want to avoid a lien. Colorado credit unions such as Bellco, Canvas and Ent often beat online lenders for members.",
      },
      { type: "h2", text: "5. Cash-out refinance" },
      {
        type: "p",
        text: "Only worth it if you were going to refinance anyway. Trading a low-rate first mortgage for a higher-rate one to pay for a roof usually costs far more over the loan term than a HELOC.",
      },
      { type: "h2", text: "6. Credit cards" },
      {
        type: "p",
        text: "Fine for the deductible or a small repair if you can pay it off in a few months, and useful because card payments carry chargeback protection. A 0 percent introductory purchase card for 12 to 21 months can beat contractor financing if the limit is high enough. Many roofers add a 3 percent surcharge for cards.",
      },
      { type: "h2", text: "PACE in Colorado" },
      {
        type: "p",
        text: "Colorado runs a Commercial PACE (C-PACE) program for commercial, multifamily and agricultural buildings, but as of September 2026 there is no residential PACE program in the state. The state's New Energy Improvement District has said stakeholders are considering one. If a salesperson offers PACE financing on a single-family Denver home, that is a red flag. Two related programs to watch: the Strengthen Colorado Homes Enterprise created by SB26-155 will begin funding roof retrofit grants after insurer fees are collected in 2027, and Colorado's C-PACE remains available if you own a small commercial or mixed-use building.",
      },
      { type: "h2", text: "What to watch for" },
      {
        type: "ul",
        items: [
          "Deposits. Colorado law requires roofers to hold your deposit in trust until materials are delivered or most work is done. The Colorado Roofing Association suggests paying no more than about 10 percent up front.",
          "Deferred interest. Read whether a 0 percent plan is true 0 percent or deferred interest. The second kind bills all interest from day one if any balance remains at the end.",
          "Financing tied to the sale. A contractor who will only give a price if you finance through them is hiding the dealer fee in the quote.",
          "Assignment of benefits. Do not sign anything that assigns your insurance claim or proceeds to the contractor. It is not standard practice in Colorado and gives up your control of the claim.",
          "Prepayment penalties. Most contractor financing and personal loans have none, but check.",
          "Lien waivers. Before final payment, get a signed lien waiver from the roofer and, on larger jobs, from the material supplier.",
        ],
      },
      {
        type: "callout",
        title: "A simple rule",
        text: "Insurance first, equity second, contractor financing third, and never a plan you cannot explain back to the salesperson.",
      },
      { type: "cta", text: "Get roof quotes with clear cash and financed pricing from licensed Denver roofers." },
    ],
    faqs: [
      {
        q: "What is the cheapest way to finance a roof in Denver?",
        a: "If insurance covers the damage, the claim. Otherwise a HELOC or home equity loan, averaging about 7 to 7.5 percent in September 2026 for strong credit, is usually the lowest-cost borrowed money.",
      },
      {
        q: "Does Colorado have residential PACE financing for roofs?",
        a: "No. Colorado has a commercial PACE program only. As of September 2026 the state is studying a residential program but none is active, so any single-family PACE offer should be treated with suspicion.",
      },
      {
        q: "Is contractor financing a bad deal?",
        a: "Not always, but the lender's dealer fee of 3 to 15 percent is built into the quoted price, and promotional 0 percent plans often use deferred interest. Ask for a separate cash price so you can compare.",
      },
      {
        q: "Can the roofer be paid directly by my insurance company?",
        a: "Insurers pay you, and your mortgage lender if you have one. You pay the roofer. Do not sign an assignment of benefits that hands the claim to the contractor.",
      },
      {
        q: "Can a roofer finance my deductible?",
        a: "A roofer may offer a payment plan through a third-party lender that covers your whole balance including the deductible, which is legal. What they cannot do under Colorado law is waive, rebate or absorb the deductible.",
      },
    ],
    sources: [
      "https://finance.yahoo.com/personal-finance/mortgages/article/heloc-and-home-equity-loan-rates-today-monday-september-14-2026-a-33-basis-point-differential-100000523.html",
      "https://www.lendingtree.com/home/home-equity/heloc/",
      "https://www.credible.com/personal-loan/greensky-personal-loans-review",
      "https://www.greensky.com/home-improvement/",
      "https://toricentlabs.com/blog/roofing-contractor-financing.html",
      "https://www.nerdwallet.com/best/loans/personal-loans/roof-loans-financing",
      "https://energyoffice.colorado.gov/c-pace",
      "https://neid.colorado.gov/",
      "https://leg.colorado.gov/bills/SB26-155",
      "https://www.coloradoroofing.org/news/waiving-insurance-deductibles-is-illegal-in-colorado",
      "https://www.coloradoroofing.org/how-to-spot-common-roofing-scams-colorado",
    ],
  },

  // ---------------------------------------------------------------------------
  // 7. How to choose a roofer
  // ---------------------------------------------------------------------------
  {
    slug: "how-to-choose-a-roofer",
    title: "How to Choose a Roofer in Denver (2026 Checklist)",
    h1: "How to Choose a Roofer in Denver",
    description:
      "Vet a Denver roofer: license lookup, insurance, storm-chaser red flags, contract terms Colorado law requires, permits, warranties and questions to ask.",
    intent: "process",
    updated: UPDATED,
    blocks: [
      {
        type: "p",
        text: "Colorado has no statewide roofing license, which is why the Front Range fills with out-of-state crews every hail season. The vetting falls to you. The checks below take about an hour and screen out most of the contractors who will cost you money.",
      },
      { type: "h2", text: "1. Check the Denver license" },
      {
        type: "p",
        text: "The City and County of Denver requires roofers to hold a contractor license issued by Community Planning and Development. Residential shingle work needs a Class D Roofing-Shingles license; low-slope membrane and commercial work need the Class D Roof Covering and Waterproofing license. The license is tied to a supervisor certificate that required two years of documented experience. Verify it at denvergov.org/contractorlicensing or by calling Contractor Licensing at (720) 865-2770. Ask for the license number on the estimate and confirm the name on the license matches the company name on the contract. Aurora, Lakewood, Boulder and the unincorporated counties each license separately, so if you live outside Denver proper, check with your own building department.",
      },
      { type: "h2", text: "2. Verify insurance directly" },
      {
        type: "p",
        text: "Ask for certificates of general liability and workers' compensation insurance, then call the agent listed on the certificate to confirm the policy is active. Workers' comp matters most: if an uninsured worker falls off your roof, you can be the target of the claim. A sole proprietor with no employees can legally opt out of workers' comp in Colorado, but a roofing crew of six cannot. Denver requires proof of both to issue the license, so a roofer who cannot produce them may not be licensed either.",
      },
      { type: "h2", text: "3. Know the storm-chaser red flags" },
      {
        type: "ul",
        items: [
          "Knocks on your door within 72 hours of a hailstorm and offers a free inspection on the spot.",
          "Out-of-state plates, a P.O. box, a motel address or a company formed in the last year. Look the entity up on the Colorado Secretary of State site.",
          "Offers to waive, absorb or rebate your deductible, or a free upgrade that happens to equal it. Illegal under CRS 6-22-105.",
          "Wants you to sign a contingency agreement before the adjuster comes, or an assignment of your insurance benefits.",
          "Asks you to pull the permit yourself. In Denver, only the licensed contractor can.",
          "Quotes far below the others. In 2026, an architectural asphalt roof under about $4 per square foot in Denver is missing something.",
          "Wants more than 10 percent down, or cash.",
          "Pressures you to sign today because the price is good only today.",
        ],
      },
      { type: "h2", text: "4. Read the contract against Colorado law" },
      {
        type: "p",
        text: "Under CRS 6-22-101 through 6-22-105, a residential roofing contract in Colorado must be in writing and include the scope of work, materials, total cost, approximate start and completion dates, the contractor's contact information and proof of liability coverage. If insurance is paying, it must state that the contractor cannot waive or rebate your deductible, and it must give you the right to cancel within 72 hours of learning the claim was denied in whole or in part, with your deposit refunded within 10 days less work already performed. Deposits must be held in trust until materials arrive or most of the work is done. If any of that language is missing, the contractor either does not know the law or is hoping you do not.",
      },
      { type: "h2", text: "5. Compare bids on the same scope" },
      {
        type: "p",
        text: "Get three written estimates that each list: the square count, the shingle brand and product line, the underlayment type, where ice and water shield goes, the drip edge, new pipe boots and flashing, ventilation, the decking allowance per sheet, the permit, cleanup with a magnetic nail sweep, and the warranty being registered. A bid that says only 'replace roof, 30-year shingles' cannot be compared to anything.",
      },
      { type: "h2", text: "6. Understand the warranties" },
      {
        type: "p",
        text: "There are two. The manufacturer's material warranty covers defective shingles, and the better tiers (which include labor and are non-prorated for 25 to 50 years) require a certified installer and a full system of that brand's components, so ask which tier is being registered. The workmanship warranty comes from the roofer and covers installation errors, which cause most leaks. Five to ten years is typical from established Denver companies; two years or less is thin. A workmanship warranty is only as good as the company's odds of still being in business, so favor firms with a physical Denver office and a decade or more of history.",
      },
      { type: "h2", text: "Questions to ask every roofer" },
      {
        type: "ul",
        items: [
          "What is your Denver contractor license number, and who is the supervisor on it?",
          "Who is on my roof: your employees or a subcontracted crew? Who supervises them?",
          "Will you pull the permit and schedule the final inspection? Is the fee in the bid?",
          "What ice and water shield and underlayment are you using, and where?",
          "How do you handle rotten decking, and what is the per-sheet price?",
          "What happens if it rains mid-job?",
          "Which manufacturer warranty tier will you register, and are you certified for it?",
          "Can I have three references from jobs completed two or more years ago?",
          "How and when do you want to be paid?",
        ],
      },
      {
        type: "callout",
        title: "Where to report problems",
        text: "Report deductible waivers and deceptive practices to the Colorado Attorney General's consumer protection section and the Colorado Division of Insurance. Denver's Contractor Licensing office handles complaints about licensed contractors' work.",
      },
      { type: "cta", text: "Skip the door knockers. Get quotes from licensed, insured Denver roofers who meet these checks." },
    ],
    faqs: [
      {
        q: "Does Colorado license roofers?",
        a: "Not at the state level. Licensing is by city or county. Denver requires a Class D roofing contractor license from Community Planning and Development, and neighboring cities such as Aurora and Lakewood have their own requirements.",
      },
      {
        q: "How do I verify a Denver roofing license?",
        a: "Use the contractor license lookup at denvergov.org/contractorlicensing or call Denver Contractor Licensing at (720) 865-2770. Confirm the license is active and the name matches your contract.",
      },
      {
        q: "How much should I pay a roofer up front?",
        a: "The Colorado Roofing Association recommends no more than about 10 percent. State law requires the deposit to be held in trust until materials are delivered or most of the work is done. Pay the balance after the final inspection passes.",
      },
      {
        q: "Is it legal for a roofer to waive my deductible in Colorado?",
        a: "No. CRS 6-22-105 prohibits paying, waiving, rebating or advertising to absorb any part of an insurance deductible. It is a common storm-chaser pitch and a reason to end the conversation.",
      },
      {
        q: "Should I sign with the roofer before the adjuster comes?",
        a: "You are not required to. A roofer can attend the adjuster meeting without a signed contract. If you do sign a contingency agreement, Colorado law gives you 72 hours to cancel after a full or partial claim denial.",
      },
      {
        q: "What warranty should a new roof come with?",
        a: "A manufacturer material warranty (ask which tier is registered) and a written workmanship warranty from the roofer, ideally five to ten years. Workmanship errors cause most early leaks, so the roofer's warranty matters more than the shingle brand's.",
      },
    ],
    sources: [
      "https://www.servicetitan.com/licensing/roofing/colorado",
      "https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Community-Planning-and-Development/Contractor-Licensing",
      "https://www.roofsquad.com/post/how-to-check-the-licensing-status-of-a-denver-roofing-contractor",
      "https://denver.prelive.opencities.com/files/assets/public/v/4/community-planning-and-development/documents/ds/inspections/roofing_guidelines_and_checklist.pdf",
      "https://www.coloradoroofing.org/how-to-spot-common-roofing-scams-colorado",
      "https://www.coloradoroofing.org/news/roofing-storm-chasers",
      "https://www.coloradoroofing.org/news/waiving-insurance-deductibles-is-illegal-in-colorado",
      "https://colorado.public.law/statutes/crs_6-22-104",
      "https://colorado.public.law/statutes/crs_6-22-105",
      "https://www.denver7.com/money/consumer/how-to-avoid-roofing-scams-after-denvers-first-major-hailstorm-of-the-season",
      "https://dhsem.colorado.gov/blog-post/readycolorado-blog-what-to-do-after-a-hail-storm-and-no-roof-scams",
    ],
  },

  // ---------------------------------------------------------------------------
  // 8. Timeline
  // ---------------------------------------------------------------------------
  {
    slug: "roof-replacement-timeline",
    title: "Denver Roof Replacement Timeline: Quote to Done",
    h1: "How Long a Roof Replacement Takes in Denver",
    description:
      "The Denver re-roof process step by step: quotes, permit, materials, tear-off, install and inspection, with realistic timing by season and after hailstorms.",
    intent: "process",
    updated: UPDATED,
    blocks: [
      {
        type: "p",
        text: "Under normal conditions, a Denver asphalt roof replacement takes one to three weeks from signed contract to passed inspection, and the crew is on your roof for one or two days of that. After a metro-wide hailstorm the same job can take six to twelve weeks because every roofer, supplier and inspector is booked. Here is each stage and what controls how long it takes.",
      },
      { type: "h2", text: "The full timeline" },
      {
        type: "table",
        headers: ["Stage", "Normal timing", "After a major hailstorm"],
        rows: [
          ["Inspections and quotes (3 bids)", "1 to 2 weeks", "2 to 4 weeks"],
          ["Insurance adjuster, if claiming", "1 to 3 weeks", "3 to 6 weeks"],
          ["Contract and deposit", "Same day", "Same day"],
          ["Denver permit", "1 to 3 business days", "About the same; the city is rarely the bottleneck"],
          ["Materials ordered and delivered", "3 to 10 days", "2 to 4 weeks for popular colors"],
          ["Tear-off and install, asphalt", "1 to 2 days", "1 to 2 days once scheduled"],
          ["Tear-off and install, metal or tile", "3 to 7 days", "1 to 2 weeks"],
          ["Final inspection", "1 to 5 business days after completion", "1 to 2 weeks"],
          ["Total, asphalt", "1 to 3 weeks", "6 to 12 weeks"],
        ],
      },
      { type: "h2", text: "Stage by stage" },
      { type: "h3", text: "Quotes" },
      {
        type: "p",
        text: "Each roofer needs 30 to 60 minutes on site and a day or two to write the bid. Ask for the square count and a line-item scope so the bids are comparable. If you are filing an insurance claim, get at least one roofer's inspection before the adjuster visit and have them attend it.",
      },
      { type: "h3", text: "Permit" },
      {
        type: "p",
        text: "Denver requires a permit for any full re-roof. Single-family asphalt re-roofs qualify for the city's quick permit process, and licensed contractors typically have it in one to three business days. The fee is valuation-based and usually a few hundred dollars. If you are in Aurora, Lakewood, Arvada, Westminster or unincorporated Jefferson, Arapahoe, Adams or Douglas County, your own building department issues it, with similar turnaround. Nobody should start tearing off before the permit is posted.",
      },
      { type: "h3", text: "Materials" },
      {
        type: "p",
        text: "Common architectural shingles in standard colors are usually in stock at Denver distributors and delivered to your roof by boom truck a day or two before the crew. Class 4 lines, designer shingles, specific colors and all standing seam metal are ordered, and lead times stretch after storms. Ask the roofer to confirm the delivery date before they schedule the crew.",
      },
      { type: "h3", text: "Tear-off and installation" },
      {
        type: "p",
        text: "A crew of five to eight strips a 25-square asphalt roof in a morning, repairs decking, installs underlayment, ice and water shield in valleys and around penetrations, drip edge, flashing, shingles, vents and ridge cap by evening. Two days is normal for steep or cut-up roofs. Expect noise from 7 a.m., a dumpster in the driveway for a day or two, and a magnetic nail sweep of the yard at the end. Move cars out of the driveway and take fragile items off walls; the vibration from tear-off is real.",
      },
      { type: "h3", text: "Inspection" },
      {
        type: "p",
        text: "Denver requires a final inspection (code 201) on every roofing permit. Mid-roof inspections are required for tile and metal and ordered on asphalt jobs only if a pre-inspection flags something. The contractor schedules it, and the inspector checks flashing, drip edge, valleys, ventilation and fastening. A failed inspection costs a $100 re-inspection fee and delays your final payment, which is why you should not pay the balance until it passes. Keep the passed inspection record; your insurer and future buyers will want it.",
      },
      { type: "h2", text: "Seasonality in Denver" },
      {
        type: "ul",
        items: [
          "Hail season runs roughly April 15 to September 15, peaking mid-May through July. Roofers are busiest from June through October working storm claims, and prices and lead times rise accordingly.",
          "Fall (September to November) is the ideal install window: warm enough for shingles to seal, dry, and usually before the first heavy snow.",
          "Winter installs are possible and often cheaper. Asphalt shingles need sustained temperatures above about 40 degrees F to self-seal; in colder weather crews hand-seal each tab, which is a legitimate method if the roofer says they are doing it. Metal installs are fine in cold weather.",
          "Spring brings rain and late snow. A good crew watches the forecast and will not open your roof ahead of a storm; if weather stops a job mid-day, the deck must be dried in with underlayment before they leave.",
        ],
      },
      {
        type: "callout",
        title: "If you have hail damage right now",
        text: "File the claim and get on a reputable roofer's schedule immediately, but do not let anyone rush you into signing on the doorstep. A tarp over active leaks buys weeks. Your insurer's recoverable depreciation deadline, typically 180 days to one year, is the clock that matters, and it can be extended in writing.",
      },
      { type: "cta", text: "Ready to get on the calendar? Get quotes from licensed Denver roofers and lock in your install date." },
    ],
    faqs: [
      {
        q: "How long does it take to replace a roof in Denver?",
        a: "The install itself takes one to two days for asphalt and three to seven for metal or tile. From contract to passed inspection, plan on one to three weeks in normal conditions and six to twelve weeks after a major hailstorm.",
      },
      {
        q: "How long does a Denver roofing permit take?",
        a: "Single-family asphalt re-roofs usually qualify for Denver's quick permit, which licensed contractors typically receive in one to three business days. The contractor must pull it; homeowners cannot.",
      },
      {
        q: "What is the best time of year to replace a roof in Colorado?",
        a: "September through November: warm, dry and after peak hail season. Winter installs are workable with hand-sealed shingles and often come with better pricing.",
      },
      {
        q: "Can shingles be installed in cold weather?",
        a: "Yes. Below about 40 degrees F the adhesive strip will not self-seal, so the crew hand-seals each shingle with roofing cement. Ask the roofer to confirm that in writing for any winter install.",
      },
      {
        q: "Do I need to be home during the roof replacement?",
        a: "Not usually. Be reachable by phone for decisions about decking or unexpected findings, and be present for the final walkthrough. Move cars and outdoor furniture, and keep pets and kids inside during tear-off.",
      },
    ],
    sources: [
      "https://www.excelroofing.com/blog/how-long-does-it-take-to-replace-a-roof/",
      "https://www.atozroofingdenver.com/denver-roofing-permits-how-they-work/",
      "https://specta.build/codes/denver_co/permits",
      "https://denver.prelive.opencities.com/files/assets/public/v/4/community-planning-and-development/documents/ds/inspections/roofing_guidelines_and_checklist.pdf",
      "https://kdvr.com/weather/when-is-hail-season-in-colorado/",
      "https://www.myhailscore.com/blog/colorado-hail-season-2026",
      "https://integrityroofingandpainting.com/how-long-do-i-have-to-complete-my-repairs-and-still-recover-my-depreciation/",
    ],
  },
];

export default pages;
