import { useRef, useState, useEffect, useCallback } from 'react';

import { sortPlacesByDistance } from './loc';


function App() {

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [parkingSpots, setParkingSpots] = useState([]);

  const getLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchNearbyParking(latitude, longitude);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const fetchNearbyParking = (latitude, longitude) => {
    // Dummy data for nearby parking spots
    const dummyParkingSpots = [
      { id: 1, name: 'Parking Spot 1', lat: latitude + 0.001, lng: longitude + 0.001 },
      { id: 2, name: 'Parking Spot 2', lat: latitude - 0.001, lng: longitude - 0.001 },
      { id: 3, name: 'Parking Spot 3', lat: latitude + 0.002, lng: longitude + 0.002 },
    ];
    setParkingSpots(dummyParkingSpots);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-center">
      <h1 className="text-3xl font-bold mb-6">Nearby Parking Finder</h1>
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition duration-200" 
        onClick={getLiveLocation}
      >
        Get Live Location
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {location && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Your Location</h2>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
      {parkingSpots.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Nearby Parking Spots</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {parkingSpots.map((spot) => (
              <div 
                key={spot.id} 
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200"
              >
                <h3 className="text-xl font-bold">{spot.name}</h3>
                <p>Latitude: {spot.lat}</p>
                <p>Longitude: {spot.lng}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App
