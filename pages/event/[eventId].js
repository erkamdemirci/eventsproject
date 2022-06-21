import React, { useState } from 'react';

import { API_URL } from '../../config';
import Image from 'next/image';
import Link from 'next/link';

import EventSlider from '../../components/EventSlider';
import GoogleMap from '../../components/GoogleMap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
registerLocale('tr', tr);

import { getDay, getMonthLong, getMonthShort, getFullDate, getYear, getDateRangeFormatter } from '../../helpers/date-formatter';

import DateIcon from '../../assets/icons/date-icon';
import LocationIcon from '../../assets/icons/location-icon';
import CashIcon from '../../assets/icons/cash-icon';
import TimeIcon from '../../assets/icons/time-icon';

import styles from './Event.module.scss';

function Event({ event }) {
  const [date, setDate] = useState();
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
                <Link href={'/location/' + event.location}>
                  <span className={styles.locationText}>{event.location}</span>
                </Link>
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
                {event.ends ? (
                  <div>
                    <span>{getDateRangeFormatter(event.starts, event.ends)}</span>
                  </div>
                ) : (
                  <div>
                    <span>{getDay(event.starts)}</span>
                    <span>{getMonthLong(event.starts)}</span>
                    <span>{getYear(event.starts)}</span>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.time}>
              <TimeIcon classes={styles.icon} />
              <span>{event.time}</span>
            </div>
          </div>
        </div>
      </header>
      {!(new Date(event.starts) > new Date() || new Date(event.ends) > new Date()) && (
        <div className={styles.oldEvent}>Bu etkinliğin süresi dolmuş :(</div>
      )}

      <div className={styles.eventDetails}>
        {(new Date(event.starts) > new Date() || new Date(event.ends) > new Date()) && (
          <div className={styles.ticket}>
            <div className={styles.ticketHeader}>
              <span className={styles.eventName}>{event.name}</span>
              <span>{event.category}</span>
            </div>
            <div className={styles.ticketContent}>
              <div className={`${styles.formLine} ${styles.formLineRow}`}>
                <div>
                  <label>Tarih</label>
                  {/* <span>{getFullDate(event.starts)}</span> */}
                  <DatePicker
                    placeholderText={'Seçiniz'}
                    minDate={new Date(event.starts)}
                    maxDate={new Date(event.ends)}
                    className={styles.datePicker}
                    dateFormat="dd.MM.yyyy"
                    locale="tr"
                    selected={date}
                    onChange={(date) => setDate(date)}
                  />
                </div>
                <div>
                  <label>Saat</label>
                  <span>{event.time}</span>
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
                <select onChange={classPickerHandler} defaultValue="">
                  <option value="" disabled="disabled">
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
                <button type="button" className={`${styles.submitButton}`} disabled={!totalPrice || !date}>
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
        )}
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
