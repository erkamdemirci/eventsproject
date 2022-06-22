import React, { useState, useEffect } from 'react';
import styles from './SearchBar.module.scss';
import SectionTitle from './SectionTitle';

const placeholderArr = ["Boğaz'da Yoga", 'Atılım Üniversitesi', 'Tiyatro', 'Dolu Kadehi Ters Tut'];
let counter = 0;
let placeholderItem = placeholderArr[counter];

const AnimatedInput = ({ placeholder: passedPlaceholder = '', ...passedProps }) => {
  const [placeholder, setPlaceholder] = useState(passedPlaceholder.slice(0, 0));
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const intr = setInterval(() => {
      setPlaceholder(placeholderItem.slice(0, placeholderIndex));
      if (placeholderIndex + 1 > placeholderItem.length) {
        setPlaceholderIndex(0);
        counter += 1;
        if (counter > placeholderArr.length - 1) counter = 0;

        placeholderItem = placeholderArr[counter];
      } else {
        setPlaceholderIndex(placeholderIndex + 1);
      }
    }, Math.floor(Math.random() * 250) + 75);
    return () => {
      clearInterval(intr);
    };
  });

  return <input {...passedProps} placeholder={placeholder} />;
};

const SearchBar = ({ searchTextChangeHandler, handleSearch, loading, notFound }) => {
  return (
    <div className={styles.searchField}>
      <SectionTitle title={'Etkinlik Ara'} desc={'Canınız mı sıkılıyor? Bir etkinlik arayın!'} />
      <form onSubmit={(event) => handleSearch(event)} className={styles.searchForm}>
        <AnimatedInput autoFocus onChange={(event) => searchTextChangeHandler(event)} className={styles.animatedInput} type="text" />
        <button type="submit" onClick={(event) => handleSearch(event)} className={styles.submitButton}>
          ARA
        </button>
      </form>
      {loading && !notFound && <div className={styles.message}>Etkinlikler arasında arıyorum, lütfen bekleyin...</div>}

      {!loading && notFound && <div className={styles.message}>Bu sorgu için sonuç bulamadım, tekrar denemek ister misin?</div>}
    </div>
  );
};

export default SearchBar;
