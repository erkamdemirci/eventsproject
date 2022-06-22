import React, { useState, useEffect } from 'react';

import EventList from '../../components/EventList';
import SectionTitle from '../../components/SectionTitle';
import EventStatusBar from '../../components/EventStatusBar';
import { API_URL } from '../../config';

const Location = ({ allEvents, totalCount, locationName }) => {
  const [page, setPage] = useState(0);
  const [filteredEvents, setFilteredEvents] = useState(allEvents);
  const [activeSection, setActiveSection] = useState('');
  const [totalResults, setTotalResults] = useState(totalCount);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/events/get-events`, {
        method: 'POST',
        body: JSON.stringify({ page: 0, locationName, eventStatus: activeSection }),
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
  }, [activeSection, locationName]);

  const fetchMore = async () => {
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
  return (
    <div className="container">
      <SectionTitle title={locationName} desc={'Bu mekandaki tüm etkinliklerin listesi!'} />
      <EventStatusBar activeSection={activeSection} setActiveSection={setActiveSection} />
      <EventList events={filteredEvents} fetchMore={fetchMore} dataLength={totalResults} />
    </div>
  );
};

export async function getStaticProps(context) {
  let { locationName } = context.params;

  let allEvents;
  let resultCount;
  try {
    const res = await fetch(`/api/events/get-events`, {
      method: 'POST',
      body: JSON.stringify({ locationName, page: 0 }),
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
        totalCount: 0,
        locationName
      }
    };
  }

  return {
    props: {
      allEvents: allEvents,
      totalCount: resultCount,
      locationName
    }
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export default Location;
