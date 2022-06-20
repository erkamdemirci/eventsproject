import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './EventList.module.scss';

import EventItem from './EventItem';

function EventList({ events, fetchMore, dataLength }) {
  return (
    <div className={`container ${styles.eventList}`}>
      {events && (
        <InfiniteScroll
          dataLength={events.length}
          hasMore={events.length < dataLength}
          next={fetchMore}
          endMessage={null}
          loader={
            <div>
              {/* <SpinnerIcon classes={' w-8 h-8 text-gray-200 animate-spin dark:text-gray-200 fill-red-600'} />
              <span className="text-red-400 text-lg font-['SanomatSansMedium']">Yükleniyor...</span> */}
              <span>Yükleniyor..</span>
            </div>
          }
          className={styles.infiniteScroll}
          // className="container mx-auto w-full flex flex-wrap"
        >
          {events.map((event, index) => (
            <EventItem key={event._id} event={event} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default EventList;
