import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AnimatePresence, motion } from 'framer-motion';

import styles from './EventList.module.scss';

import EventItem from './EventItem';

function EventList({ events, fetchMore, dataLength }) {
  return (
    <motion.div className={`${styles.eventList}`}>
      {events && (
        <InfiniteScroll
          dataLength={events.length}
          hasMore={events.length < dataLength}
          next={fetchMore}
          endMessage={null}
          loader={
            <div>
              <span>Yükleniyor..</span>
            </div>
          }
          className={styles.infiniteScroll}
        >
          <AnimatePresence>
            {events.map((event, index) => (
              <EventItem key={event._id} event={event} />
            ))}
          </AnimatePresence>
        </InfiniteScroll>
      )}
    </motion.div>
  );
}

export default EventList;
