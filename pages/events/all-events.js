import React, { useEffect, useState } from 'react';

import EventList from '../../components/EventList';
import SectionTitle from '../../components/SectionTitle';
import EventStatusBar from '../../components/EventStatusBar';
import { API_URL } from '../../config';

const AllEvents = ({ allEvents, totalCount }) => {
  const [page, setPage] = useState(0);
  const [filteredEvents, setFilteredEvents] = useState(allEvents);
  const [activeSection, setActiveSection] = useState('');
  const [totalResults, setTotalResults] = useState(totalCount);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/events/get-events`, {
        method: 'POST',
        body: JSON.stringify({ page: 0, eventStatus: activeSection }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();

      setFilteredEvents(data.events);
      setPage(0);
      setTotalResults(data.resultCount);
    };
    fetchData();
  }, [activeSection]);

  const fetchMore = async (dataType) => {
    if (filteredEvents.length < totalCount) {
      const res = await fetch(`/events/get-events`, {
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

  return (
    <div className="container">
      <SectionTitle title={'Etkinlikler'} desc={'Aradığınız tüm etkinlikler burada!'} />
      <EventStatusBar activeSection={activeSection} setActiveSection={setActiveSection} />
      <EventList events={filteredEvents} fetchMore={fetchMore} dataLength={totalResults} />
    </div>
  );
};

export async function getStaticProps(context) {
  let allEvents;
  let resultCount;
  try {
    const res = await fetch(`/events/get-events`, {
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

export default AllEvents;
