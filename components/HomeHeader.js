import React from 'react';
import { motion } from 'framer-motion';

import EventSlider from './EventSlider';
import HomeSearchBar from './HomeSearchBar';

import styles from './HomeHeader.module.scss';

const line1 = 'Etkinliğini Bul';
const line2 = 'Sosyalliğin adresine hoşgeldiniz!';

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.1,
      staggerChildren: 0.04
    }
  }
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const HomeHeader = () => {
  return (
    <header className={`container ${styles.header}`}>
      <EventSlider
        classes={styles.homeEventSlider}
        images={[
          'https://storage.highresaudio.com/web/imgcache/21aa3e20476c901b88c2fdf3c363a8c9/ouj7du-newthreadq-master.jpg',
          'https://www.dizidoktoru.com/images/haberler/2020/08/kucukciftlik_bahce_tiyatrosu_perdelerini_kapali_gise_acti_h3439_4eff6.jpg',
          'https://i.dugun.com/articles/body/original_1-sait-halim-pasa-yalisi.jpg.jpg'
        ]}
        ids={['62aefa9e909bfa088e9a00a8', '62b0fcdb863de1c37da28f6b', '62b19465296c396025c3339a']}
        titles={['New Thread Quartet', 'KüçükÇiftlik Bahçe Tiyatrosu', "Boğaz'da Yoga"]}
      />
      <div className={styles.welcome}>
        <div className={styles.header__right}>
          <div>
            <motion.h3 variants={sentence} initial="hidden" animate="visible" className={styles.welcomeTitle}>
              <div className={styles.title__logo}>
                {line1.split('').map((char, index) => {
                  return (
                    <motion.span key={char + '-' + index} variants={letter}>
                      {char}
                    </motion.span>
                  );
                })}
              </div>
              <div className={styles.subtitle}>
                {line2.split('').map((char, index) => {
                  return (
                    <motion.span className="" key={char + '-' + index} variants={letter}>
                      {char}
                    </motion.span>
                  );
                })}
              </div>
            </motion.h3>
            <p className={styles.desc}>Hemen sevdiğiniz grubun adını arayarak başlayabilirsiniz...</p>
            {/* <HeaderSearchInput /> */}
          </div>
        </div>
        <HomeSearchBar />
      </div>
    </header>
  );
};

export default HomeHeader;
