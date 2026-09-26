const STEMS = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"] as const;
const BRANCHES = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"] as const;
const HOANG_OC = [
  { name: "Nhất Cát", favorable: true },
  { name: "Nhì Nghi", favorable: true },
  { name: "Tam Địa Sát", favorable: false },
  { name: "Tứ Tấn Tài", favorable: true },
  { name: "Ngũ Thọ Tử", favorable: false },
  { name: "Lục Hoang Ốc", favorable: false }
] as const;

function modulo(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor;
}

export function canChi(year: number) {
  return `${STEMS[modulo(year - 4, 10)]} ${BRANCHES[modulo(year - 4, 12)]}`;
}

export function assessHouseAge(birthYear: number, buildYear: number) {
  const lunarAge = buildYear - birthYear + 1;
  if (!Number.isInteger(birthYear) || !Number.isInteger(buildYear) || lunarAge < 1) {
    throw new RangeError("Invalid lunar years");
  }

  const birthBranch = modulo(birthYear - 4, 12);
  const buildBranch = modulo(buildYear - 4, 12);
  const tamTaiYears: Record<number, number[]> = {
    0: [2, 3, 4], 4: [2, 3, 4], 8: [2, 3, 4],
    2: [8, 9, 10], 6: [8, 9, 10], 10: [8, 9, 10],
    3: [5, 6, 7], 7: [5, 6, 7], 11: [5, 6, 7],
    1: [11, 0, 1], 5: [11, 0, 1], 9: [11, 0, 1]
  };
  const tamTai = tamTaiYears[birthBranch].includes(buildBranch);
  const kimLauRemainder = lunarAge % 9;
  const kimLauName: Record<number, string> = { 1: "Kim Lâu Thân", 3: "Kim Lâu Thê", 6: "Kim Lâu Tử", 8: "Kim Lâu Lục Súc" };
  const hoangOc = HOANG_OC[modulo(Math.floor(lunarAge / 10) - 1 + lunarAge % 10, 6)];

  return {
    birthYear,
    buildYear,
    lunarAge,
    birthCanChi: canChi(birthYear),
    buildCanChi: canChi(buildYear),
    tamTai,
    kimLau: kimLauRemainder in kimLauName,
    kimLauName: kimLauName[kimLauRemainder] ?? null,
    hoangOc: hoangOc.name,
    hoangOcFavorable: hoangOc.favorable,
    favorable: !tamTai && !(kimLauRemainder in kimLauName) && hoangOc.favorable
  };
}

export function suggestBorrowAges(birthYear: number, buildYear: number, limit = 6) {
  return Array.from({ length: 61 }, (_, index) => buildYear - (index + 30) + 1)
    .filter((candidateYear) => candidateYear < birthYear)
    .map((candidateYear) => assessHouseAge(candidateYear, buildYear))
    .filter((assessment) => assessment.favorable)
    .slice(0, limit);
}
