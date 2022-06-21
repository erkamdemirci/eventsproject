import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import styles from './EventSlider.module.scss';

const EventSlider = ({ images }) => {
  return images.length ? (
    <Swiper
      style={{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff'
      }}
      spaceBetween={10}
      navigation={images.length > 1}
      modules={[FreeMode, Navigation, Thumbs]}
      className={styles.sliderMain}
    >
      {images.map((imageLink, idx) => (
        <SwiperSlide key={idx}>
          <img src={imageLink} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <div className={styles.noImage}>
      <img src={'/images/no-image.png'} alt="" />
    </div>
  );
};

export default EventSlider;
