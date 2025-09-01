// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// @ts-expect-error css
import "swiper/css";
// @ts-expect-error pagination
import "swiper/css/pagination";
// @ts-expect-error css
import "swiper/css/effect-fade";

// Import modules
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
  Parallax,
} from "swiper/modules";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const carBrands = [
  {
    name: "BMW",
    description:
      "BMW blends cutting-edge technology, luxury, and performance. Known for precision engineering, it offers an exhilarating driving experience with advanced features, sporty aesthetics, and innovative safety systems.",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    name: "Mercedes-Benz",
    description:
      "Mercedes-Benz is synonymous with elegance, innovation, and performance. Offering world-class luxury, top-tier safety, and cutting-edge technology, its vehicles provide an unparalleled driving experience.",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    name: "Audi",
    description:
      "Audi combines performance, luxury, and technology to create a seamless driving experience. With its signature Quattro all-wheel-drive, advanced infotainment systems, and sleek design.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2083&q=80",
  },
  {
    name: "Lamborghini",
    description:
      "Lamborghini is an icon of speed, power, and bold aesthetics. Designed for those who crave adrenaline, its aerodynamic styling and roaring engines deliver unparalleled performance.",
    image:
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2087&q=80",
  },
  {
    name: "Ferrari",
    description:
      "Ferrari embodies Italian craftsmanship, performance, and prestige. Built for speed enthusiasts, its powerful engines, aerodynamic elegance, and racing heritage make every drive exhilarating.",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
];

export default function Slider() {
  return (
    <div className="relative">
      <Swiper
        effect={"fade"}
        speed={1000}
        parallax={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade, Parallax]}
        className="mySwiper"
      >
        {carBrands.map((brand, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[300px] md:h-[350px] lg:h-[520px] mt-0.5 w-full relative overflow-hidden "
              data-swiper-parallax="-300"
            >
              {/* Background Image with Parallax Effect */}
              <div
                className="absolute inset-0 bg-cover bg-center transform scale-110 transition-all duration-1000 ease-out"
                style={{
                  backgroundImage: `url('${brand.image}')`,
                }}
                data-swiper-parallax="-23%"
              ></div>

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-b from-[#02404aa3] to-[#083344f5] `}
              ></div>

              {/* Content */}
              <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div
                  className="text-center max-w-4xl mx-auto"
                  data-swiper-parallax-opacity="0"
                  data-swiper-parallax="-100"
                >
                  <h1
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up"
                    style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}
                  >
                    {brand.name}
                  </h1>
                  <p
                    className="text-white lg:text-[18px] text-sm md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed"
                    style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}
                  >
                    {brand.description}
                  </p>
                  <div className="animate-bounce-in">
                    <Button
                      className="px-8 py-3 text-lg font-medium bg-transparent
                      border-2 border-white hover:bg-white hover:text-gray-900
                      transition-all duration-300"
                    >
                      Explore Models
                      {<FaExternalLinkAlt className="ml-2" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Brand Logo Watermark */}
              <div className="absolute bottom-8 right-8 opacity-20">
                <h2 className="text-8xl font-black text-white">{brand.name}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        <div className="swiper-pagination !relative !w-auto"></div>
      </div>
    </div>
  );
}
