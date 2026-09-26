"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, LoaderCircle, MessageSquareText, X } from "lucide-react";
import type { SupabaseClient } from "@supabase/supabase-js";

type LeadStatus = "pending" | "consulted" | "exception";
type Lead = {
  id: string;
  source: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  status: LeadStatus;
  admin_note: string;
  created_at: string;
  updated_at: string;
};

const statusLabels: Record<LeadStatus, string> = {
  pending: "Chưa tư vấn",
  consulted: "Đã tư vấn",
  exception: "Ngoại lệ",
};

const sourceLabels: Record<string, string> = {
  consultation: "Đăng ký tư vấn",
  contact: "Liên hệ",
  cooperation: "Hợp tác",
  careers: "Tuyển dụng",
};

function sourceLabel(source: string) {
  return source.startsWith("project:") ? `Dự án: ${source.slice(8)}` : sourceLabels[source] ?? source;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short", timeZone: "Asia/Ho_Chi_Minh" }).format(new Date(value));
}

export function AdminLeads({ supabase }: { supabase: SupabaseClient }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    supabase.from("leads").select("id, source, name, phone, email, message, status, admin_note, created_at, updated_at")
      .order("created_at", { ascending: false }).then(({ data, error }) => {
        if (!active) return;
        if (error) setMessage(`Không tải được danh sách. Kiểm tra migration 202609260002_leads_crm.sql và quyền admin.${error.message ? ` Chi tiết: ${error.message}` : ""}`);
        else setLeads((data ?? []) as Lead[]);
        setLoading(false);
      });
    return () => { active = false; };
  }, [supabase]);

  const filtered = useMemo(() => leads.filter((lead) => filter === "all" || lead.status === filter), [leads, filter]);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!selected) return;
    setSaving(true);
    setMessage("");
    const { data, error } = await supabase.from("leads")
      .update({ status: selected.status, admin_note: selected.admin_note.trim() })
      .eq("id", selected.id)
      .select("id, source, name, phone, email, message, status, admin_note, created_at, updated_at")
      .single();
    if (error) setMessage(`Không lưu được: ${error.message}`);
    else {
      setLeads((current) => current.map((lead) => lead.id === selected.id ? data as Lead : lead));
      setSelected(null);
      setMessage("Đã cập nhật đăng ký tư vấn.");
    }
    setSaving(false);
  }

  return <section className="admin-content-section">
    <header className="admin-heading"><div><p className="eyebrow">Supabase CRM</p><h1>Đăng ký tư vấn</h1><p>{leads.length} yêu cầu từ các form trên website</p></div></header>
    <div className="admin-lead-filters" aria-label="Lọc theo trạng thái">
      {(["all", "pending", "consulted", "exception"] as const).map((value) => <button type="button" className={filter === value ? "is-active" : ""} key={value} onClick={() => setFilter(value)}>{value === "all" ? "Tất cả" : statusLabels[value]} <span>{value === "all" ? leads.length : leads.filter((lead) => lead.status === value).length}</span></button>)}
    </div>
    {message && !selected && <p className="admin-message" role="status">{message}</p>}
    {loading ? <p>Đang tải danh sách...</p> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Khách hàng</th><th>Nguồn</th><th>Ngày gửi</th><th>Trạng thái</th><th>Ghi chú</th><th>Chi tiết</th></tr></thead><tbody>
      {filtered.map((lead) => <tr key={lead.id}><td><strong>{lead.name}</strong><br /><a href={`tel:${lead.phone}`}>{lead.phone}</a></td><td>{sourceLabel(lead.source)}</td><td>{formatDate(lead.created_at)}</td><td><span className={`admin-lead-status status-${lead.status}`}>{statusLabels[lead.status] ?? lead.status}</span></td><td>{lead.admin_note ? <span className="admin-lead-note-preview">{lead.admin_note}</span> : "—"}</td><td><button className="admin-lead-open" type="button" onClick={() => { setMessage(""); setSelected({ ...lead }); }}><MessageSquareText size={17} /> Xem</button></td></tr>)}
    </tbody></table>{!filtered.length && <p className="admin-empty">Chưa có đăng ký nào trong nhóm này.</p>}</div>}
    {selected && <div className="admin-modal-backdrop"><form className="admin-modal admin-lead-modal" onSubmit={save}>
      <header><div><p className="eyebrow">{sourceLabel(selected.source)} · {formatDate(selected.created_at)}</p><h2>{selected.name}</h2></div><button type="button" className="icon-button" aria-label="Đóng" onClick={() => setSelected(null)}><X /></button></header>
      <div className="admin-lead-details"><p><strong>Số điện thoại</strong><a href={`tel:${selected.phone}`}>{selected.phone}</a></p><p><strong>Email</strong>{selected.email ? <a href={`mailto:${selected.email}`}>{selected.email}</a> : "—"}</p><div><strong>Nội dung khách gửi</strong><p>{selected.message || "Không có nội dung bổ sung."}</p></div></div>
      <div className="admin-form-grid"><label>Trạng thái<select value={selected.status} onChange={(event) => setSelected({ ...selected, status: event.target.value as LeadStatus })}><option value="pending">Chưa tư vấn</option><option value="consulted">Đã tư vấn</option><option value="exception">Ngoại lệ</option></select></label>
        <label className="full">Ghi chú nội bộ<textarea rows={5} maxLength={10000} value={selected.admin_note} onChange={(event) => setSelected({ ...selected, admin_note: event.target.value })} placeholder="Ghi lại thời điểm liên hệ, nhu cầu, bước tiếp theo hoặc lý do ngoại lệ..." /></label>
        {message && <p className="admin-message error full" role="alert">{message}</p>}
      </div>
      <footer><button type="button" className="button secondary" onClick={() => setSelected(null)}>Hủy</button><button className="button primary" disabled={saving}>{saving ? <LoaderCircle className="spin" size={18} /> : <Check size={18} />} Lưu cập nhật</button></footer>
    </form></div>}
  </section>;
}
