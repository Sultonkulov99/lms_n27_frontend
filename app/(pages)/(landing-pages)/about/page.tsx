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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Biz haqimizda
          </h1>
          <div className="text-gray-600 space-y-4 text-sm md:text-base leading-relaxed w-full">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              elementum non dui non congue. Commodo ut mattis dignissim justo
              adipiscing odio quisque ut. Urna tellus at dui posuere neque.
              Posuere eget dictum turpis iaculis massa. Arcu pharetra sed tellus
              habitant tincidunt. Proin tempor aliquam sit ut amet sed erat.
              Vestibulum ut pellentesque quis id eu ullamcorper hendrerit. Vitae
              consequat massa tempor sed vitae ornare - nullam nibh. Eget
              tristique cras orci maecenas ac dolor vitae id. Malesuada morbi
              ultrices diam morbi vulputate odio purus. Placerat aliquam at duis
              at elementum.
            </p>
            <p>
              Diam commodo in curae orci id turpis eget sapien tincidunt. Cras
              id egestas mi netus venenatis at posuere cras porta. Morbi nam
              donec dignissim amet tortor justo lectus. Morbi at rutrum ultrices
              pulvinar at. Phasellus viverra enim tristique mattis.
            </p>
            <p>
              Vulputate nisl maecenas ipsum leo consectetur vulputate consequat.
              Egestas id et ultrices mauris duis fames. Mauris sit et at massa,
              urna commodo nibh gravida. Commodo accumsan varius dui dolor duis
              facilisi dolor sit. Egestas nisl vestibulum.
            </p>
          </div>
        </section>

        {/* Media galereya section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Media galereya
          </h2>

          <div className="flex flex-col gap-4">
            {/* Top row - 3 images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={photo1.src}
                  alt="Media 1"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={photo2.src}
                  alt="Media 2"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={photo3.src}
                  alt="Media 3"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            {/* Bottom row - 2 images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="aspect-[16/9] md:aspect-[2/1] rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={photo4.src}
                  alt="Media 4"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-[16/9] md:aspect-[2/1] rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={photo5.src}
                  alt="Media 5"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-4 max-w-lg mx-auto">
            <button className="text-sm text-gray-400 hover:text-gray-900 flex items-center gap-1 transition-colors">
              <span aria-hidden="true">&larr;</span> Orqaga
            </button>
            <div className="hidden sm:flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium bg-blue-50 text-blue-600 transition-colors">
                3
              </button>
              <span className="text-gray-400 px-1">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors">
                9
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors">
                10
              </button>
            </div>
            <button className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
              Keyingi <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </section>

        {/* Sertifikat va guvohnomalar section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Sertifikat va guvohnomalar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Certificate 1 (Portrait) */}
            <div className="aspect-[3/4] bg-white border border-gray-200 p-2 shadow-sm flex items-center justify-center rounded-lg overflow-hidden group">
              <img
                src={photo7.src}
                alt="Sertifikat 1"
                className="w-full h-full object-cover rounded shadow-sm group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Certificate 2 (Portrait) */}
            <div className="aspect-[3/4] bg-white border border-gray-200 p-2 shadow-sm flex items-center justify-center rounded-lg overflow-hidden group">
              <img
                src={photo7.src}
                alt="Sertifikat 2"
                className="w-full h-full object-cover rounded shadow-sm group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Certificates 3 & 4 (Landscape Stacked) */}
            <div className="flex flex-col gap-6 h-full justify-between">
              <div className="h-[calc(50%-0.75rem)] bg-white border border-gray-200 p-2 shadow-sm flex items-center justify-center rounded-lg overflow-hidden group">
                <img
                  src={photo6.src}
                  alt="Sertifikat 3"
                  className="w-full h-full object-cover rounded shadow-sm group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="h-[calc(50%-0.75rem)] bg-white border border-gray-200 p-2 shadow-sm flex items-center justify-center rounded-lg overflow-hidden group">
                <img
                  src={photo6.src}
                  alt="Sertifikat 4"
                  className="w-full h-full object-cover rounded shadow-sm group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Tajribali Mentorlar section — Container’dan TASHQARIDA (Full Screen Width) */}
      <div className="w-full">
        <Mentors />
      </div>
    </div>
  );
}
