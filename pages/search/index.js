import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import SearchBar from '../../components/SearchBar';
import EventList from '../../components/EventList';

const Search = () => {
  const router = useRouter();
  const { term } = router.query;

  const [searchText, setSearchText] = useState(null);
  const [searchedText, setSearchedText] = useState(null);
  const [page, setPage] = useState(0);
  const [filteredEvents, setFilteredEvents] = useState(null);
  const [resultCount, setResultCount] = useState(0);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchTextChangeHandler = (event) => {
    setSearchText(event.target.value.trim());
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchText === searchedText) return;

    setNotFound(false);
    setPage(0);
    if (searchText) setSearchedText(searchText);

    setFilteredEvents(null);
    setNotFound(false);

    if (searchText) {
      router.replace('/search?term=' + searchText);
    } else {
      setFilteredEvents(null);
    }
  };

  useEffect(() => {
    if (term) {
      setLoading(true);
      setNotFound(false);
      setSearchedText(term);

      const fetchData = async () => {
        const res = await fetch(`/api/search?term=${term}&page=0`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await res.json();

        if (data.events) {
          setFilteredEvents(data.events);
          setResultCount(data.resultCount);
          setLoading(false);
        } else {
          setResultCount(0);
          setNotFound(true);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [term]);

  const fetchMore = async () => {
    if ((searchText || term) && filteredEvents.length < resultCount) {
      const res = await fetch(`/api/search?term=${searchText ? searchText : term}&page=${page + 1}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();

      if (data.events) {
        setFilteredEvents((filteredEvents) => [...filteredEvents, ...data.events]);
        setResultCount(data.resultCount);
        setPage(page + 1);
        setLoading(false);
      } else {
        setResultCount(0);
        setNotFound(true);
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <SearchBar loading={loading} notFound={notFound} handleSearch={handleSearch} searchTextChangeHandler={searchTextChangeHandler} />

      {!loading && !notFound && <EventList events={filteredEvents} fetchMore={fetchMore} dataLength={resultCount} />}
    </div>
  );
};

export default Search;
