"use client";

/* eslint-disable @next/next/no-img-element -- Admin previews accept arbitrary Supabase Storage URLs. */

import { useEffect, useMemo, useState } from "react";
import { Check, Edit3, GripVertical, ImagePlus, LoaderCircle, LogOut, Plus, Trash2, X } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { ProjectRow } from "@/lib/projects";
import { AdminArticles } from "@/components/admin/AdminArticles";
import { AdminLeads } from "@/components/admin/AdminLeads";
import { AdminCostRates } from "@/components/admin/AdminCostRates";

type FormState = ProjectRow;

const emptyProject: FormState = {
  slug: "",
  title: "",
  category: "Nhà ở",
  location: "Kiên Giang",
  year: String(new Date().getFullYear()),
  status: "completed",
  image: "",
  summary: "",
  land_area: "",
  building_area: "",
  total_floor_area: "",
  scale: "",
  budget: "",
  scope: "Thiết kế · Thi công · Hoàn thiện",
  challenge: "",
  solution: "",
  gallery: [],
  project_type: "townhouse",
  province: "kien-giang",
  land_area_m2: 0,
  budget_billion: 0,
  popularity: 0,
  published: true,
  featured_for_you: false,
  featured_most_viewed: false,
  sort_order: 0,
};

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function AdminProjects() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authorised, setAuthorised] = useState(false);
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [editing, setEditing] = useState<FormState | null>(null);
  const [draggingSlug, setDraggingSlug] = useState<string | null>(null);
  const [busy, setBusy] = useState(Boolean(supabase));
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<"projects" | "articles" | "leads" | "rates">("projects");

  async function loadProjects() {
    if (!supabase) return;
    const { data, error } = await supabase.from("projects").select("*").order("sort_order");
    if (error) setMessage(error.message);
    else setProjects((data ?? []) as ProjectRow[]);
  }

  async function verifyAccess(userId: string) {
    if (!supabase) return;
    const { data } = await supabase.from("admin_users").select("user_id").eq("user_id", userId).maybeSingle();
    const hasAccess = Boolean(data);
    setAuthorised(hasAccess);
    if (hasAccess) await loadProjects();
  }

  useEffect(() => {
    if (!supabase) {
      return;
    }
    supabase.auth.getSession().then(async ({ data }) => {
      const user = data.session?.user;
      setAuthenticated(Boolean(user));
      if (user) await verifyAccess(user.id);
      setBusy(false);
    });
  // Supabase is a stable singleton for the page lifetime.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setMessage("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) setMessage(error?.message ?? "Không thể đăng nhập.");
    else {
      setAuthenticated(true);
      await verifyAccess(data.user.id);
    }
    setBusy(false);
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase || !editing) return;
    if (!editing.image) {
      setMessage("Vui lòng tải ảnh đại diện hoặc chọn một ảnh trong thư viện.");
      return;
    }
    setBusy(true);
    setMessage("");
    const payload = { ...editing, slug: slugify(editing.slug || editing.title) };
    const { error } = await supabase.from("projects").upsert(payload, { onConflict: "slug" });
    if (error) setMessage(error.message);
    else {
      setMessage("Đã lưu dự án.");
      setEditing(null);
      await loadProjects();
    }
    setBusy(false);
  }

  async function remove(project: ProjectRow) {
    if (!supabase || !window.confirm(`Xóa “${project.title}”? Hành động này không thể hoàn tác.`)) return;
    setBusy(true);
    const { error } = await supabase.from("projects").delete().eq("slug", project.slug);
    setMessage(error ? error.message : "Đã xóa dự án.");
    if (!error) await loadProjects();
    setBusy(false);
  }

  async function reorderProjects(sourceSlug: string, targetSlug: string) {
    if (!supabase || sourceSlug === targetSlug || busy) return;
    const sourceIndex = projects.findIndex((project) => project.slug === sourceSlug);
    const targetIndex = projects.findIndex((project) => project.slug === targetSlug);
    if (sourceIndex < 0 || targetIndex < 0) return;

    const reordered = [...projects];
    const [moved] = reordered.splice(sourceIndex, 1);
    reordered.splice(targetIndex, 0, moved);
    setProjects(reordered);
    setBusy(true);
    setMessage("");

    const results = await Promise.all(reordered.map((project, sort_order) =>
      supabase.from("projects").update({ sort_order }).eq("slug", project.slug)
    ));
    const failed = results.find((result) => result.error)?.error;

    if (failed) {
      setMessage(`Không lưu được thứ tự mới: ${failed.message}`);
      await loadProjects();
    } else {
      setProjects(reordered.map((project, sort_order) => ({ ...project, sort_order })));
      setMessage("Đã cập nhật thứ tự dự án.");
    }
    setBusy(false);
  }

  async function upload(files: FileList | null, setAsCover = false) {
    if (!supabase || !editing || !files?.length) return;
    setBusy(true);
    setMessage("");
    const uploaded: { src: string; alt: string }[] = [];
    const errors: string[] = [];
    for (const file of Array.from(files)) {
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${slugify(editing.slug || editing.title || "du-an")}/${crypto.randomUUID()}.${extension}`;
      const { error } = await supabase.storage.from("project-media").upload(path, file, { upsert: false });
      if (error) {
        errors.push(`${file.name}: ${error.message}`);
        continue;
      }
      const { data } = supabase.storage.from("project-media").getPublicUrl(path);
      uploaded.push({ src: data.publicUrl, alt: editing.title || "Ảnh công trình" });
    }
    if (uploaded.length) {
      setEditing((current) => current ? {
        ...current,
        image: setAsCover ? uploaded[0].src : current.image || uploaded[0].src,
        gallery: [...(current.gallery ?? []), ...uploaded],
      } : current);
    }
    if (errors.length) setMessage(errors.join(" · "));
    setBusy(false);
  }

  function removeGalleryPhoto(index: number) {
    setEditing((current) => {
      if (!current) return current;
      const removed = current.gallery?.[index];
      const gallery = current.gallery?.filter((_, photoIndex) => photoIndex !== index) ?? [];
      return { ...current, gallery, image: removed?.src === current.image ? (gallery[0]?.src ?? "") : current.image };
    });
  }

  if (!supabase) return <AdminNotice title="Chưa kết nối Supabase" body="Điền NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY trong .env.local, sau đó khởi động lại website." />;
  if (busy && !authenticated) return <AdminNotice title="Đang kiểm tra phiên đăng nhập" loading />;
  if (!authenticated) return (
    <section className="admin-shell admin-login">
      <form className="admin-panel" onSubmit={login}>
        <p className="eyebrow">Đức Anh KG</p><h1>Quản trị nội dung</h1>
        <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" /></label>
        <label>Mật khẩu<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" /></label>
        {message && <p className="admin-message error">{message}</p>}
        <button className="button primary" disabled={busy}>{busy ? <LoaderCircle className="spin" size={18} /> : <Check size={18} />} Đăng nhập</button>
      </form>
    </section>
  );
  if (!authorised) return <AdminNotice title="Tài khoản chưa có quyền quản trị" body="Thêm UUID của tài khoản này vào bảng admin_users trong Supabase rồi tải lại trang." />;

  return (
    <section className="admin-shell">
      <nav className="admin-tabs" aria-label="Nội dung quản trị"><button type="button" className={tab === "projects" ? "is-active" : ""} onClick={() => setTab("projects")}>Dự án</button><button type="button" className={tab === "articles" ? "is-active" : ""} onClick={() => setTab("articles")}>Cẩm nang</button><button type="button" className={tab === "leads" ? "is-active" : ""} onClick={() => setTab("leads")}>Đăng ký tư vấn</button><button type="button" className={tab === "rates" ? "is-active" : ""} onClick={() => setTab("rates")}>Đơn giá dự toán</button></nav>
      {tab !== "projects" ? <><div className="admin-global-actions"><button className="button secondary" onClick={() => supabase.auth.signOut().then(() => location.reload())}><LogOut size={18} /> Đăng xuất</button></div>{tab === "articles" ? <AdminArticles supabase={supabase} /> : tab === "leads" ? <AdminLeads supabase={supabase} /> : <AdminCostRates supabase={supabase} />}</> : <>
      <header className="admin-heading">
        <div><p className="eyebrow">Supabase CMS</p><h1>Quản lý dự án</h1><p>{projects.length} dự án trong cơ sở dữ liệu</p></div>
        <div className="admin-actions">
          <button className="button primary" onClick={() => setEditing({ ...emptyProject, sort_order: projects.length })}><Plus size={18} /> Thêm dự án</button>
          <button className="button secondary" onClick={() => supabase.auth.signOut().then(() => location.reload())}><LogOut size={18} /> Đăng xuất</button>
        </div>
      </header>
      {message && <p className="admin-message">{message}</p>}
      <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th aria-label="Sắp xếp"></th><th>Dự án</th><th>Trạng thái</th><th>Năm</th><th>Trang chủ</th><th>Hiển thị</th><th></th></tr></thead><tbody>
        {projects.map((project) => <tr key={project.slug} className={draggingSlug === project.slug ? "is-dragging" : ""} onDragOver={(event) => { if (draggingSlug) event.preventDefault(); }} onDrop={(event) => { event.preventDefault(); if (draggingSlug) void reorderProjects(draggingSlug, project.slug); setDraggingSlug(null); }}>
          <td><button className="admin-drag-handle" type="button" draggable={!busy} disabled={busy} aria-label={`Kéo để sắp xếp ${project.title}`} onDragStart={(event) => { event.dataTransfer.effectAllowed = "move"; event.dataTransfer.setData("text/plain", project.slug); setDraggingSlug(project.slug); }} onDragEnd={() => setDraggingSlug(null)}><GripVertical size={18} /></button></td>
          <td><div className="admin-project-cell">{project.image && <img src={project.image} alt="" />}<span><strong>{project.title}</strong><small>{project.location}</small></span></div></td><td>{project.status === "completed" ? "Đã thi công" : project.status === "in_progress" ? "Đang thi công" : "Sắp thi công"}</td><td>{project.year}</td><td>{[project.featured_for_you && "Dành cho bạn", project.featured_most_viewed && "Xem nhiều"].filter(Boolean).join(" · ") || "—"}</td><td>{project.published ? "Có" : "Ẩn"}</td><td><div className="admin-row-actions"><button aria-label="Sửa" onClick={() => setEditing({ ...project, featured_for_you: project.featured_for_you ?? false, featured_most_viewed: project.featured_most_viewed ?? false })}><Edit3 size={17} /></button><button className="danger" aria-label="Xóa" onClick={() => remove(project)}><Trash2 size={17} /></button></div></td>
        </tr>)}
      </tbody></table></div>

      {editing && <div className="admin-modal-backdrop"><form className="admin-modal" onSubmit={save}>
        <header><div><p className="eyebrow">{projects.some((p) => p.slug === editing.slug) ? "Chỉnh sửa" : "Thêm mới"}</p><h2>{editing.title || "Dự án mới"}</h2></div><button type="button" className="icon-button" onClick={() => setEditing(null)}><X /></button></header>
        <div className="admin-form-grid">
          <label>Tên dự án<input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: editing.slug || slugify(e.target.value) })} required /></label>
          <label>Đường dẫn (slug)<input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: slugify(e.target.value) })} required /></label>
          <label>Loại công trình<input value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} required /></label>
          <label>Địa điểm<input value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} required /></label>
          <label>Năm<input value={editing.year} onChange={(e) => setEditing({ ...editing, year: e.target.value })} required /></label>
          <label>Trạng thái<select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as FormState["status"] })}><option value="completed">Đã thi công</option><option value="in_progress">Đang thi công</option><option value="planned">Sắp thi công</option></select></label>
          <label>Nhóm lọc<select value={editing.project_type} onChange={(e) => setEditing({ ...editing, project_type: e.target.value as FormState["project_type"] })}><option value="townhouse">Nhà phố</option><option value="villa">Biệt thự</option><option value="level4">Nhà cấp 4</option><option value="commercial">Thương mại</option></select></label>
          <label className="full">Mô tả<textarea value={editing.summary} onChange={(e) => setEditing({ ...editing, summary: e.target.value })} required rows={3} /></label>
          <label>Diện tích đất<input value={editing.land_area ?? ""} onChange={(e) => setEditing({ ...editing, land_area: e.target.value })} placeholder="120 m²" /></label>
          <label>Ngân sách<input value={editing.budget ?? ""} onChange={(e) => setEditing({ ...editing, budget: e.target.value })} placeholder="Khoảng 2,5 tỷ" /></label>
          <label className="full">Phạm vi<input value={editing.scope ?? ""} onChange={(e) => setEditing({ ...editing, scope: e.target.value })} /></label>
          <label className="full">Bài toán thiết kế<textarea value={editing.challenge ?? ""} onChange={(e) => setEditing({ ...editing, challenge: e.target.value })} rows={3} /></label>
          <label className="full">Giải pháp<textarea value={editing.solution ?? ""} onChange={(e) => setEditing({ ...editing, solution: e.target.value })} rows={3} /></label>
          <div className="admin-cover full">
            <strong>Ảnh đại diện</strong>
            <p>Tải ảnh mới hoặc chọn một ảnh từ thư viện bên dưới.</p>
            {editing.image && <img className="admin-cover-preview" src={editing.image} alt={`Ảnh đại diện của ${editing.title || "dự án"}`} />}
            <label className="admin-upload admin-cover-upload"><ImagePlus size={22} /><span>Tải ảnh đại diện<small>JPG, PNG, WebP hoặc AVIF · tối đa 10 MB</small></span><input type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={busy} onChange={(e) => { void upload(e.target.files, true); e.target.value = ""; }} /></label>
          </div>
          <div className="admin-photo-library full">
            <strong>Thư viện ảnh</strong>
            <label className="admin-upload"><ImagePlus size={22} /><span>Thêm ảnh vào thư viện<small>Có thể chọn nhiều ảnh cùng lúc</small></span><input type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple disabled={busy} onChange={(e) => { void upload(e.target.files); e.target.value = ""; }} /></label>
            {!!editing.gallery?.length && <div className="admin-gallery">{editing.gallery.map((photo, index) => <div className={`admin-gallery-item${editing.image === photo.src ? " is-cover" : ""}`} key={`${photo.src}-${index}`}><button className="admin-gallery-select" type="button" onClick={() => setEditing((current) => current ? { ...current, image: photo.src } : current)} aria-label={`Chọn ảnh ${index + 1} làm ảnh đại diện`} aria-pressed={editing.image === photo.src}><img src={photo.src} alt={photo.alt} />{editing.image === photo.src && <span><Check size={14} /> Ảnh đại diện</span>}</button><button className="admin-gallery-remove" type="button" aria-label={`Xóa ảnh ${index + 1} khỏi thư viện`} onClick={() => removeGalleryPhoto(index)}><X size={14} /></button></div>)}</div>}
          </div>
          {message && <p className="admin-message error full" role="alert">{message}</p>}
          <label className="admin-check full"><input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} /> Hiển thị dự án trên website</label>
          <label className="admin-check full"><input type="checkbox" checked={editing.featured_for_you ?? false} onChange={(e) => setEditing({ ...editing, featured_for_you: e.target.checked })} /> Ý tưởng dành riêng cho bạn</label>
          <label className="admin-check full"><input type="checkbox" checked={editing.featured_most_viewed ?? false} onChange={(e) => setEditing({ ...editing, featured_most_viewed: e.target.checked })} /> Ý tưởng được xem nhiều nhất</label>
        </div>
        <footer><button type="button" className="button secondary" onClick={() => setEditing(null)}>Hủy</button><button className="button primary" disabled={busy}>{busy ? <LoaderCircle className="spin" size={18} /> : <Check size={18} />} Lưu dự án</button></footer>
      </form></div>}
      </>}
    </section>
  );
}

function AdminNotice({ title, body, loading = false }: { title: string; body?: string; loading?: boolean }) {
  return <section className="admin-shell admin-login"><div className="admin-panel">{loading && <LoaderCircle className="spin" />}<h1>{title}</h1>{body && <p>{body}</p>}</div></section>;
}
