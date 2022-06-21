import React from 'react';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div>
        © 2022 Etkinliğini Bul powered by
        <a href="https://erkamdemirci.com">Erkam Demirci</a>
      </div>
    </div>
  );
};

export default Footer;
