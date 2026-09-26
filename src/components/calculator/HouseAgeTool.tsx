"use client";

import { ArrowRight, Check, Info, X } from "lucide-react";
import { type FormEvent, useState } from "react";
import { assessHouseAge, suggestBorrowAges } from "@/lib/house-age";
import { useLocale } from "@/lib/locale-context";

type Result = ReturnType<typeof assessHouseAge>;

export function HouseAgeTool() {
  const { locale } = useLocale();
  const currentYear = new Date().getFullYear();
  const [birthYear, setBirthYear] = useState("");
  const [buildYear, setBuildYear] = useState(String(currentYear));
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const isVi = locale === "vi";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const birth = Number(birthYear);
    const build = Number(buildYear);
    if (!Number.isInteger(birth) || !Number.isInteger(build) || birth < 1900 || birth > currentYear || build < currentYear || build > 2100 || build - birth + 1 < 18) {
      setResult(null);
      setError(isVi ? `Nhập năm sinh từ 1900 đến ${currentYear}, năm xây từ ${currentYear} đến 2100 và tuổi mụ tối thiểu 18.` : `Enter a birth year from 1900 to ${currentYear}, a build year from ${currentYear} to 2100, and a lunar age of at least 18.`);
      return;
    }
    setError("");
    setResult(assessHouseAge(birth, build));
  }

  const checks = result ? [
    {
      title: "Tam Tai",
      good: !result.tamTai,
      detail: isVi
        ? result.tamTai ? `Năm ${result.buildCanChi} thuộc chu kỳ Tam Tai của tuổi ${result.birthCanChi}.` : `Năm ${result.buildCanChi} không thuộc chu kỳ Tam Tai của tuổi ${result.birthCanChi}.`
        : result.tamTai ? `${result.buildCanChi} falls in the Tam Tai cycle for ${result.birthCanChi}.` : `${result.buildCanChi} does not fall in the Tam Tai cycle for ${result.birthCanChi}.`
    },
    {
      title: "Kim Lâu",
      good: !result.kimLau,
      detail: isVi
        ? result.kimLau ? `Tuổi mụ ${result.lunarAge} phạm ${result.kimLauName}.` : `Tuổi mụ ${result.lunarAge} không phạm Kim Lâu.`
        : result.kimLau ? `Lunar age ${result.lunarAge} falls under ${result.kimLauName}.` : `Lunar age ${result.lunarAge} does not fall under Kim Lâu.`
    },
    {
      title: "Hoang Ốc",
      good: result.hoangOcFavorable,
      detail: isVi
        ? `Tuổi mụ ${result.lunarAge} thuộc cung ${result.hoangOc}, ${result.hoangOcFavorable ? "được xem là cung tốt" : "được xem là cung cần cân nhắc"}.`
        : `Lunar age ${result.lunarAge} falls in ${result.hoangOc}, traditionally considered ${result.hoangOcFavorable ? "favorable" : "unfavorable"}.`
    }
  ] : [];
  const borrowAges = result && !result.favorable ? suggestBorrowAges(result.birthYear, result.buildYear) : [];

  return (
    <section className="house-age-shell">
      <div className="house-age-inner">
        <div className="house-age-tool-heading">
          <span className="house-age-kicker">01 — {isVi ? "Tra cứu nhanh" : "Quick check"}</span>
          <h2>{isVi ? "Năm bạn dự định xây có phù hợp?" : "Is your planned year a good fit?"}</h2>
          <p>{isVi ? "Điền hai mốc năm âm lịch. Kết quả hiển thị ngay bên dưới, không cần đăng ký." : "Enter two lunar calendar years. Results appear below; no signup required."}</p>
        </div>

        <form className="house-age-form" onSubmit={submit} noValidate>
          <div className="house-age-fields">
            <label>
              <span>{isVi ? "Năm sinh (âm lịch)" : "Birth year (lunar)"}</span>
              <input type="number" inputMode="numeric" min={1900} max={currentYear} placeholder={isVi ? "Ví dụ: 1990" : "e.g. 1990"} value={birthYear} onChange={(event) => setBirthYear(event.target.value)} required />
            </label>
            <label>
              <span>{isVi ? "Năm dự định xây (âm lịch)" : "Planned build year (lunar)"}</span>
              <input type="number" inputMode="numeric" min={currentYear} max={2100} value={buildYear} onChange={(event) => setBuildYear(event.target.value)} required />
            </label>
          </div>
          <div className="house-age-form-bottom">
            <p><Info size={17} />{isVi ? "Nếu sinh trước Tết âm lịch, hãy nhập năm âm lịch trước đó." : "If you were born before Lunar New Year, enter the preceding lunar year."}</p>
            <button type="submit">{isVi ? "Xem kết quả" : "View results"}<ArrowRight size={20} /></button>
          </div>
          {error ? <p className="house-age-error" role="alert">{error}</p> : null}
        </form>

        {result ? (
          <div className="house-age-results" aria-live="polite">
            <div className={`house-age-verdict ${result.favorable ? "is-favorable" : "is-caution"}`}>
              <div>
                <span className="house-age-kicker">02 — {isVi ? "Kết quả tham khảo" : "Your result"}</span>
                <h2>{result.favorable
                  ? isVi ? "Năm xây thuận theo ba tiêu chí" : "Favorable across all three checks"
                  : isVi ? "Có tiêu chí cần cân nhắc" : "Some checks call for consideration"}</h2>
                <p>{isVi
                  ? `Gia chủ tuổi ${result.birthCanChi}, xây năm ${result.buildCanChi}: ${result.lunarAge} tuổi mụ.`
                  : `Born in ${result.birthCanChi}, building in ${result.buildCanChi}: lunar age ${result.lunarAge}.`}</p>
              </div>
              <div className="house-age-year-mark">{result.buildYear}</div>
            </div>

            <div className="house-age-checks">
              {checks.map((check, index) => (
                <article className={`house-age-check ${check.good ? "is-good" : "is-bad"}`} key={check.title}>
                  <div className="house-age-check-top"><span>0{index + 1} / 03</span><span className="house-age-check-icon">{check.good ? <Check size={23} /> : <X size={23} />}</span></div>
                  <h3>{check.title}</h3>
                  <strong>{check.good ? isVi ? "Không phạm" : "Favorable" : isVi ? "Cần cân nhắc" : "Consider carefully"}</strong>
                  <p>{check.detail}</p>
                </article>
              ))}
            </div>

            {borrowAges.length > 0 ? (
              <div className="house-age-borrow">
                <div>
                  <span className="house-age-kicker">03 — {isVi ? "Gợi ý tham khảo" : "Reference ideas"}</span>
                  <h3>{isVi ? "Một số tuổi có thể tham khảo để mượn tuổi" : "Some ages to explore for the borrowing-age tradition"}</h3>
                  <p>{isVi ? "Các năm sinh lớn tuổi hơn gia chủ và không phạm cả ba tiêu chí trong năm xây đã chọn." : "Older birth years that pass all three checks for your planned build year."}</p>
                </div>
                <div className="house-age-borrow-list">
                  {borrowAges.map((candidate) => <span key={candidate.birthYear}><strong>{candidate.birthYear}</strong><small>{candidate.birthCanChi} · {candidate.lunarAge} {isVi ? "tuổi mụ" : "lunar age"}</small></span>)}
                </div>
              </div>
            ) : null}

            <p className="house-age-note"><Info size={18} />{isVi ? "Đây là cách xem tuổi theo quan niệm dân gian, không phải điều kiện bắt buộc để xây nhà. Hãy cân nhắc thêm pháp lý, tài chính, thiết kế và thời điểm thi công thực tế." : "These are traditional reference checks, not requirements for building. Also consider permits, budget, design, and actual construction conditions."}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
