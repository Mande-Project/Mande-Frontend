import Layout from '@/src/components/Layout';
import PrivateRoute from '@/src/components/PrivateRoute';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getJobasAPI, setJobAPI } from '../api/worker';
import { useAuthStore } from '../store/auth';
import { toast } from 'react-toastify';
import { renderToast } from '../components/Toast';

const chooseJob = () => {
  const [user] = useAuthStore((state) => [state.user]);
  const [jobsChosen, setJobsChosen] = useState([]);
  const [message, setMessage] = useState(null);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getOptions = async () => {
      const res = await getJobasAPI();
      const { data } = res;
      setOptions(data);
    };
    getOptions();
  }, []);

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
    return jobsChosen.length === 0 ||
      price === '0' ||
      price === '' ||
      description === ''
      ? 'opacity-50 cursor-not-allowed'
      : '';
  };

  const validateValues = () => {
    if (parseInt(price) <= 0) {
      setMessage('The price must be greater than 0');
      setTimeout(() => {
        setMessage(null);
      }, 8000);
      return false;
    }
    if (
      jobsChosen.length !== 0 &&
      price !== '0' &&
      price !== '' &&
      description !== '' &&
      user.id !== null
    ) {
      return true;
    }

    return false;
  };

  const getValues = () => {
    const auxPrice = parseInt(price);
    const values = {
      id_user: user.id,
      id_job: jobsChosen,
      price: auxPrice,
      description,
    };
    return values
  };

  const onHandleButton = async () => {
    if (validateValues()) {
      const id = toast.loading('Loading...');
      const res = await setJobAPI(getValues())
      console.log(res)
      if(res){
        renderToast(id, res.type, res.message, () => {});
      }
    }
    // Swal.fire('Successfully', 'The jobs was register correctly', 'success');
  };

  return (
    <PrivateRoute>
      <Layout>
        <h1 className='text-2xl font-light text-gray-800'>Choose The Jobs</h1>

        {message && showMessage()}

        <div className='mb-6 mt-6'>
          <span className='border-l-4 border-gray-800 bg-white p-2 text-sm font-bold text-gray-700'>
            In this part you can choose your jobs with the price that you want
          </span>
        </div>

        <div>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='job'
          >
            Job
          </label>

          <Select
            options={options} //this are the options of the db
            isMulti={false}
            onChange={(option) => selectJob(option.id)}
            getOptionLabel={(options) => options.name}
            getOptionValue={(options) => options.id}
            placeholder='Select the job or the jobs that you will do'
            noOptionsMessage={() => "There aren't results"}
          />
        </div>

        <div className='my-4'>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='hours'
          >
            Price
          </label>

          <input
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
            id='hours'
            type='number'
            placeholder='Number of Hours'
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className='my-4'>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='description'
          >
            Description
          </label>

          <input
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
            id='description'
            type='text'
            placeholder='Description'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

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
