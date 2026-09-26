import { defaultCostRateSettings, type CostRateConfig, type CostRateSettings } from "@/data/cost-rates";
import { getSupabaseServerClient } from "@/lib/supabase";

type RecordValue = Record<string, unknown>;

function object(value: unknown): RecordValue | null {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as RecordValue : null;
}

function validNumber(value: unknown, min: number, max: number): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;
}

export function validateCostRateConfig(value: unknown): value is CostRateConfig {
  const config = object(value);
  if (!config) return false;
  const construction = object(config.constructionRates);
  const finish = object(config.finishRates);
  const foundation = object(config.foundationFactors);
  const roof = object(config.roofFactors);
  const access = object(config.accessFactors);
  const province = object(config.provinceFactors);
  if (!construction || !finish || !foundation || !roof || !access || !province) return false;

  for (const key of ["townhouse", "villa", "level4"]) {
    const rate = object(construction[key]);
    if (!rate || !validNumber(rate.rawMin, 1, 100_000_000) || !validNumber(rate.rawMax, rate.rawMin, 100_000_000)) return false;
  }
  for (const key of ["essential", "standard", "premium"]) {
    const rate = object(finish[key]);
    if (!rate || !validNumber(rate.min, 1, 100_000_000) || !validNumber(rate.max, rate.min, 100_000_000)) return false;
  }
  for (const key of ["single", "strip", "pile"]) if (!validNumber(foundation[key], 0, 3)) return false;
  for (const key of ["flat", "metal", "tile"]) if (!validNumber(roof[key], 0, 3)) return false;
  for (const key of ["wide", "medium", "narrow"]) if (!validNumber(access[key], 0.5, 3)) return false;
  for (const key of ["kien-giang", "can-tho", "other"]) if (!validNumber(province[key], 0.5, 3)) return false;
  return validNumber(config.basementFactor, 0, 5)
    && validNumber(config.elevatorMin, 0, 10_000_000_000)
    && validNumber(config.elevatorMax, config.elevatorMin, 10_000_000_000);
}

export function costRateSettingsFromRow(value: unknown): CostRateSettings | null {
  const row = object(value);
  if (!row || typeof row.version !== "string" || !row.version.trim() || typeof row.updated_at !== "string" || typeof row.note !== "string" || !validateCostRateConfig(row.config)) return null;
  return { version: row.version, updatedAt: row.updated_at, note: row.note, config: row.config, source: "database" };
}

export async function getPublicCostRateSettings(): Promise<CostRateSettings> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return defaultCostRateSettings;
  const { data, error } = await supabase.from("cost_rate_settings").select("version, note, config, updated_at").eq("id", "active").maybeSingle();
  if (error) return defaultCostRateSettings;
  return costRateSettingsFromRow(data) ?? defaultCostRateSettings;
}
