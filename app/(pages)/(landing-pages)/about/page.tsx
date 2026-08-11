import photo1 from "@/app/assets/Rectangle 1508.png";
import photo2 from "@/app/assets/Rectangle 1509.png";
import photo3 from "@/app/assets/Rectangle 1510.png";
import photo4 from "@/app/assets/Rectangle 1511.png";
import photo5 from "@/app/assets/Rectangle 1512.png";
import photo6 from "@/app/assets/Rectangle 1516.png";
import photo7 from "@/app/assets/Rectangle 1517.png";
import Mentors from "../../../components/landing/home/Mentors";

export default function AboutUs() {
  return (
    <div className="w-full font-sans py-12 md:py-16">
      {/* Ichki chegaralangan container (max-w-7xl) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Biz haqimizda section */}
        <section className="mb-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Biz haqimizda</h1>
          <div className="text-gray-600 space-y-4 text-sm md:text-base leading-relaxed w-full">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elementum non dui non congue. Commodo ut mattis dignissim justo adipiscing odio quisque ut. Urna tellus at dui posuere neque. Posuere eget dictum turpis iaculis massa. Arcu pharetra sed tellus habitant tincidunt. Proin tempor aliquam sit ut amet sed erat. Vestibulum ut pellentesque quis id eu ullamcorper hendrerit. Vitae consequat massa tempor sed vitae ornare - nullam nibh. Eget tristique cras orci maecenas ac dolor vitae id. Malesuada morbi ultrices diam morbi vulputate odio purus. Placerat aliquam at duis at elementum.
            </p>
            <p>
              Diam commodo in curae orci id turpis eget sapien tincidunt. Cras id egestas mi netus venenatis at posuere cras porta. Morbi nam donec dignissim amet tortor justo lectus. Morbi at rutrum ultrices pulvinar at. Phasellus viverra enim tristique mattis.
            </p>
            <p>
              Vulputate nisl maecenas ipsum leo consectetur vulputate consequat. Egestas id et ultrices mauris duis fames. Mauris sit et at massa, urna commodo nibh gravida. Commodo accumsan varius dui dolor duis facilisi dolor sit. Egestas nisl vestibulum.
            </p>
          </div>
        </section>

<<<<<<< HEAD
      {/* Media galereya section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Media galereya</h2>
        
        <div className="flex flex-col gap-4">
          {/* Top row - 3 images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
              <img src={photo1.src} alt="Media 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
              <img src={photo2.src} alt="Media 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
              <img src={photo3.src} alt="Media 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
          {/* Bottom row - 2 images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-[16/9] md:aspect-[2/1] rounded-xl overflow-hidden bg-gray-100">
              <img src={photo4.src} alt="Media 4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-[16/9] md:aspect-[2/1] rounded-xl overflow-hidden bg-gray-100">
              <img src={photo5.src} alt="Media 5" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-4 max-w-lg mx-auto">
          <button className="text-sm text-gray-400 hover:text-gray-900 flex items-center gap-1 transition-colors">
            <span aria-hidden="true">&larr;</span> Orqaga
          </button>
          <div className="hidden sm:flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium bg-blue-50 text-blue-600 transition-colors">3</button>
            <span className="text-gray-400 px-1">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors">9</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors">10</button>
          </div>
          <button className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
            Keyingi <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </section>

      {/* Sertifikat va guvohnomalar section */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sertifikat va guvohnomalar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Certificate 1 (Portrait) */}
          <div className="aspect-[3/4] bg-white border border-gray-200 p-2 shadow-sm flex items-center justify-center rounded-lg overflow-hidden group">
             <img src={photo7.src} alt="Sertifikat 1" className="w-full h-full object-cover rounded shadow-sm group-hover:scale-105 transition-transform duration-500" />
          </div>
          {/* Certificate 2 (Portrait) */}
          <div className="aspect-[3/4] bg-white border border-gray-200 p-2 shadow-sm flex items-center justify-center rounded-lg overflow-hidden group">
             <img src={photo7.src} alt="Sertifikat 2" className="w-full h-full object-cover rounded shadow-sm group-hover:scale-105 transition-transform duration-500" />
          </div>
          {/* Certificates 3 & 4 (Landscape Stacked) */}
          <div className="flex flex-col gap-6 h-full justify-between">
            <div className="h-[calc(50%-0.75rem)] bg-white border border-gray-200 p-2 shadow-sm flex items-center justify-center rounded-lg overflow-hidden group">
               <img src={photo6.src} alt="Sertifikat 3" className="w-full h-full object-cover rounded shadow-sm group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="h-[calc(50%-0.75rem)] bg-white border border-gray-200 p-2 shadow-sm flex items-center justify-center rounded-lg overflow-hidden group">
               <img src={photo6.src} alt="Sertifikat 4" className="w-full h-full object-cover rounded shadow-sm group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Tajribali Mentorlar section */}
      <section className="mb-16 text-center w-screen relative left-1/2 -translate-x-1/2 px-0">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tajribali Mentorlar</h2>
        <p className="text-gray-500 mb-10 text-sm">Barcha kurslarimiz tajribali mentorlar tomonidan tayyorlangan</p>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-2 lg:gap-4">
          {[
            { id: 1, img: mentor1, name: "Mentor 1", role: "Frontend Developer" },
            { id: 2, img: mentor2, name: "Mentor 2", role: "Backend Developer" },
            { id: 3, img: mentor3, name: "Oybek Abdukarimov", role: "Senior Full Stack developer" },
            { id: 4, img: mentor4, name: "Mentor 4", role: "UI/UX Designer" },
            { id: 5, img: mentor5, name: "Mentor 5", role: "Project Manager" }
          ].map((mentor) => (
            <div 
              key={mentor.id} 
              className={`
                ${mentor.id === 5 ? 'w-1/2 md:w-[10.5%]' : 'w-full md:w-[21%] aspect-[4/5]'} 
                bg-[#f3f4f6] rounded-none overflow-hidden relative group cursor-pointer
              `}
            >
              <img src={mentor.img.src} alt={mentor.name} className="w-full h-full object-cover transition-transform duration-500" />
              
              {/* Info Overlay (Visible only on hover) */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 lg:p-5 pt-20 lg:pt-24 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm lg:text-lg leading-tight">{mentor.name}</span>
                  <span className="text-gray-300 text-[10px] lg:text-xs mt-1">{mentor.role}</span>
                  <div className="flex items-center gap-2 lg:gap-3 mt-3 lg:mt-4">
                    {/* SVG Icons (White outlines) */}
                    <a href="#" className="text-white hover:text-gray-300 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 lg:w-5 lg:h-5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </a>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 lg:w-5 lg:h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 lg:w-5 lg:h-5"><path d="M22 4.01c-1 .49-1.98.68-3 .99-1.12-1.27-2.74-1.25-4-1.25-3.35 0-5.91 2.92-5.91 6.27 0 .49.07.97.2 1.44-4.87-.24-9.28-2.6-12.44-6.32a6.37 6.37 0 0 0-.82 3.15c0 2.18 1.12 4.1 2.82 5.23-.88-.03-1.7-.27-2.43-.67v.08c0 2.65 1.88 4.86 4.38 5.37-.47.13-.97.2-1.48.2-.36 0-.71-.04-1.05-.11.66 2.18 2.72 3.77 5.12 3.81-1.87 1.47-4.23 2.34-6.76 2.34-.5 0-1-.03-1.49-.08 2.42 1.55 5.3 2.45 8.36 2.45 10.03 0 15.52-8.3 15.52-15.52 0-.24 0-.47-.02-.7.1-.07 1.15-.84 1.58-1.5z"></path></svg>
                    </a>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 lg:w-5 lg:h-5"><path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-18.005 7a2.25 2.25 0 0 0 .126 4.184l4.5 1.5v6.5a1.25 1.25 0 0 0 2.184.85l3.195-3.568 4.295 3.328a2.25 2.25 0 0 0 3.65-1.572l3-16a2.25 2.25 0 0 0-2.023-2.437zM8.5 12.5l7-4-5.5 5.5v3.5l-2-2.5 1.5-1.5z"></path></svg>
                    </a>
                  </div>
                </div>
=======
        {/* Media galereya section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Media galereya</h2>
          
          <div className="flex flex-col gap-4">
            {/* Top row - 3 images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                <img src={photo1.src} alt="Media 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                <img src={photo2.src} alt="Media 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                <img src={photo3.src} alt="Media 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
>>>>>>> bfa11e58141d31fa917ccd56b887692e1e1d4888
              </div>
            </div>
            {/* Bottom row - 2 images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="aspect-[16/9] md:aspect-[2/1] rounded-xl overflow-hidden bg-gray-100">
                <img src={photo4.src} alt="Media 4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="aspect-[16/9] md:aspect-[2/1] rounded-xl overflow-hidden bg-gray-100">
                <img src={photo5.src} alt="Media 5" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-4 max-w-lg mx-auto">
            <button className="text-sm text-gray-400 hover:text-gray-900 flex items-center gap-1 transition-colors">
              <span aria-hidden="true">&larr;</span> Orqaga
            </button>
            <div className="hidden sm:flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium bg-blue-50 text-blue-600 transition-colors">3</button>
              <span className="text-gray-400 px-1">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors">9</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors">10</button>
            </div>
            <button className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
              Keyingi <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </section>

        {/* Sertifikat va guvohnomalar section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sertifikat va guvohnomalar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Certificate 1 (Portrait) */}
            <div className="aspect-[3/4] bg-white border border-gray-200 p-2 shadow-sm flex items-center justify-center rounded-lg overflow-hidden group">
               <img src={photo7.src} alt="Sertifikat 1" className="w-full h-full object-cover rounded shadow-sm group-hover:scale-105 transition-transform duration-500" />
            </div>
            {/* Certificate 2 (Portrait) */}
            <div className="aspect-[3/4] bg-white border border-gray-200 p-2 shadow-sm flex items-center justify-center rounded-lg overflow-hidden group">
               <img src={photo7.src} alt="Sertifikat 2" className="w-full h-full object-cover rounded shadow-sm group-hover:scale-105 transition-transform duration-500" />
            </div>
            {/* Certificates 3 & 4 (Landscape Stacked) */}
            <div className="flex flex-col gap-6 h-full justify-between">
              <div className="h-[calc(50%-0.75rem)] bg-white border border-gray-200 p-2 shadow-sm flex items-center justify-center rounded-lg overflow-hidden group">
                 <img src={photo6.src} alt="Sertifikat 3" className="w-full h-full object-cover rounded shadow-sm group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="h-[calc(50%-0.75rem)] bg-white border border-gray-200 p-2 shadow-sm flex items-center justify-center rounded-lg overflow-hidden group">
                 <img src={photo6.src} alt="Sertifikat 4" className="w-full h-full object-cover rounded shadow-sm group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Tajribali Mentorlar section — Container'dan TASHQARIDA (Full Screen Width) */}
      <div className="w-full">
        <Mentors />
      </div>
    </div>
  );
}