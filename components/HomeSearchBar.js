import React, { useState, useEffect } from 'react';
import styles from './HomeSearchBar.module.scss';

import SearchIcon from '../assets/icons/search-icon';
import { useRouter } from 'next/router';

const placeholderArr = ["Boğaz'da Yoga         ", 'Atılım Üniversitesi         ', 'Tiyatro         ', 'Dolu Kadehi Ters Tut         '];
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
    }, Math.floor(Math.random() * 200) + 20);
    return () => {
      clearInterval(intr);
    };
  });

  return <input {...passedProps} placeholder={placeholder} />;
};

function HomeSearchBar() {
  const router = useRouter();
  const [searchText, setSearchText] = useState(null);

  const handleSearchTextChange = (event) => {
    let value = event.target.value;
    setSearchText(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    router.replace('/search?term=' + searchText);
  };

  return (
    <div className={styles.searchBar}>
      <form className="w-full">
        <AnimatedInput onChange={(event) => handleSearchTextChange(event)} className={styles.animatedInput} />
        <SearchIcon classes={styles.searchIcon} />
        <button type="submit" onClick={submitHandler} className={styles.submitButton}>
          ARA
        </button>
      </form>
    </div>
  );
}

export default HomeSearchBar;
