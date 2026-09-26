"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { calculateConstructionCost, formatCompactVnd } from "@/lib/cost-calculator";
import { costRateSettingsFromRow, validateCostRateConfig } from "@/lib/cost-rate-settings";
import type { CostRateSettings } from "@/data/cost-rates";

type GroupKey = "foundationFactors" | "roofFactors" | "accessFactors" | "provinceFactors";
type RangeKey = "constructionRates" | "finishRates";

const groupLabels: Record<GroupKey, { title: string; entries: { key: string; label: string }[] }> = {
  foundationFactors: { title: "Hệ số móng", entries: [{ key: "single", label: "Móng đơn" }, { key: "strip", label: "Móng băng" }, { key: "pile", label: "Móng cọc" }] },
  roofFactors: { title: "Hệ số mái", entries: [{ key: "flat", label: "Mái bằng" }, { key: "metal", label: "Mái tôn" }, { key: "tile", label: "Mái ngói" }] },
  accessFactors: { title: "Hệ số đường tiếp cận", entries: [{ key: "wide", label: "Đường trên 5 m" }, { key: "medium", label: "Hẻm 3–5 m" }, { key: "narrow", label: "Hẻm dưới 3 m" }] },
  provinceFactors: { title: "Hệ số khu vực", entries: [{ key: "kien-giang", label: "Kiên Giang" }, { key: "can-tho", label: "Cần Thơ" }, { key: "other", label: "Tỉnh/thành khác" }] },
};

const rangeLabels: { group: RangeKey; title: string; entries: { key: string; label: string }[]; minKey: string; maxKey: string }[] = [
  { group: "constructionRates", title: "Đơn giá phần thô và nhân công hoàn thiện (VND/m²)", entries: [{ key: "townhouse", label: "Nhà phố" }, { key: "villa", label: "Biệt thự" }, { key: "level4", label: "Nhà cấp 4" }], minKey: "rawMin", maxKey: "rawMax" },
  { group: "finishRates", title: "Đơn giá vật tư hoàn thiện (VND/m²)", entries: [{ key: "essential", label: "Cơ bản" }, { key: "standard", label: "Tiêu chuẩn" }, { key: "premium", label: "Cao cấp" }], minKey: "min", maxKey: "max" },
];

function RateInput({ label, value, onChange, step = 1 }: { label: string; value: number; onChange: (value: number) => void; step?: number }) {
  return <label>{label}<input type="number" min="0" step={step} value={value} required onChange={(event) => onChange(Number(event.target.value))} /></label>;
}

export function AdminCostRates({ supabase }: { supabase: SupabaseClient }) {
  const [draft, setDraft] = useState<CostRateSettings | null>(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    supabase.from("cost_rate_settings").select("version, note, config, updated_at").eq("id", "active").maybeSingle()
      .then(({ data, error }) => {
        if (!active) return;
        const settings = costRateSettingsFromRow(data);
        if (error || !settings) setMessage("Chưa đọc được bảng đơn giá. Hãy chạy migration 202609260003_cost_rate_settings.sql trong Supabase.");
        else setDraft(settings);
        setLoading(false);
      });
    return () => { active = false; };
  }, [supabase]);

  function updateNumber(path: string[], value: number) {
    setDraft((current) => {
      if (!current) return current;
      const config = structuredClone(current.config);
      let target = config as unknown as Record<string, unknown>;
      for (const key of path.slice(0, -1)) target = target[key] as Record<string, unknown>;
      target[path[path.length - 1]] = value;
      return { ...current, config };
    });
  }

  const preview = useMemo(() => draft && validateCostRateConfig(draft.config) ? calculateConstructionCost({
    province: "kien-giang", buildingType: "townhouse", finishLevel: "standard", footprint: 80,
    floors: 2, foundation: "strip", roof: "flat", access: "wide", basementArea: 0, elevator: false,
  }, draft.config) : null, [draft]);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!draft) return;
    if (!draft.version.trim() || !validateCostRateConfig(draft.config)) {
      setMessage("Đơn giá/hệ số không hợp lệ: giá tối thiểu không được lớn hơn tối đa, và mọi ô phải nằm trong giới hạn hợp lý.");
      return;
    }
    setBusy(true);
    setMessage("");
    const { data, error } = await supabase.from("cost_rate_settings")
      .update({ version: draft.version.trim(), note: draft.note.trim(), config: draft.config })
      .eq("id", "active").select("version, note, config, updated_at").single();
    const saved = costRateSettingsFromRow(data);
    if (error || !saved) setMessage(`Không lưu được bảng giá.${error?.message ? ` ${error.message}` : ""}`);
    else { setDraft(saved); setMessage("Đã lưu bảng đơn giá. Dự toán mới sẽ dùng giá này khi tải lại trang."); }
    setBusy(false);
  }

  if (loading) return <section className="admin-content-section"><h1>Đơn giá dự toán</h1><p>Đang tải bảng giá...</p></section>;
  if (!draft) return <section className="admin-content-section"><h1>Đơn giá dự toán</h1><p className="admin-message error" role="alert">{message}</p></section>;

  return <section className="admin-content-section">
    <header className="admin-heading"><div><p className="eyebrow">Supabase CRM</p><h1>Đơn giá dự toán</h1><p>Điều chỉnh công thức tính trên công cụ Dự toán. Giá tính bằng VND; hệ số là số thập phân.</p></div></header>
    <form className="admin-rates-form" onSubmit={save}>
      <div className="admin-rates-card admin-form-grid"><label>Mã phiên bản<input value={draft.version} maxLength={80} required onChange={(event) => setDraft({ ...draft, version: event.target.value })} /></label><label>Ngày cập nhật<input value={new Date(draft.updatedAt).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })} readOnly /></label><label className="full">Ghi chú bảng giá (hiển thị công khai)<textarea rows={2} value={draft.note} onChange={(event) => setDraft({ ...draft, note: event.target.value })} /></label></div>
      {rangeLabels.map(({ group, title, entries, minKey, maxKey }) => <fieldset className="admin-rates-card" key={group}><legend>{title}</legend><div className="admin-rates-range-grid">{entries.map(({ key, label }) => {
        const range = (draft.config[group] as unknown as Record<string, Record<string, number>>)[key];
        return <div className="admin-rates-range-row" key={key}><strong>{label}</strong><RateInput label="Từ" value={range[minKey]} onChange={(value) => updateNumber([group, key, minKey], value)} /><RateInput label="Đến" value={range[maxKey]} onChange={(value) => updateNumber([group, key, maxKey], value)} /></div>;
      })}</div></fieldset>)}
      <div className="admin-rates-factor-grid">{(Object.keys(groupLabels) as GroupKey[]).map((group) => <fieldset className="admin-rates-card" key={group}><legend>{groupLabels[group].title}</legend><div className="admin-rates-factor-fields">{groupLabels[group].entries.map(({ key, label }) => <RateInput key={key} label={label} step={0.01} value={(draft.config[group] as unknown as Record<string, number>)[key]} onChange={(value) => updateNumber([group, key], value)} />)}</div></fieldset>)}</div>
      <fieldset className="admin-rates-card"><legend>Hạng mục bổ sung</legend><div className="admin-rates-factor-fields"><RateInput label="Hệ số tầng hầm" step={0.01} value={draft.config.basementFactor} onChange={(value) => updateNumber(["basementFactor"], value)} /><RateInput label="Thang máy từ (VND)" value={draft.config.elevatorMin} onChange={(value) => updateNumber(["elevatorMin"], value)} /><RateInput label="Thang máy đến (VND)" value={draft.config.elevatorMax} onChange={(value) => updateNumber(["elevatorMax"], value)} /></div></fieldset>
      {preview && <div className="admin-rates-preview"><strong>Kiểm tra nhanh</strong><p>Nhà phố 80 m² × 2 tầng, móng băng, mái bằng, hoàn thiện tiêu chuẩn, đường rộng tại Kiên Giang:</p><span>{formatCompactVnd(preview.totalMin, "vi")} – {formatCompactVnd(preview.totalMax, "vi")}</span><small>Diện tích quy đổi {preview.convertedArea} m²</small></div>}
      {message && <p className={`admin-message${message.startsWith("Đã lưu") ? "" : " error"}`} role="status">{message}</p>}
      <div className="admin-rates-actions"><button className="button primary" disabled={busy}>{busy ? <LoaderCircle className="spin" size={18} /> : <Check size={18} />} Lưu bảng đơn giá</button></div>
    </form>
  </section>;
}
