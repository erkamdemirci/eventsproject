import React, { useEffect, useState } from 'react';

import EventList from '../components/EventList';
import EventSlider from '../components/EventSlider';
import SectionTitle from '../components/SectionTitle';
import HomeFilters from '../components/HomeFilters';

import { API_URL } from '../config';

const Home = ({ allEvents, totalCount }) => {
  const [page, setPage] = useState(0);
  const [filteredEvents, setFilteredEvents] = useState(allEvents);
  const [totalResults, setTotalResults] = useState(totalCount);
  const [filters, setFilters] = useState();

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

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/events/get-filtered-events`, {
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
      <EventSlider
        images={[
          'https://storage.highresaudio.com/web/imgcache/21aa3e20476c901b88c2fdf3c363a8c9/ouj7du-newthreadq-master.jpg',
          'https://www.dizidoktoru.com/images/haberler/2020/08/kucukciftlik_bahce_tiyatrosu_perdelerini_kapali_gise_acti_h3439_4eff6.jpg',
          'https://i.dugun.com/articles/body/original_1-sait-halim-pasa-yalisi.jpg.jpg'
        ]}
        ids={['62aefa9e909bfa088e9a00a8', '62b0fcdb863de1c37da28f6b', '62b19465296c396025c3339a']}
        titles={['New Thread Quartet', 'KüçükÇiftlik Bahçe Tiyatrosu', "Boğaz'da Yoga"]}
      />
      <SectionTitle title={'Etkinlik Bul'} desc={'Etkinliğe mi katılmak istiyorsun? Güncel etkinliklere gözat!'} />
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
