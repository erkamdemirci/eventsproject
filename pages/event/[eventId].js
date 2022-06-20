import React, { useState } from 'react';

import { API_URL } from '../../config';
import Image from 'next/image';

import EventSlider from '../../components/EventSlider';
import GoogleMap from '../../components/GoogleMap';

import { getDay, getMonthLong, getMonthShort, getFullDate, getFullTime, getYear } from '../../helpers/date-formatter';

import DateIcon from '../../assets/icons/date-icon';
import LocationIcon from '../../assets/icons/location-icon';
import CashIcon from '../../assets/icons/cash-icon';

import styles from './Event.module.scss';

function Event({ event }) {
  const [selectedTicket, setSelectedTicket] = useState();
  const [totalPrice, setTotalPrice] = useState();

  function classPickerHandler(e) {
    let idx = parseInt(e.target.value);

    let _selectedTicket = event.tickets[idx];
    let totalPrice = _selectedTicket.price;

    setSelectedTicket(_selectedTicket);
    setTotalPrice(totalPrice);
  }

  return (
    <div className={`container ${styles.sections}`}>
      <header className={styles.header}>
        <div className={styles.slider}>
          <EventSlider images={event.images} />
        </div>
        <div className={styles.eventInfo}>
          <div className={styles.topInfo}>
            <span className={styles.category}>{event.category}</span>
          </div>
          <h1>{event.name}</h1>
          <div className={styles.moreInfo}>
            <div className={styles.locations}>
              <LocationIcon classes={styles.icon} />
              <div className={styles.infoInner}>
                <span className={styles.locationText}>{event.location}</span>
                <span>{event.city}</span>
              </div>
            </div>
            <div className={styles.locations}>
              <CashIcon classes={styles.icon} />
              <div className={styles.infoInner}>
                <span>{event.isPaid ? 'Ücretli' : 'Ücretsiz'}</span>
              </div>
            </div>

            <div className={styles.dates}>
              <DateIcon classes={styles.icon} />
              <div className={styles.infoInner}>
                <div>
                  <span>{getDay(event.dates.start)}</span>
                  <span>{getMonthLong(event.dates.start)}</span>
                  <span>{getYear(event.dates.start)}</span>
                  <span>{getFullTime(event.dates.start)}</span>
                </div>
                {event.dates.finish && (
                  <div>
                    <span>{getDay(event.dates.finish)}</span>
                    <span>{getMonthLong(event.dates.finish)}</span>
                    <span>{getYear(event.dates.finish)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.eventDetails}>
        <div className={styles.ticket}>
          <div className={styles.ticketHeader}>
            <span className={styles.eventName}>{event.name}</span>
            <span>{event.category}</span>
          </div>
          <div className={styles.ticketContent}>
            <div className={`${styles.formLine} ${styles.formLineRow}`}>
              <div>
                <label>Tarih</label>
                <span>{getFullDate(event.dates.start)}</span>
              </div>
              <div>
                <label>Saat</label>
                <span>{getFullTime(event.dates.start)}</span>
              </div>
            </div>

            <div className={`${styles.formLine} ${styles.formLineRow}`}>
              <div>
                <label>Konum:</label>
                <span>{event.location}</span>
              </div>
              <div>
                <label>Şehir:</label>
                <span>{event.city}</span>
              </div>
            </div>

            <div className={`${styles.formLine}`}>
              <label>Bilet Türü:</label>
              <select onChange={classPickerHandler} name="" id="">
                <option value="" disabled="disabled" selected="selected">
                  Seçiniz
                </option>
                {event.tickets.map((ticket, idx) => (
                  <option value={idx} key={ticket.class} disabled={!ticket.emptySeat}>
                    {ticket.class} {!ticket.emptySeat && '(dolu)'}
                  </option>
                ))}
              </select>
            </div>
            <div className={`${styles.formLine} ${styles.formLineRow}`}>
              <label>Ücret:</label>
              <span className={`${styles.price} ${!event.isPaid && styles.free}`}>{totalPrice ? totalPrice + '₺' : '-'}</span>
            </div>
            <div className={`${styles.formLine} ${styles.formLineRow}`}>
              <button type="button" className={`${styles.submitButton}`} disabled={!totalPrice}>
                Bilet Al
              </button>
            </div>
          </div>
          <div className={styles.ticketFooter}>
            <div className={styles.barcodeImage}>
              <Image src="/images/barcode-image.png" layout="fill" objectFit="contain" alt="" />
            </div>
            <span>{event.name}</span>
          </div>
        </div>
        <div>
          <div className={styles.description}>
            <p>Açıklama:</p>
            <p>{event.description}</p>
          </div>
          {event.coordinates && (
            <div className={styles.mapView}>
              <GoogleMap coordinates={event.coordinates} locationName={event.location} />
            </div>
          )}
        </div>

        {/* <div className={styles.tmpMap} /> */}
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const { eventId } = context.params;

  const res = await fetch(`${API_URL}/event/get-event`, {
    method: 'POST',
    body: JSON.stringify({ eventId }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const jsonData = await res.json();
  console.log(jsonData.event);

  return {
    props: {
      event: jsonData.event
    }
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export default Event;
