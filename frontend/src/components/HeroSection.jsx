import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "./hero.css";

// Import images
import img1 from "../assets/hero-image1.jpg";
import img2 from "../assets/hero-image2.jpg";
import img3 from "../assets/hero-image3.jpg";

const HeroSection = () => {
  return (
    <div className="hero">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="hero-swiper"
      >
        <SwiperSlide>
          <img src={img1} alt="Event 1" className="hero-image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="Event 2" className="hero-image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="Event 3" className="hero-image" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSection;
