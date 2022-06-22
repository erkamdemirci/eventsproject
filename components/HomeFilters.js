import React, { useEffect, useState } from 'react';
import styles from './HomeFilters.module.scss';

import { filterDateFormatter } from '../helpers/date-formatter';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
registerLocale('tr', tr);

import { API_URL } from '../config';

const HomeFilters = ({ updateFilters, setPage }) => {
  const [date, setDate] = useState();
  const [categories, setCategories] = useState();
  const [locations, setLocations] = useState();
  const [cities, setCities] = useState();

  const [filters, setFilters] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/filters/get-all-filters`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();

      setCategories(data.categories);
      setLocations(data.locations);
      setCities(data.cities);
    };
    fetchData();
  }, []);

  function filterHandler(e) {
    let filterType = e.target.getAttribute('data-type');
    let value = e.target.value;

    setFilters((prevState) => ({ ...prevState, [filterType]: value }));
  }
  function dateChangeHandler(date) {
    setFilters((prevState) => ({ ...prevState, date: filterDateFormatter(date) }));
    setDate(date);
  }

  function submitHandler(e) {
    updateFilters(filters);
  }

  function resetHandler(e) {
    setFilters();
    setDate();
    setPage(0);
    updateFilters({});
  }

  return (
    <div className={`container ${styles.filterBar}`}>
      <div>
        <label>Tarih:</label>
        <DatePicker
          placeholderText={'Seçiniz'}
          className={styles.datePicker}
          dateFormat="dd.MM.yyyy"
          locale="tr"
          selected={date}
          onChange={dateChangeHandler}
        />
      </div>
      <div>
        <label>Kategori:</label>
        <select value={filters?.category ? filters.category : ''} data-type={'category'} onChange={filterHandler}>
          <option value="">Seçiniz</option>
          {categories &&
            categories.map((category, idx) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label>Mekan:</label>
        <select value={filters?.location ? filters.location : ''} data-type={'location'} onChange={filterHandler}>
          <option value="">Seçiniz</option>
          {locations &&
            locations.map((location, idx) => (
              <option value={location} key={location}>
                {location}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label>Şehir:</label>
        <select value={filters?.city ? filters.city : ''} data-type={'city'} onChange={filterHandler}>
          <option value="">Seçiniz</option>
          {cities &&
            cities.map((city, idx) => (
              <option value={city} key={city}>
                {city}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label></label>
        <button disabled={!filters} type="button" onClick={submitHandler} className={`${styles.submitButton}`}>
          Etkinlikleri Bul
        </button>
      </div>
      {filters && (
        <div className={styles.resetButton}>
          <label></label>
          <button type="button" onClick={resetHandler} className={`${styles.resetButton}`}>
            Sıfırla
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeFilters;
