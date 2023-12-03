import React from "react";
import Service from "./Service";
import PropTypes from "prop-types";

const TableHireServices = ({ allServices }) => {
  return (
    <div className='overflow-x-scroll'>
      <table className='w-lg mt-8 table w-full shadow-md'>
        <thead className='bg-gray-800'>
          <tr className='text-white'>
            <th style={{ width: '15%' }} className='py-2'>
              Job
            </th>
            <th style={{ width: '20%' }} className='py-2'>
              Worker Name
            </th>
            <th style={{ width: '20%' }} className='py-2'>
              Distance
            </th>
            <th style={{ width: '20%' }} className='py-2'>
              Price
            </th>
            <th style={{ width: '10%' }} className='py-2'>
              Rating
            </th>
            <th style={{ width: '15%' }} className='py-2'>
              Options
            </th>
          </tr>
        </thead>

        <tbody className='bg-white'>
          {allServices.map((service) => (
            <Service key={service.id_worker_job} service={service} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableHireServices;

TableHireServices.propTypes = {
  allServices: PropTypes.array.isRequired,
};
