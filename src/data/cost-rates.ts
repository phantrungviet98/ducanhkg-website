export type BuildingType = "townhouse" | "villa" | "level4";
export type FinishLevel = "essential" | "standard" | "premium";
export type FoundationType = "single" | "strip" | "pile";
export type RoofType = "flat" | "metal" | "tile";
export type AccessType = "wide" | "medium" | "narrow";
export type ProvinceType = "kien-giang" | "can-tho" | "other";

export const costRateVersion = {
  id: "DAKG-STATIC-2026.09",
  updatedAt: "15/09/2026",
  currency: "VND",
  note: "Bảng hệ số tĩnh phục vụ ước tính sơ bộ, chưa thay thế dự toán theo hồ sơ thiết kế."
};

export const constructionRates: Record<BuildingType, { rawMin: number; rawMax: number }> = {
  townhouse: { rawMin: 3_650_000, rawMax: 4_250_000 },
  villa: { rawMin: 4_050_000, rawMax: 4_850_000 },
  level4: { rawMin: 3_350_000, rawMax: 3_950_000 }
};

export const finishRates: Record<FinishLevel, { min: number; max: number }> = {
  essential: { min: 2_100_000, max: 2_850_000 },
  standard: { min: 2_850_000, max: 4_000_000 },
  premium: { min: 4_000_000, max: 5_800_000 }
};

export const foundationFactors: Record<FoundationType, number> = {
  single: 0.35,
  strip: 0.5,
  pile: 0.65
};

export const roofFactors: Record<RoofType, number> = {
  flat: 0.5,
  metal: 0.3,
  tile: 0.7
};

export const accessFactors: Record<AccessType, number> = {
  wide: 1,
  medium: 1.06,
  narrow: 1.13
};

export const provinceFactors: Record<ProvinceType, number> = {
  "kien-giang": 1,
  "can-tho": 1.03,
  other: 1.08
};
