import React, { useState } from 'react';

import EventList from '../../components/EventList';
import { API_URL } from '../../config';

const Events = ({ allEvents, resultCount }) => {
  const [page, setPage] = useState(0);
  const [filteredEvents, setFilteredEvents] = useState(allEvents);

  const fetchMore = async () => {
    if (filteredEvents.length < totalCount) {
      const res = await fetch(`${API_URL}/events/get-all-events`, {
        method: 'POST',
        body: JSON.stringify({ page: page + 1 }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();

      setFilteredRecipes((filteredRecipes) => [...filteredRecipes, ...data.events]);
      setPage(page + 1);
    }
  };
  return (
    <div>
      <EventList events={filteredEvents} fetchMore={fetchMore} />
    </div>
  );
};

export async function getStaticProps(context) {
  let allEvents;
  let resultCount;
  try {
    const res = await fetch(`${API_URL}/events/get-all-events`, {
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

export default Events;
