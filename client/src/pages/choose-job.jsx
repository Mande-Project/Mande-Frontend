import Layout from '@/src/components/Layout';
import PrivateRoute from '@/src/components/PrivateRoute';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';

const options = [
  { id: 'programmer-ia', name: 'Programmer IA' },
  { id: 'programmer-web', name: 'Programmer Web' },
  { id: 'programmer-mobile', name: 'Programmer Mobile' },
  { id: 'programmer-desktop', name: 'Programmer Desktop' },
  { id: 'programmer-embedded', name: 'Programmer Embedded' },
  { id: 'programmer-game', name: 'Programmer Game' },
  { id: 'programmer-graphics', name: 'Programmer Graphics' },
  { id: 'programmer-network', name: 'Programmer Network' },
];

const chooseJob = () => {
  const router = useRouter();
  const [jobsChosen, setJobsChosen] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log(jobsChosen);
  }, [jobsChosen]);

  const selectJob = (jobs) => {
    setJobsChosen(jobs);
  };

  const showMessage = () => {
    return (
      <div className='mx-auto my-3 w-full max-w-sm bg-white px-3 py-2 text-center '>
        <p>{message} </p>
      </div>
    );
  };

  const validateButtonJobs = () => {
    return jobsChosen.length === 0 ? 'opacity-50 cursor-not-allowed' : '';
  };

  const onHandleButton = () => {
    console.log('Siuuu');

    // Redirect
    // router.push('/pedidos');

    // Show alert
    Swal.fire('Successfully', 'The jobs was register correctly', 'success');
  };

  return (
    <PrivateRoute>
      <Layout>
        <h1 className='text-2xl font-light text-gray-800'>Choose The Jobs</h1>

        {message && showMessage()}

        <p className='my-2 mt-10 border-l-4 border-gray-800 bg-white p-2 text-sm font-bold text-gray-700'>
          In this part you can choose your o your jobs
        </p>

        <Select
          options={options} //this are the options of the db
          isMulti={true}
          onChange={(option) => selectJob(option)}
          getOptionLabel={(options) => options.name}
          getOptionValue={(options) => options.id}
          placeholder='Select the job or the jobs that you will do'
          noOptionsMessage={() => "There aren't results"}
        />

        <button
          type='button'
          className={` mt-5 w-full bg-gray-800 p-2 font-bold uppercase text-white hover:bg-gray-900 ${validateButtonJobs()} `}
          onClick={() => onHandleButton()}
        >
          Register Jobs
        </button>
      </Layout>
    </PrivateRoute>
  );
};

export default chooseJob;
