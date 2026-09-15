// Markets are metros with an explicit ZIP footprint. A ZIP outside every
// active market is still accepted as a lead (buyers are national) but is
// tagged marketSlug=null so we can see out-of-footprint demand.

export type Market = {
  slug: string;
  name: string;
  shortName: string;
  state: string;
  stateName: string;
  zips: string[];
  cities: string[];
  // Market-specific copy for content pages
  facts: { avgReplacementLow: number; avgReplacementHigh: number; hailSeason: string };
};

const denverZips = [
  // Denver
  "80202","80203","80204","80205","80206","80207","80209","80210","80211","80212","80214","80218","80219","80220","80221","80222","80223","80224","80226","80227","80228","80229","80230","80231","80232","80233","80234","80235","80236","80237","80238","80239","80241","80246","80247","80249","80260","80264","80290","80293","80294",
  // Aurora
  "80010","80011","80012","80013","80014","80015","80016","80017","80018","80019","80045","80046","80047",
  // Lakewood / Golden / Wheat Ridge / Arvada
  "80215","80225","80401","80403","80033","80002","80003","80004","80005","80007",
  // Littleton / Highlands Ranch / Centennial / Englewood
  "80120","80121","80122","80123","80124","80125","80126","80127","80128","80129","80130","80110","80111","80112","80113","80015","80016",
  // Westminster / Broomfield / Thornton / Northglenn / Brighton / Commerce City
  "80020","80021","80023","80030","80031","80229","80233","80234","80241","80260","80601","80602","80603","80022","80640",
  // Parker / Castle Rock / Lone Tree
  "80134","80138","80104","80108","80109","80124",
  // Boulder / Longmont / Louisville / Lafayette / Erie
  "80301","80302","80303","80304","80305","80501","80503","80504","80027","80026","80516",
];

export const denver: Market = {
  slug: "denver",
  name: "Denver Metro",
  shortName: "Denver",
  state: "CO",
  stateName: "Colorado",
  zips: Array.from(new Set(denverZips)),
  cities: ["Denver", "Aurora", "Lakewood", "Arvada", "Westminster", "Thornton", "Centennial", "Highlands Ranch", "Littleton", "Parker", "Castle Rock", "Broomfield", "Boulder", "Longmont"],
  facts: { avgReplacementLow: 9500, avgReplacementHigh: 18000, hailSeason: "April through August" },
};

export const markets: Record<string, Market> = { denver };

export function getMarket(slug: string): Market | undefined {
  return markets[slug];
}

export function findMarketByZip(zip: string): Market | undefined {
  return Object.values(markets).find((m) => m.zips.includes(zip));
}
