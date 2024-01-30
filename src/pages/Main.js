import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

let map, maps;

const handleApiLoaded = (mapLoaded, mapsLoaded) => {
  map = mapLoaded;
  maps = mapsLoaded;

  const overlay = new maps.OverlayView();

  overlay.onAdd = function() {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.innerHTML = `
      <div
        style="
          color: white;
          background: red;
          padding: 15px 10px;
          display: inline-flex;
          text-align: center;
          align-items: center;
          justify-content: center;
          border-radius: 100%;
        "
      >
        My Marker
      </div>
    `;

    this.div_ = div;
    const panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
  };

  overlay.draw = function() {
    const position = this.getProjection().fromLatLngToDivPixel(new maps.LatLng(38.884, -94.874));
    const div = this.div_;
    div.style.left = position.x + 'px';
    div.style.top = position.y + 'px';
  };

  overlay.onRemove = function() {
    if (this.div_) {
      this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
    }
  };

  overlay.setMap(map);
};

const Main = () => {
  useEffect(() => {
    const handleResize = () => {
      if (map && maps) {
        const center = map.getCenter();
        maps.event.trigger(map, 'resize');
        map.setCenter(center);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 38.884, lng: -94.874 }}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      />
    </div>
  );
};

export default Main;

 /*
    useEffect(() => {
        // Fetch businesses data from API or database
        // and update the 'businesses' state
        fetchBusinesses();
    }, []);

    const fetchBusinesses = () => {
        // Fetch businesses data from API or database
        // and update the 'businesses' state
        const fetchedBusinesses = [
            {
                id: 1,
                name: 'Business 1',
                location: { lat: 37.7749, lng: -122.4194 },
                gunPolicy: 'Verified',
            },
            {
                id: 2,
                name: 'Business 2',
                location: { lat: 37.7749, lng: -122.4316 },
                gunPolicy: 'User Voted',
            },
            // ... other businesses ...
        ];
        setBusinesses(fetchedBusinesses);
    };
*/