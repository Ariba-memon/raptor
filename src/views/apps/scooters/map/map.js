import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFwdG9yLTEiLCJhIjoiY20xOGJrcHByMTAybjJqc2p4ZDBoZ3E5MCJ9.2SL4IxH_tpzK5F7udefkCQ';

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/examples/cke97f49z5rlg19l310b7uu7j',
      center: [41, 21],
      zoom: 3
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return <div id="map" ref={mapContainerRef} style={{ height: '100%' }}></div>;
};

export default MapboxExample;