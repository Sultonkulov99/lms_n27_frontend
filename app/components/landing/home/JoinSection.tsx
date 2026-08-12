"use client";

/* ─── Button style token ─────────────────────────────────────────────────────
   width: 214px | height: 48px | border-radius: 8px (corner-radius-2 = 2×4px)
   padding: 20px top/bottom, 24px left/right | gap: 10px | bg: #3B81F4
   font: Inter 500 15px / 100% line-height
──────────────────────────────────────────────────────────────────────────── */
const btnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "214px",
  height: "48px",
  minHeight: "48px",
  maxHeight: "48px",
  borderRadius: "8px",           /* corner-radius-2 = 2 × 4px = 8px */
  paddingTop: "20px",            /* size-5 */
  paddingBottom: "20px",         /* size-5 */
  paddingLeft: "24px",           /* size-6 */
  paddingRight: "24px",          /* size-6 */
  gap: "10px",
  backgroundColor: "#3B81F4",
  color: "#FFFFFF",
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: "15px",
  lineHeight: "100%",
  letterSpacing: 0,
  textDecoration: "none",
  cursor: "pointer",
  boxSizing: "border-box",
  flexShrink: 0,
};

export default function JoinSection() {
  return (
    <section
      id="join-us"
      className="bg-[#FAFAFA] py-[60px]"
    >
      <div className="container">

        {/* ── Section Header ─────────────────────────────────────────── */}
        <h2 className="font-bold text-[32px] leading-none tracking-normal text-[#0F172A] mb-[23px]">
          Bizga qo&#39;shiling
        </h2>

        {/* Subtitle — 15px / 500 */}
        <p className="font-medium text-[15px] leading-none tracking-normal text-[#636C79] mb-[23px]">
          Bizning safimizga nafaqat o&#39;rganuvchi balki yetarkucha tajribangiz
          bo&#39;lsa mentor sifatida ham qo&#39;shilishingiz mumkin
        </p>

        {/* Two-Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[23px]">

          {/* ── Card 1: O’quvchimisiz? ─────────────────────────────── */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 flex flex-col gap-4">
            <h3 className="font-bold text-[24px] leading-none tracking-normal text-[#0F172A] m-0">
              O&#39;quvchimisiz?
            </h3>

            <p className="font-medium text-[15px] leading-6 tracking-normal text-[#636C79] m-0">
              Agarda o&#39;quvchi bo&#39;lsangiz bizning xalqaro darajadagi tajribali
              mentorlarimizga shogird bo&#39;ling
            </p>

            <a href="#courses" style={btnStyle}>
              Boshlash
            </a>
          </div>

          {/* ── Card 2: Mentormisiz? ────────────────────────────────── */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 flex flex-col gap-4">
            <h3 className="font-bold text-[24px] leading-none tracking-normal text-[#0F172A] m-0">
              Mentormisiz?
            </h3>

            <p className="font-medium text-[15px] leading-6 tracking-normal text-[#636C79] m-0">
              Bizning mualliflar jamoamizga qo&#39;shilib, o&#39;z tajribangizni
              boshqalar bilan oson va qulay platforma orqali ulashing
            </p>

            <a href="#mentor-apply" style={btnStyle}>
              Qo&#39;shilish
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
