import React from 'react';
import styles from './EventStatusBar.module.scss';

const EventStatusBar = ({ activeSection, setActiveSection }) => {
  function statusHandler(e) {
    setActiveSection(event.target.getAttribute('data-value'));
  }

  return (
    <div className={`container ${styles.navigation}`}>
      <button type="button" data-value={''} onClick={statusHandler} className={`${!activeSection && styles.active}`}>
        Tüm Etkinlikler
      </button>
      <button type="button" data-value={'live'} onClick={statusHandler} className={`${activeSection === 'live' && styles.active}`}>
        Güncel Etkinlikler
      </button>
      <button type="button" data-value={'old'} onClick={statusHandler} className={`${activeSection === 'old' && styles.active}`}>
        Geçmiş Etkinlikler
      </button>
    </div>
  );
};

export default EventStatusBar;
