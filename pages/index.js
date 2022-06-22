import React, { useEffect, useState } from 'react';

import EventList from '../components/EventList';
import HomeHeader from '../components/HomeHeader';
import SectionTitle from '../components/SectionTitle';
import HomeFilters from '../components/HomeFilters';

import { API_URL } from '../config';

const Home = ({ allEvents, totalCount }) => {
  const [page, setPage] = useState(0);
  const [filteredEvents, setFilteredEvents] = useState(allEvents);
  const [totalResults, setTotalResults] = useState(totalCount);
  const [filters, setFilters] = useState();

  const fetchMore = async (dataType) => {
    if (filteredEvents.length < totalResults) {
      const res = await fetch(`/api/events/get-events`, {
        method: 'POST',
        body: JSON.stringify({ page: page + 1 }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();

      setFilteredEvents((filteredEvents) => [...filteredEvents, ...data.events]);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/events/get-filtered-events`, {
        method: 'POST',
        body: JSON.stringify({ page: 0, filters }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();

      setFilteredEvents(data.events);
      setPage(1);
      setTotalResults(data.resultCount);
    };
    fetchData();
  }, [filters]);

  return (
    <div className="container">
      <HomeHeader />
      <SectionTitle title={'Etkinlik Keşfet'} desc={'Etkinliğe mi katılmak istiyorsun? Güncel etkinliklere gözat!'} />
      <HomeFilters filters={filters} updateFilters={setFilters} />
      <EventList events={filteredEvents} fetchMore={fetchMore} dataLength={totalResults} />
    </div>
  );
};

export async function getStaticProps(context) {
  let allEvents;
  let resultCount;
  try {
    const res = await fetch(`${API_URL}/events/get-events`, {
      method: 'POST',
      body: JSON.stringify({ page: 0 }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();

    allEvents = data.events;
    resultCount = data.resultCount;
  } catch (err) {}

  if (!resultCount) {
    return {
      props: {
        allEvents: [],
        totalCount: 0
      }
    };
  }

  return {
    props: {
      allEvents: allEvents,
      totalCount: resultCount
    }
  };
}

export default Home;
