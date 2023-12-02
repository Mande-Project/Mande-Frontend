/* eslint-disable react/prop-types */
import { contractServiceAPI, getPeopleJobsAPI } from '@/src/api/services'
import Layout from '@/src/components/Layout'
import PrivateRoute from '@/src/components/PrivateRoute'
import { useAuthStore } from '@/src/store/auth'
import { Badge, Dialog, Flex, Separator } from '@radix-ui/themes'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import * as Yup from 'yup'

const HireWorker = () => {
  const router = useRouter()
  const [user] = useAuthStore((state) => [state.user]);
  const { query } = router
  const [service, setService] = useState({})

  useEffect(() => {
    if (router.query && router.query.pid) {
      const getServices = async () => {
        const { id_worker_job } = router.query
        const res = await getPeopleJobsAPI(user.id);
        const getService = res.filter((service) => service.id_worker_job === parseInt(id_worker_job))[0];
        setService(getService)
      };
      getServices();
    }
  }, [query])

  const formik = useFormik({
    initialValues: {
      hours: '',
      descriptionForm: ''
    }, validationSchema: Yup.object({
      hours: Yup.number()
        .positive('Hours must be positive')
        .required('Hours are required or are bad formatted'),
      descriptionForm: Yup.string()
        .max(200, 'Description must be a maximum of 200 characters')
        .required('Description is required'),
    }),
    onSubmit: async values => {
      handleButtonAccept(values)
    }
  })

  const showBadgeRating = (rating) => {
    if (rating === null) {
      return <Badge color='gray'>Not rated yet</Badge>;
    }
    if (rating >= 4) {
      return <Badge color='green' >Rating: {rating}</Badge>;
    }
    if (rating >= 2) {
      return <Badge color='yellow'>Rating: {rating}</Badge>;
    }
    if (rating >= 0) {
      return <Badge color='red'>Rating: {rating}</Badge>;
    }
  };

  const showDistance = (distance) => {
    const formattedDistance = (parseFloat(distance) / 1000).toFixed(2);
    return formattedDistance;
  };

  const handleButtonAccept = (values) => {
    return (
      <Dialog.Close>
        {Swal.fire({
          title: 'Do you want to hire this service?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Accept',
          cancelButtonText: 'No, Cancel'
        }).then(async (result) => {
          if (result.value) {
            const contractService = async () => {
              const body = {
                id_user: user.id,
                id_worker_job: service.id_worker_job,
                hours: values.hours,
                description: values.descriptionForm
              }
              const res = await contractServiceAPI(body)
              if (res) {
                if (res.type === 'success') {
                  Swal.fire('Hired!', res.message, 'success');
                  router.push('/hire-services')
                } else {
                  Swal.fire('Error!', res.message, 'error');
                }
              }
            }
            contractService()
            // router.push('/hire-services')
          }
        })}
      </Dialog.Close>
    )
  }

  return (
    <PrivateRoute>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Hire Service</h1>


        {Object.keys(service).length === 0 ? <div className='mt-5'>Cargando...</div> : (
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">

              <div className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">

                <h1 className="text-2xl text-gray-800 font-light mb-5 text-center">Information of Service</h1>

                <div className="mb-4 flex justify-between">
                  <label className="block text-gray-700 text-lg  mb-2" >
                    <span className='font-bold'>Job:</span> {service.job.charAt(0).toUpperCase() + service.job.slice(1)}
                  </label>
                  {showBadgeRating(service.rating)}
                </div>

                <div className='flex justify-between'>

                  <div className="mb-4 flex">
                    <label className="block text-gray-700 text-lg  mb-2">
                      <span className='font-bold'>Price: </span>
                      ${service.price}
                    </label>
                  </div>

                  <div className="mb-4 flex">
                    <label className="block text-gray-700 text-lg  mb-2">
                      <span className='font-bold'>Distance: </span>
                      {showDistance(service.distance)} km
                    </label>
                  </div>
                </div>

                <div className="mb-4 flex">
                  <label className="block text-gray-700 text-lg  mb-2">
                    <span className='font-bold'>WorkerName: </span> {service.first_name} {service.last_name}
                  </label>
                </div>

                <div className="mb-4 flex">
                  <label className="block text-gray-700 text-lg  mb-2">
                    <span className='font-bold'>Phone: </span>
                    ${service.phone}
                  </label>
                </div>

                <div className="mb-4 flex">
                  <label className="block text-gray-700 text-lg  mb-2">
                    <span className='font-bold'>Email: </span>
                    {service.email}
                  </label>
                </div>

                <div className="mb-4 flex">
                  <label className="block text-gray-700 text-lg  mb-2">
                    <span className='font-bold'>Description: </span>
                    {service.description}
                  </label>
                </div>

                <Separator my="3" size="4" />

                <form onSubmit={formik.handleSubmit}>
                  <div>

                    <Flex direction='column' gap='3' className='mt-5'>

                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                          Number of hours to be contracted
                        </label>

                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="hours"
                          type="number"
                          min="0"
                          placeholder="Number of Hours"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.hours}
                        />

                        {formik.touched.hours && formik.errors.hours ? (
                          <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.hours}</p>
                          </div>
                        ) : null}
                      </div>


                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                          Description
                        </label>

                        <textarea
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="descriptionForm"
                          type="text"
                          placeholder="Do you want to say something to the woker?"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.descriptionForm}

                        />
                        {formik.touched.descriptionForm && formik.errors.descriptionForm ? (
                          <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.descriptionForm}</p>
                          </div>
                        ) : null}
                      </div>
                    </Flex>
                  </div>


                  <div className='flex gap-5'>
                    <input
                      type="button"
                      className="bg-cyan-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-cyan-900"
                      value="Return"
                      onClick={() => router.push('/hire-services')}
                    />
                    <input
                      type="submit"
                      className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                      value="Contract"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

      </Layout>
    </PrivateRoute >
  )
}

export default HireWorker