import React, { useEffect, useState } from 'react';
// import { allServices } from '../assets';
import Select from 'react-select';
import { getPeopleJobsAPI } from '../api/services';
import Layout from '../components/Layout';
import PrivateRoute from '../components/PrivateRoute';
import { useAuthStore } from '../store/auth';
// import { v4 as uuidv4 } from 'uuid';
import TableHireServices from '../components/TableHireServices';
import {
  typeFilterByDistance,
  typeFilterByPrice,
  typeFilterByRating,
} from '../utils/typesSelect';

const HireServices = () => {
  const [user] = useAuthStore((state) => [state.user]);
  const [allServices, setAllServices] = useState([]);
  const [distanceFilter, setDistanceFilter] = useState(typeFilterByDistance[0]);
  const [priceFilter, setPriceFilter] = useState(typeFilterByPrice[0]);
  const [ratingFilter, setRatingFilter] = useState(typeFilterByRating[0]);

  useEffect(() => {
    const getServices = async () => {
      const res = await getPeopleJobsAPI(user.id);
      if (res) {
        const filteredServices = res.filter(
          (service) =>
            service.worker_available !== false &&
            service.id_worker !== user.id,
        );
        if (filteredServices.length > 0) {
          setAllServices(filteredServices);
        } else {
          setAllServices([
            {
              message: 'No hay servicios disponibles',
            },
          ]);
        }
      }
    };
    getServices();
  }, []);

  const handleFilterChange = (filterSetter, key) => (selectedOption) => {
    filterSetter(selectedOption);
    if (selectedOption.value !== 'none') {
      const sortedServices = [...allServices].sort((a, b) => {
        return selectedOption.value === 'asc'
          ? a[key] - b[key]
          : b[key] - a[key];
      });
      setAllServices(sortedServices);
    }
  };

  return (
    <PrivateRoute>
      <Layout>
        <h1 className='text-2xl font-light text-gray-800'>Hire Services</h1>
        {allServices && allServices.length === 0 ? (
          <div className='mt-10'>Cargando...</div>
        ) : (
          <>
            {allServices[0].message ? (
              <div className='mt-10'>{allServices[0].message}</div>
            ) : (
              <div className='mt-10 gap-10'>
                <div className='ml-10 mr-10 flex'>
                  <div style={{ width: '30%' }} className='flex flex-col gap-3'>
                    <label htmlFor='distance-filter'>Filer by distance</label>
                    <Select
                      id='distance-filter'
                      options={typeFilterByDistance}
                      isMulti={false}
                      onChange={handleFilterChange(
                        setDistanceFilter,
                        'distance',
                      )}
                      value={distanceFilter}
                      placeholder='Seleccionar distancia'
                      noOptionsMessage={() => 'No hay resultados'}
                    />
                  </div>
                  <div
                    style={{ width: '30%' }}
                    className='ml-5 flex flex-col gap-3'
                  >
                    <label htmlFor='price-filter'>Filer by price</label>
                    <Select
                      id='price-filter'
                      options={typeFilterByPrice}
                      isMulti={false}
                      onChange={handleFilterChange(setPriceFilter, 'price')}
                      value={priceFilter}
                      placeholder='Seleccionar precio'
                      noOptionsMessage={() => 'No hay resultados'}
                    />
                  </div>
                  <div
                    style={{ width: '30%' }}
                    className='ml-5 flex flex-col gap-3'
                  >
                    <label htmlFor='rating-filter'>Filer by rating</label>
                    <Select
                      id='rating-filter'
                      options={typeFilterByRating}
                      isMulti={false}
                      onChange={handleFilterChange(setRatingFilter, 'rating')}
                      value={ratingFilter}
                      placeholder='Seleccionar calificación'
                      noOptionsMessage={() => 'No hay resultados'}
                    />
                  </div>
                </div>
                <TableHireServices allServices={allServices} />
              </div>
            )}
          </>
        )}
      </Layout>
    </PrivateRoute>
  );
};

export default HireServices;
