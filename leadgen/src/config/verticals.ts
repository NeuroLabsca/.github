// Vertical definitions: question schema drives the funnel UI, validation,
// qualification, and buyer field mapping. Add a vertical by adding an entry.

export type Option = { value: string; label: string; hint?: string };

export type Question = {
  key: string;
  title: string;
  subtitle?: string;
  type: "single" | "multi";
  options: Option[];
  // Answers that make a lead unsellable for this vertical's buyers.
  disqualify?: string[];
  disqualifyMessage?: string;
};

export type Vertical = {
  slug: string;
  name: string;
  serviceNoun: string; // "roof replacement"
  ctaLabel: string; // "Get My Roof Quote"
  questions: Question[];
  timelines: Option[];
  // Points added to quality score by answer; buyers pay more for near-term,
  // full-replacement, insurance-backed jobs.
  scoring: Record<string, Record<string, number>>;
};

export const roofing: Vertical = {
  slug: "roofing",
  name: "Roofing",
  serviceNoun: "roof replacement or repair",
  ctaLabel: "Get My Roof Quote",
  questions: [
    {
      key: "projectType",
      title: "What does your roof need?",
      type: "single",
      options: [
        { value: "replace", label: "Full replacement", hint: "New roof, tear-off or overlay" },
        { value: "repair", label: "Repair", hint: "Leak, missing shingles, flashing" },
        { value: "storm", label: "Storm or hail damage", hint: "Possible insurance claim" },
        { value: "unsure", label: "Not sure yet", hint: "I want an inspection" },
      ],
    },
    {
      key: "roofType",
      title: "What material is on the roof now?",
      type: "single",
      options: [
        { value: "asphalt", label: "Asphalt shingles" },
        { value: "metal", label: "Metal" },
        { value: "tile", label: "Tile or slate" },
        { value: "flat", label: "Flat or low-slope" },
        { value: "wood", label: "Wood shake" },
        { value: "unknown", label: "Not sure" },
      ],
    },
    {
      key: "propertyType",
      title: "What kind of property is it?",
      type: "single",
      options: [
        { value: "single_family", label: "Single-family home" },
        { value: "townhome", label: "Townhome or duplex" },
        { value: "multi_family", label: "Multi-family building" },
        { value: "mobile", label: "Mobile or manufactured home" },
        { value: "commercial", label: "Commercial building" },
      ],
      disqualify: ["commercial"],
      disqualifyMessage: "We only match residential projects right now.",
    },
    {
      key: "roofAge",
      title: "How old is the roof, roughly?",
      type: "single",
      options: [
        { value: "lt10", label: "Under 10 years" },
        { value: "10to20", label: "10 to 20 years" },
        { value: "gt20", label: "Over 20 years" },
        { value: "unknown", label: "Not sure" },
      ],
    },
    {
      key: "insuranceClaim",
      title: "Are you planning to file an insurance claim?",
      subtitle: "Hail and wind damage is often covered. Contractors can help with the inspection.",
      type: "single",
      options: [
        { value: "yes", label: "Yes, or already filed" },
        { value: "maybe", label: "Maybe, I want to find out" },
        { value: "no", label: "No, paying out of pocket" },
      ],
    },
  ],
  timelines: [
    { value: "asap", label: "As soon as possible" },
    { value: "1to3mo", label: "In the next 1 to 3 months" },
    { value: "3to6mo", label: "In 3 to 6 months" },
    { value: "planning", label: "Just planning and comparing prices" },
  ],
  scoring: {
    projectType: { replace: 30, storm: 30, unsure: 15, repair: 5 },
    timeline: { asap: 30, "1to3mo": 20, "3to6mo": 10, planning: 0 },
    roofAge: { gt20: 10, "10to20": 5 },
    insuranceClaim: { yes: 10, maybe: 5 },
    propertyType: { single_family: 10, townhome: 5 },
  },
};

export const verticals: Record<string, Vertical> = { roofing };

export function getVertical(slug: string): Vertical | undefined {
  return verticals[slug];
}
