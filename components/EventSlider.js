import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import styles from './EventSlider.module.scss';

const EventSlider = ({ images, ids, titles, classes }) => {
  return images.length ? (
    <Swiper
      style={{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff'
      }}
      spaceBetween={10}
      navigation={images.length > 1}
      modules={[FreeMode, Navigation, Thumbs]}
      className={`${styles.sliderMain}  ${classes}`}
    >
      {images.map((imageLink, idx) =>
        ids ? (
          <SwiperSlide key={idx} style={{ cursor: 'pointer' }}>
            <div className={styles.sliderTitle}>{titles[idx]}</div>
            <Link href={'/event/' + ids[idx]}>
              <img src={imageLink} alt="" />
            </Link>
          </SwiperSlide>
        ) : (
          <SwiperSlide key={idx}>
            <img src={imageLink} alt="" />
          </SwiperSlide>
        )
      )}
    </Swiper>
  ) : (
    <div className={styles.noImage}>
      <img src={'/images/no-image.jpg'} alt="" />
    </div>
  );
};

export default EventSlider;
