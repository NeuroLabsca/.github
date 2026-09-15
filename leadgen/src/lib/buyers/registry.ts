import type { BuyerAdapter } from "./types";
import { ModernizeAdapter, modernizeDefaults, type ModernizeConfig } from "./modernize";
import { GenericPingPostAdapter, type GenericConfig } from "./generic";
import { LogBuyerAdapter } from "./log";

export type BuyerRow = { slug: string; adapter: string; config: Record<string, unknown>; active: boolean; verticalSlugs: string[] };

/** Build an adapter from a `buyers` row. Unknown adapters are skipped, not fatal. */
export function buildAdapter(row: BuyerRow): BuyerAdapter | null {
  switch (row.adapter) {
    case "modernize":
      return new ModernizeAdapter({ ...modernizeDefaults, ...(row.config as Partial<ModernizeConfig>) });
    case "generic":
      return new GenericPingPostAdapter({ slug: row.slug, ...(row.config as Omit<GenericConfig, "slug">) });
    case "log":
      if (process.env.NODE_ENV === "production" && process.env.ALLOW_LOG_BUYER !== "true") return null;
      return new LogBuyerAdapter(row.slug, Number(row.config.price ?? 35), row.config.acceptZips as string[] | undefined);
    default:
      return null;
  }
}
