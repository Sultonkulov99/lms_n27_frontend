"use client";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
}

export default function Testimonials() {
  const reviews: Testimonial[] = [
    {
      id: "1",
      name: "Xurshid Istamov",
      role: "Frontend kursi o’quvchisi",
      comment:
        "Lorem ipsum dolor sit amet consectetur. Sit in eget posuere facilisis elementum. Est semper aenean erat est etiam sit. Auctor risus semper ultrices eleifend vel at. Pharetra turpis fames cursus sit in faucibus.",
    },
    {
      id: "2",
      name: "Xurshid Istamov",
      role: "Frontend kursi o’quvchisi",
      comment:
        "Lorem ipsum dolor sit amet consectetur. In mattis ullamcorper faucibus amet libero. Et varius lorem magna non ultricies dictum duis. Quis imperdiet parturient leo orci libero gravida. Tortor malesuada quam.",
    },
    {
      id: "3",
      name: "Xurshid Istamov",
      role: "Frontend kursi o’quvchisi",
      comment:
        "Lorem ipsum dolor sit amet consectetur. Lectus placerat convallis vel mauris. Donec nunc tincidunt mattis enim rhoncus viverra libero enim nulla. Faucibus eleifend commodo sollicitudin eu turpis risus vitae.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container">
        {/* Title — 48px, 700, 60px line-height */}
        <h2 className="text-center font-bold text-[48px] leading-[60px] tracking-normal text-[#0F172A] mb-3">
          Izohlar
        </h2>

        {/* Subtitle — 20px, 500, 30px line-height */}
        <p className="text-center font-medium text-[20px] leading-[30px] tracking-normal text-[#636C79] mb-[48px]">
          O&#39;quvchilarimiz tomonidan qoldirilgan izohlar
        </p>

        {/* 3 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-slate-200 p-8 rounded-[16px] flex flex-col justify-between min-h-[320px]"
            >
              <div>
                {/* Orange Double Quote SVG Icon */}
                <div className="mb-5">
                  <svg
                    width="44"
                    height="32"
                    viewBox="0 0 44 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 32V18.2857C0 12.5714 1.84615 7.61905 5.53846 3.42857C9.38462 0.761905 13.6923 -0.380952 18.4615 0.000001V7.61905C15.2308 7.61905 12.6923 8.66667 10.8462 10.7619C9 12.8571 8.07692 15.3651 8.07692 18.2857H18.4615V32H0ZM25.5385 32V18.2857C25.5385 12.5714 27.3846 7.61905 31.0769 3.42857C34.9231 0.761905 39.2308 -0.380952 44 0.000001V7.61905C40.7692 7.61905 38.2308 8.66667 36.3846 10.7619C34.5385 12.8571 33.6154 15.3651 33.6154 18.2857H44V32H25.5385Z"
                      fill="#FF5722"
                    />
                  </svg>
                </div>

                {/* Comment Text */}
                <p className="font-medium text-[15px] leading-6 text-[#1E293B] m-0">
                  {rev.comment}
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-8">
                <div className="font-bold text-[16px] leading-snug text-[#0F172A]">
                  {rev.name}
                </div>
                <div className="font-medium text-[13px] leading-snug text-[#94A3B8] mt-1">
                  {rev.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
