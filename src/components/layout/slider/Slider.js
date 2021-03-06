import classes from './Slider.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay, Lazy } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/zoom';
import 'swiper/css/autoplay';
import 'swiper/css/lazy';

const Slider = () => {
  const images = [
    {
      img: 'https://res.cloudinary.com/nhan472569/image/upload/v1657522889/bookstore/banners/book_banner1_kaorxx.jpg',
    },
    {
      img: 'https://res.cloudinary.com/nhan472569/image/upload/v1657522885/bookstore/banners/stacked-books-banner_pj2ubu.jpg',
    },
    {
      img: 'https://res.cloudinary.com/nhan472569/image/upload/v1657522830/bookstore/banners/Home.Banner.BookSale_nrtpwz.jpg',
    },
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
            <SwiperSlide>
              <img src={img.img} key={i} alt="slide" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
