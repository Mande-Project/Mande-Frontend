import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const libraries = ['places'];

function GoogleMaps({onAddressSelect}) {
  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(14);
  const [center, setCenter] = useState({ lat: 3.3762086186584437, lng: -76.53338569444767 });
  const [userInput, setUserInput] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [defaultMarkerPosition, setDefaultMarkerPosition] = useState(null);
  const isInitialMount = useRef(true);

  const handlePlaceSelect = (place) => {
    if (!place.geometry) {
      console.error('No se encontraron detalles para esta ubicación');
      return;
    }
    setUserInput(place.formatted_address);
    setCenter({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    setSelectedAddress(place.formatted_address);
    setSelectedLocation({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
  };

  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    reverseGeocode(event.latLng);
    setDefaultMarkerPosition(null);
  };

  function pluscodeToDirection(codigoPlus) {
    const geocoder = new window.google.maps.Geocoder();
  
    geocoder.geocode({ placeId: codigoPlus }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const addressComponents = results[0].address_components;
          let direccion = '';
          let ciudad = '';
          let pais = '';
  
          // Recorre los componentes de dirección y extrae la información necesaria
          addressComponents.forEach(component => {
            if (component.types.includes('route')) {
              direccion = component.long_name + direccion;
            } else if (component.types.includes('transit_station')) {
                direccion = component.long_name;
            }
            if (component.types.includes('street_number')) {
                direccion = ` #${component.long_name}`;
            }
            if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
              ciudad = component.long_name;
            }
            if (component.types.includes('country')) {
              pais = component.long_name;
            }
          });
  
          const direccionCompleta = `${direccion}, ${ciudad}, ${pais}`;
            return direccionCompleta;
        } else {
          console.error('No se encontró ninguna dirección para este código plus');
        }
      } else {
        console.error('Error en la geocodificación inversa:', status);
      }
    });
  }

  const reverseGeocode = (latLng) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const addressComponents = results[0].address_components;
          let direccion = '';
          let ciudad = '';
          let pais = '';
          addressComponents.forEach(component => {
            if (component.types.includes('route')) {
              direccion = component.long_name + direccion;
            } else if (component.types.includes('transit_station')) {
                direccion = component.long_name;
            } else if (component.types.includes('neighborhood')) {
                direccion = component.long_name;
            }
            if (component.types.includes('street_number')) {
                if(component.long_name[0] === '#'){
                    direccion = ` ${component.long_name}`;
                } else {
                    direccion = ` #${component.long_name}`;
                }
            }
            if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
              ciudad = component.long_name;
            }
            if (component.types.includes('country')) {
              pais = component.long_name;
            }
            if (component.types.includes('plus_code')) {
                direccion = pluscodeToDirection(component.long_name);
                setSelectedAddress(direccion);
                setUserInput(direccion);
                return ;
            }
          });
  
          const direccionCompleta = `${direccion}, ${ciudad}, ${pais}`;
          setSelectedAddress(direccionCompleta);
          setUserInput(direccionCompleta);
        } else {
          console.error('No se encontró ninguna dirección para estas coordenadas');
        }
      } else {
        console.error('Error en la geocodificación inversa:', status);
      }
    });
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setDefaultMarkerPosition(center);
    } else {
      onAddressSelect(selectedAddress);
    }
  }, [selectedAddress, onAddressSelect]);

  useEffect(() => {
    if (map) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        { types: ['geocode'],
          componentRestrictions: { country: 'CO' }
        }
      );

      autocomplete.bindTo('bounds', map);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        handlePlaceSelect(place);
      });

      map.addListener('click', handleMapClick);
    }
  }, [map]);

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_URL}
      libraries={libraries}
    >
        <div style={{ flex: 1 }}>
            <label
                className='mb-2 block text-sm font-bold text-gray-700'
            >
                Residence Address
            </label>
          <input
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
            id="autocomplete"
            type="text"
            placeholder="Write your address"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '300px' }}
            zoom={zoom}
            center={center}
            onLoad={(map) => setMap(map)}
          >
            {defaultMarkerPosition && (
              <Marker
                position={defaultMarkerPosition}
                draggable={true}
                onDragEnd={(event) => {
                  setSelectedLocation({
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                  });
                  reverseGeocode(event.latLng);
                }}
              />
            )}
            {selectedLocation && (
              <Marker
                position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                draggable={true}
                onDragEnd={(event) => {
                  setSelectedLocation({
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                  });
                }}
              />
            )}
          </GoogleMap>
        </div>
    </LoadScript>
  );
}

export default GoogleMaps;
