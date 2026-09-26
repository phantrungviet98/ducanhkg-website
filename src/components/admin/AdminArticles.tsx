"use client";

/* eslint-disable @next/next/no-img-element -- Admin previews accept Supabase Storage URLs. */

import { useEffect, useState } from "react";
import { Check, Edit3, ImagePlus, LoaderCircle, Plus, Trash2, X } from "lucide-react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { ArticleRow } from "@/lib/articles";

type Draft = ArticleRow & { originalSlug?: string };

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function emptyArticle(order: number): Draft {
  return { slug: "", title: "", category: "Hướng dẫn", published_at: new Date().toISOString().slice(0, 10), image: "", excerpt: "", body: [], published: true, sort_order: order };
}

export function AdminArticles({ supabase }: { supabase: SupabaseClient }) {
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function loadArticles() {
    const { data, error } = await supabase.from("articles").select("*").order("sort_order").order("published_at", { ascending: false });
    if (error) setMessage(error.message);
    else setArticles((data ?? []) as ArticleRow[]);
  }

  useEffect(() => {
    let active = true;
    supabase.from("articles").select("*").order("sort_order").order("published_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) setMessage(error.message);
        else setArticles((data ?? []) as ArticleRow[]);
      });
    return () => { active = false; };
  }, [supabase]);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!editing) return;
    if (!editing.image) { setMessage("Vui lòng chọn ảnh đại diện."); return; }
    if (!editing.body.some((paragraph) => paragraph.trim())) { setMessage("Vui lòng nhập nội dung bài viết."); return; }
    setBusy(true);
    setMessage("");
    const { originalSlug, ...draft } = editing;
    const payload = { ...draft, slug: slugify(draft.slug || draft.title), body: draft.body.map((paragraph) => paragraph.trim()).filter(Boolean) };
    const result = originalSlug
      ? await supabase.from("articles").update(payload).eq("slug", originalSlug)
      : await supabase.from("articles").insert(payload);
    if (result.error) setMessage(result.error.message);
    else { setMessage("Đã lưu bài cẩm nang."); setEditing(null); await loadArticles(); }
    setBusy(false);
  }

  async function remove(article: ArticleRow) {
    if (!window.confirm(`Xóa “${article.title}”? Hành động này không thể hoàn tác.`)) return;
    setBusy(true);
    const { error } = await supabase.from("articles").delete().eq("slug", article.slug);
    setMessage(error?.message ?? "Đã xóa bài cẩm nang.");
    if (!error) await loadArticles();
    setBusy(false);
  }

  async function upload(file: File | undefined) {
    if (!file || !editing) return;
    if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) { setMessage("Ảnh phải là JPG, PNG, WebP hoặc AVIF và không quá 10 MB."); return; }
    setBusy(true);
    setMessage("");
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${slugify(editing.slug || editing.title || "cam-nang")}/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from("article-media").upload(path, file);
    if (error) setMessage(error.message);
    else {
      const { data } = supabase.storage.from("article-media").getPublicUrl(path);
      setEditing((current) => current ? { ...current, image: data.publicUrl } : current);
    }
    setBusy(false);
  }

  return <section className="admin-content-section">
    <header className="admin-heading"><div><p className="eyebrow">Supabase CMS</p><h1>Quản lý cẩm nang</h1><p>{articles.length} bài viết trong cơ sở dữ liệu</p></div>
      <button className="button primary" onClick={() => { setMessage(""); setEditing(emptyArticle(articles.length)); }}><Plus size={18} /> Thêm bài viết</button></header>
    {message && !editing && <p className="admin-message" role="status">{message}</p>}
    <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Bài viết</th><th>Chủ đề</th><th>Ngày đăng</th><th>Hiển thị</th><th>Thao tác</th></tr></thead><tbody>
      {articles.map((article) => <tr key={article.slug}><td><div className="admin-project-cell"><img src={article.image} alt="" /><span><strong>{article.title}</strong><small>/cam-nang/{article.slug}</small></span></div></td><td>{article.category}</td><td>{article.published_at}</td><td>{article.published ? "Có" : "Ẩn"}</td><td><div className="admin-row-actions"><button type="button" aria-label={`Sửa ${article.title}`} onClick={() => { setMessage(""); setEditing({ ...article, body: article.body ?? [], originalSlug: article.slug }); }}><Edit3 size={17} /></button><button type="button" className="danger" aria-label={`Xóa ${article.title}`} disabled={busy} onClick={() => void remove(article)}><Trash2 size={17} /></button></div></td></tr>)}
    </tbody></table>{!articles.length && <p className="admin-empty">Chưa có bài cẩm nang. Hãy thêm bài viết đầu tiên.</p>}</div>
    {editing && <div className="admin-modal-backdrop"><form className="admin-modal" onSubmit={save}>
      <header><div><p className="eyebrow">{editing.originalSlug ? "Chỉnh sửa" : "Thêm mới"}</p><h2>{editing.title || "Bài cẩm nang mới"}</h2></div><button className="icon-button" type="button" aria-label="Đóng" onClick={() => setEditing(null)}><X /></button></header>
      <div className="admin-form-grid">
        <label>Tiêu đề<input value={editing.title} required onChange={(event) => setEditing({ ...editing, title: event.target.value, slug: editing.slug || slugify(event.target.value) })} /></label>
        <label>Đường dẫn (slug)<input value={editing.slug} required pattern="[a-z0-9]+(-[a-z0-9]+)*" onChange={(event) => setEditing({ ...editing, slug: slugify(event.target.value) })} /></label>
        <label>Chủ đề<input value={editing.category} required onChange={(event) => setEditing({ ...editing, category: event.target.value })} /></label>
        <label>Ngày đăng<input type="date" value={editing.published_at} required onChange={(event) => setEditing({ ...editing, published_at: event.target.value })} /></label>
        <label className="full">Mô tả ngắn<textarea value={editing.excerpt} required rows={3} onChange={(event) => setEditing({ ...editing, excerpt: event.target.value })} /></label>
        <label className="full">Nội dung bài viết <small>Mỗi đoạn văn cách nhau bằng một dòng trống.</small><textarea value={editing.body.join("\n\n")} rows={10} onChange={(event) => setEditing({ ...editing, body: event.target.value.split(/\n\s*\n/) })} /></label>
        <div className="admin-cover full"><strong>Ảnh đại diện</strong>{editing.image && <img className="admin-cover-preview" src={editing.image} alt="Ảnh đại diện bài viết" />}
          <label>URL ảnh<input type="url" value={editing.image} onChange={(event) => setEditing({ ...editing, image: event.target.value })} placeholder="https://..." /></label>
          <label className="admin-upload admin-cover-upload"><ImagePlus size={22} /><span>Tải ảnh lên Supabase Storage<small>JPG, PNG, WebP hoặc AVIF · tối đa 10 MB</small></span><input type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={busy} onChange={(event) => { void upload(event.target.files?.[0]); event.target.value = ""; }} /></label>
        </div>
        <label className="admin-check full"><input type="checkbox" checked={editing.published} onChange={(event) => setEditing({ ...editing, published: event.target.checked })} /> Hiển thị bài viết trên website</label>
        {message && <p className="admin-message error full" role="alert">{message}</p>}
      </div>
      <footer><button className="button secondary" type="button" onClick={() => setEditing(null)}>Hủy</button><button className="button primary" disabled={busy}>{busy ? <LoaderCircle className="spin" size={18} /> : <Check size={18} />} Lưu bài viết</button></footer>
    </form></div>}
  </section>;
}
