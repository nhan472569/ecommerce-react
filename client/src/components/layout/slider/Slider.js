import classes from './Slider.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay, Lazy } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/zoom';
import 'swiper/css/autoplay';
import 'swiper/css/lazy';
import { AdvancedImage } from '@cloudinary/react';
import createUrl from '../../../common/utils/cloudinary-utils';

const Slider = () => {
  const images = [
    createUrl('Home.Banner.BookSale_bftebe', 1360, 500),
    createUrl('banner2_jflr2l', 1360, 500),
    createUrl('banner_ssca5z', 1360, 500),
  ];

  return (
    <div className={classes.container}>
      <Swiper
        modules={[Navigation, EffectFade, Autoplay, Lazy]}
        navigation
        effect={'fade'}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        lazy={{ loadPrevNext: true }}
        zoom={{ maxRatio: 2 }}
        speed={800}
        slidesPerView={1}
        className={classes.swiper}
      >
        {images.map((img, i) => {
          return (
            <SwiperSlide key={i}>
              <AdvancedImage cldImg={img} alt="slide" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
