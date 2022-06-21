import React from 'react';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { getFullDate } from '../helpers/date-formatter';
import styles from './EventItem.module.scss';

import LocationIcon from '../assets/icons/location-icon';
import CashIcon from '../assets/icons/cash-icon';

const EventSlider = ({ event }) => {
  return (
    event && (
      <Link href={'/event/' + event._id}>
        <motion.div
          layout
          transition={{ duration: 0.3 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          className={styles.eventItem}
        >
          <div className={styles.eventItemInner}>
            <div className={styles.eventImage}>
              <img src={event.images?.length ? event.images[0] : '/images/no-image.png'} alt="" />
            </div>
            <div className={styles.topInfo}>
              <div className={styles.eventDate}>{getFullDate(event.starts)}</div>
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
        </motion.div>
      </Link>
    )
  );
};

export default EventSlider;
