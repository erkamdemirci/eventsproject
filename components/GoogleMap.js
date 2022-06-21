import React from 'react';
import GoogleMapReact from 'google-map-react';

import styles from './GoogleMap.module.scss';
import LocationIcon from '../assets/icons/location-icon';

const EventSlider = ({ coordinates, locationName }) => {
  return (
    <div className={styles.map}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_KEY }}
        defaultCenter={{
          lat: parseFloat(coordinates.lat),
          lng: parseFloat(coordinates.lng)
        }}
        defaultZoom={13}
      >
        <div className={styles.marker} lat={parseFloat(coordinates.lat)} lng={parseFloat(coordinates.lng)}>
          <div className={styles.dot}>
            <div />
          </div>
          <span className={styles.markerText}>{locationName}</span>
        </div>
      </GoogleMapReact>
    </div>
  );
};

export default EventSlider;
