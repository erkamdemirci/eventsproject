import React from 'react';
import styles from './EventItem.module.scss';
import Link from 'next/link';

import { getFullDate } from '../helpers/date-formatter';

import LocationIcon from '../assets/icons/location-icon';
import CashIcon from '../assets/icons/cash-icon';

const EventSlider = ({ event }) => {
  return (
    <Link href={'/event/' + event._id}>
      <div className={styles.eventItem}>
        <div className={styles.eventImage}>
          <img src={event.images.length ? event.images[0] : '/images/no-image.png'} alt="" />
        </div>
        <div className={styles.topInfo}>
          <div className={styles.eventDate}>{getFullDate(event.dates.start)}</div>
          <div className={styles.isPaid}>
            <span className={`${event.isPaid ? styles.paid : styles.free}`}>{event.isPaid ? 'Ücretli' : 'Ücretsiz'}</span>
            <div className={styles.icon}>
              <CashIcon />
            </div>
          </div>
        </div>
        <h1 className={styles.eventTitle}>{event.name}</h1>
        <div className={styles.eventLocation}>
          <div className={styles.icon}>
            <LocationIcon />
          </div>
          <span>{event.location}</span>
        </div>
      </div>
    </Link>
  );
};

export default EventSlider;
