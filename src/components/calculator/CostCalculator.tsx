"use client";

import { ArrowLeft, ArrowRight, Check, Info, Printer, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { costRateVersion, type AccessType, type BuildingType, type FinishLevel, type FoundationType, type ProvinceType, type RoofType } from "@/data/cost-rates";
import { calculateConstructionCost, formatCompactVnd } from "@/lib/cost-calculator";
import { useLocale } from "@/lib/locale-context";
import { trackEvent } from "@/lib/analytics";

type CalculatorState = {
  province: ProvinceType;
  buildingType: BuildingType;
  landArea: number;
  footprint: number;
  floors: number;
  roof: RoofType;
  finishLevel: FinishLevel;
  foundation: FoundationType;
  access: AccessType;
  basementArea: number;
  elevator: boolean;
};

const initialState: CalculatorState = {
  province: "kien-giang",
  buildingType: "townhouse",
  landArea: 100,
  footprint: 80,
  floors: 2,
  roof: "flat",
  finishLevel: "standard",
  foundation: "strip",
  access: "wide",
  basementArea: 0,
  elevator: false
};

type RadioCardProps = {
  name: string;
  value: string;
  current: string;
  title: string;
  description?: string;
  onChange: () => void;
};

function RadioCard({ name, value, current, title, description, onChange }: RadioCardProps) {
  return (
    <label className={`calculator-choice${current === value ? " is-selected" : ""}`}>
      <input type="radio" name={name} value={value} checked={current === value} onChange={onChange} />
      <span className="choice-check">{current === value ? <Check size={15} /> : null}</span>
      <strong>{title}</strong>
      {description ? <small>{description}</small> : null}
    </label>
  );
}

export function CostCalculator() {
  const { content, locale } = useLocale();
  const [step, setStep] = useState(1);
  const [state, setState] = useState<CalculatorState>(initialState);
  const [error, setError] = useState("");
  const result = useMemo(() => calculateConstructionCost(state), [state]);
  const related = useMemo(() => {
    const exact = content.projects.filter((project) => project.filters?.type === state.buildingType);
    return (exact.length ? exact : content.projects).slice(0, 2);
  }, [content.projects, state.buildingType]);

  const copy = locale === "vi"
    ? {
        steps: ["Thông tin cơ bản", "Quy mô", "Điều kiện thi công", "Kết quả"], next: "Tiếp tục", back: "Quay lại", calculate: "Xem dự toán", province: "Tỉnh/thành", buildingType: "Loại công trình", landArea: "Diện tích đất", footprint: "Diện tích xây dựng tầng một", floors: "Số tầng", roof: "Loại mái", finish: "Mức hoàn thiện", foundation: "Phương án móng", access: "Đường tiếp cận", basement: "Diện tích tầng hầm", elevator: "Có thang máy", converted: "Diện tích xây dựng quy đổi", raw: "Phần thô và nhân công hoàn thiện", finishes: "Vật tư hoàn thiện", total: "Tổng khoảng tham khảo", version: "Phiên bản đơn giá", disclaimer: "Kết quả chỉ là ước tính sơ bộ từ thông tin bạn nhập. Chưa bao gồm thiết kế, xin phép, nội thất rời, xử lý nền đất đặc biệt và thay đổi giá vật tư. Cần khảo sát hiện trạng và hồ sơ thiết kế để lập dự toán chính thức.", invalid: "Diện tích phải lớn hơn 0, diện tích xây dựng không vượt diện tích đất và số tầng từ 1 đến 6.", reset: "Tính lại", print: "In kết quả", related: "Dự án có thể tham khảo", consult: "Nhận tư vấn chi tiết"
      }
    : {
        steps: ["Basics", "Scale", "Site conditions", "Result"], next: "Continue", back: "Back", calculate: "View estimate", province: "Province", buildingType: "Building type", landArea: "Land area", footprint: "Ground-floor footprint", floors: "Floors", roof: "Roof type", finish: "Finish level", foundation: "Foundation", access: "Site access", basement: "Basement area", elevator: "Elevator included", converted: "Converted construction area", raw: "Structural work and finishing labor", finishes: "Finish materials", total: "Estimated total range", version: "Rate version", disclaimer: "This is an early estimate based on your inputs. It excludes design, permits, loose furniture, special soil treatment, and material-price changes. A site survey and design documents are required for an official estimate.", invalid: "Areas must be above zero, the footprint cannot exceed the land area, and floors must be between 1 and 6.", reset: "Start again", print: "Print result", related: "Projects to explore", consult: "Request detailed advice"
      };

  function set<K extends keyof CalculatorState>(key: K, value: CalculatorState[K]) {
    setState((current) => ({ ...current, [key]: value }));
  }

  function next() {
    if (step === 2 && (state.landArea <= 0 || state.footprint <= 0 || state.footprint > state.landArea || state.floors < 1 || state.floors > 6)) {
      setError(copy.invalid);
      return;
    }
    setError("");
    if (step === 3) {
      trackEvent("calculator_complete", {
        building_type: state.buildingType,
        converted_area: result.convertedArea,
        estimate_min: result.totalMin,
        estimate_max: result.totalMax
      });
    }
    setStep((current) => Math.min(4, current + 1));
  }

  function reset() {
    setState(initialState);
    setError("");
    setStep(1);
  }

  return (
    <div className="calculator-shell">
      <nav className="calculator-progress" aria-label={locale === "vi" ? "Các bước dự toán" : "Estimator steps"}>
        {copy.steps.map((label, index) => <button type="button" key={label} className={step === index + 1 ? "is-active" : step > index + 1 ? "is-complete" : ""} onClick={() => index + 1 < step && setStep(index + 1)} disabled={index + 1 > step}><span>{step > index + 1 ? <Check size={14} /> : index + 1}</span><strong>{label}</strong></button>)}
      </nav>

      <div className="calculator-card">
        {step === 1 ? <section className="calculator-step">
          <div className="calculator-step-heading"><span>01</span><div><p className="eyebrow">{copy.steps[0]}</p><h2>{locale === "vi" ? "Công trình bạn đang dự định xây" : "The project you are planning"}</h2></div></div>
          <div className="calculator-fields two-fields">
            <label className="calculator-field"><span>{copy.province}</span><select value={state.province} onChange={(event) => set("province", event.target.value as ProvinceType)}><option value="kien-giang">Kiên Giang</option><option value="can-tho">Cần Thơ</option><option value="other">{locale === "vi" ? "Tỉnh/thành khác" : "Other province"}</option></select></label>
          </div>
          <fieldset><legend>{copy.buildingType}</legend><div className="calculator-choice-grid"><RadioCard name="buildingType" value="townhouse" current={state.buildingType} title={locale === "vi" ? "Nhà phố" : "Townhouse"} description={locale === "vi" ? "Nhà ở đô thị, mặt tiền hẹp" : "Urban home with a compact frontage"} onChange={() => set("buildingType", "townhouse")} /><RadioCard name="buildingType" value="villa" current={state.buildingType} title={locale === "vi" ? "Biệt thự" : "Villa"} description={locale === "vi" ? "Không gian độc lập, yêu cầu hoàn thiện cao" : "Detached living with higher finish needs"} onChange={() => set("buildingType", "villa")} /><RadioCard name="buildingType" value="level4" current={state.buildingType} title={locale === "vi" ? "Nhà cấp 4" : "Single-storey"} description={locale === "vi" ? "Một tầng, tổ chức mặt bằng gọn" : "A compact single-level layout"} onChange={() => set("buildingType", "level4")} /></div></fieldset>
        </section> : null}

        {step === 2 ? <section className="calculator-step">
          <div className="calculator-step-heading"><span>02</span><div><p className="eyebrow">{copy.steps[1]}</p><h2>{locale === "vi" ? "Xác định quy mô xây dựng" : "Define the construction scale"}</h2></div></div>
          <div className="calculator-fields three-fields">
            <label className="calculator-field"><span>{copy.landArea}</span><div><input type="number" min="1" value={state.landArea} onChange={(event) => set("landArea", Number(event.target.value))} /><em>m²</em></div></label>
            <label className="calculator-field"><span>{copy.footprint}</span><div><input type="number" min="1" value={state.footprint} onChange={(event) => set("footprint", Number(event.target.value))} /><em>m²</em></div></label>
            <label className="calculator-field"><span>{copy.floors}</span><div><input type="number" min="1" max="6" value={state.floors} onChange={(event) => set("floors", Number(event.target.value))} /><em>{locale === "vi" ? "tầng" : "floors"}</em></div></label>
          </div>
          <fieldset><legend>{copy.roof}</legend><div className="calculator-choice-grid"><RadioCard name="roof" value="flat" current={state.roof} title={locale === "vi" ? "Mái bằng" : "Flat roof"} onChange={() => set("roof", "flat")} /><RadioCard name="roof" value="metal" current={state.roof} title={locale === "vi" ? "Mái tôn" : "Metal roof"} onChange={() => set("roof", "metal")} /><RadioCard name="roof" value="tile" current={state.roof} title={locale === "vi" ? "Mái ngói" : "Tile roof"} onChange={() => set("roof", "tile")} /></div></fieldset>
          <fieldset><legend>{copy.finish}</legend><div className="calculator-choice-grid"><RadioCard name="finish" value="essential" current={state.finishLevel} title={locale === "vi" ? "Cơ bản" : "Essential"} onChange={() => set("finishLevel", "essential")} /><RadioCard name="finish" value="standard" current={state.finishLevel} title={locale === "vi" ? "Tiêu chuẩn" : "Standard"} onChange={() => set("finishLevel", "standard")} /><RadioCard name="finish" value="premium" current={state.finishLevel} title={locale === "vi" ? "Cao cấp" : "Premium"} onChange={() => set("finishLevel", "premium")} /></div></fieldset>
          {error ? <p className="calculator-error" role="alert">{error}</p> : null}
        </section> : null}

        {step === 3 ? <section className="calculator-step">
          <div className="calculator-step-heading"><span>03</span><div><p className="eyebrow">{copy.steps[2]}</p><h2>{locale === "vi" ? "Điều kiện ảnh hưởng đến thi công" : "Conditions that affect delivery"}</h2></div></div>
          <fieldset><legend>{copy.foundation}</legend><div className="calculator-choice-grid"><RadioCard name="foundation" value="single" current={state.foundation} title={locale === "vi" ? "Móng đơn" : "Pad foundation"} onChange={() => set("foundation", "single")} /><RadioCard name="foundation" value="strip" current={state.foundation} title={locale === "vi" ? "Móng băng" : "Strip foundation"} onChange={() => set("foundation", "strip")} /><RadioCard name="foundation" value="pile" current={state.foundation} title={locale === "vi" ? "Móng cọc" : "Pile foundation"} onChange={() => set("foundation", "pile")} /></div></fieldset>
          <fieldset><legend>{copy.access}</legend><div className="calculator-choice-grid"><RadioCard name="access" value="wide" current={state.access} title={locale === "vi" ? "Đường rộng trên 5 m" : "Road over 5 m"} onChange={() => set("access", "wide")} /><RadioCard name="access" value="medium" current={state.access} title={locale === "vi" ? "Hẻm 3–5 m" : "Lane 3–5 m"} onChange={() => set("access", "medium")} /><RadioCard name="access" value="narrow" current={state.access} title={locale === "vi" ? "Hẻm dưới 3 m" : "Lane under 3 m"} onChange={() => set("access", "narrow")} /></div></fieldset>
          <div className="calculator-fields two-fields"><label className="calculator-field"><span>{copy.basement}</span><div><input type="number" min="0" value={state.basementArea} onChange={(event) => set("basementArea", Number(event.target.value))} /><em>m²</em></div></label><label className="calculator-toggle"><input type="checkbox" checked={state.elevator} onChange={(event) => set("elevator", event.target.checked)} /><span><i /><strong>{copy.elevator}</strong></span></label></div>
        </section> : null}

        {step === 4 ? <section className="calculator-result" aria-live="polite">
          <div className="calculator-result-heading"><div><p className="eyebrow">{copy.steps[3]}</p><h2>{formatCompactVnd(result.totalMin, locale)} – {formatCompactVnd(result.totalMax, locale)}</h2><p>{copy.total}</p></div><span>{result.convertedArea} m²<small>{copy.converted}</small></span></div>
          <div className="calculator-breakdown"><div><span>{copy.raw}</span><strong>{formatCompactVnd(result.rawMin, locale)} – {formatCompactVnd(result.rawMax, locale)}</strong></div><div><span>{copy.finishes}</span><strong>{formatCompactVnd(result.finishMin, locale)} – {formatCompactVnd(result.finishMax, locale)}</strong></div></div>
          <div className="calculator-version"><Info size={18} /><div><strong>{copy.version}: {costRateVersion.id}</strong><span>{locale === "vi" ? `Cập nhật ${costRateVersion.updatedAt}` : `Updated ${costRateVersion.updatedAt}`}</span></div></div>
          <p className="calculator-disclaimer">{copy.disclaimer}</p>
          <div className="calculator-result-actions"><ButtonLink href="/dang-ky-tu-van-ho-tro">{copy.consult} <ArrowRight size={17} /></ButtonLink><button type="button" onClick={() => window.print()}><Printer size={16} /> {copy.print}</button><button type="button" onClick={reset}><RotateCcw size={16} /> {copy.reset}</button></div>
        </section> : null}

        {step < 4 ? <div className="calculator-actions">{step > 1 ? <button type="button" onClick={() => { setError(""); setStep((current) => current - 1); }}><ArrowLeft size={17} /> {copy.back}</button> : <span />}<button className="button primary" type="button" onClick={next}>{step === 3 ? copy.calculate : copy.next} <ArrowRight size={17} /></button></div> : null}
      </div>

      {step === 4 && related.length ? <section className="calculator-related"><p className="eyebrow">{copy.related}</p><ProjectGrid items={related} compact /></section> : null}
    </div>
  );
}
