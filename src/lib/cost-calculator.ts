import {
  accessFactors,
  constructionRates,
  finishRates,
  foundationFactors,
  provinceFactors,
  roofFactors,
  type AccessType,
  type BuildingType,
  type FinishLevel,
  type FoundationType,
  type RoofType,
  type ProvinceType
} from "@/data/cost-rates";

export type CalculatorInput = {
  province: ProvinceType;
  buildingType: BuildingType;
  finishLevel: FinishLevel;
  footprint: number;
  floors: number;
  foundation: FoundationType;
  roof: RoofType;
  access: AccessType;
  basementArea: number;
  elevator: boolean;
};

export type CalculatorResult = {
  convertedArea: number;
  rawMin: number;
  rawMax: number;
  finishMin: number;
  finishMax: number;
  totalMin: number;
  totalMax: number;
};

export function calculateConstructionCost(input: CalculatorInput): CalculatorResult {
  const baseArea = input.footprint * (input.floors + foundationFactors[input.foundation] + roofFactors[input.roof]);
  const basementArea = Math.max(0, input.basementArea) * 1.5;
  const convertedArea = Math.round(baseArea + basementArea);
  const accessFactor = accessFactors[input.access];
  const locationFactor = provinceFactors[input.province];
  const rawRate = constructionRates[input.buildingType];
  const finishRate = finishRates[input.finishLevel];
  const elevatorMin = input.elevator ? 420_000_000 : 0;
  const elevatorMax = input.elevator ? 650_000_000 : 0;
  const rawMin = Math.round(convertedArea * rawRate.rawMin * accessFactor * locationFactor);
  const rawMax = Math.round(convertedArea * rawRate.rawMax * accessFactor * locationFactor);
  const finishMin = Math.round(convertedArea * finishRate.min * locationFactor);
  const finishMax = Math.round(convertedArea * finishRate.max * locationFactor);

  return {
    convertedArea,
    rawMin,
    rawMax,
    finishMin,
    finishMax,
    totalMin: rawMin + finishMin + elevatorMin,
    totalMax: rawMax + finishMax + elevatorMax
  };
}

export function formatCompactVnd(value: number, locale: "vi" | "en") {
  const billion = value / 1_000_000_000;
  return locale === "vi" ? `${billion.toLocaleString("vi-VN", { maximumFractionDigits: 2 })} tỷ` : `${billion.toLocaleString("en-US", { maximumFractionDigits: 2 })}B VND`;
}
