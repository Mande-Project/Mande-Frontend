/* eslint-disable react/prop-types */
import { workers } from '@/src/assets'
import Layout from '@/src/components/Layout'
import PrivateRoute from '@/src/components/PrivateRoute'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import * as Yup from 'yup'

const EditWorker = () => {
  const router = useRouter()
  const { query } = router
  const [worker, setWorker] = useState({})

  useEffect(() => {
    if (router.query && router.query.pid) {
      const { pid } = router.query
      const getWorker = workers.filter(worker => worker.id === parseInt(pid))[0]
      setWorker(getWorker)
    }
  }, [query])

  // Schema de validacion
  const schemaValidacion = Yup.object({
    name: Yup.string()
      .required('El name del cliente es obligatorio'),
    company: Yup.string()
      .required('El campo company  es obligatorio'),
    email: Yup.string()
      .email('Email no válido')
      .required('El email del cliente es obligatorio')
  });

  // eslint-disable-next-line no-unused-vars
  const actualizarInfoCliente = async valores => {
    // const { name, company, email, phone } = valores;

    try {

      // Mostrar Alerta
      Swal.fire(
        'Actualizado',
        'El cliente se actualizó correctamente',
        'success'
      )

      // Redireccionar
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <PrivateRoute>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Edit Worker</h1>

        {Object.keys(worker).length !== 0 && (
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">

              <Formik
                validationSchema={schemaValidacion}
                enableReinitialize
                initialValues={worker}
                onSubmit={(values) => {
                  actualizarInfoCliente(values)
                }}
              >

                {props => {
                  return (
                    <form
                      className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                      onSubmit={props.handleSubmit}
                    >
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                          name
                        </label>

                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          type="text"
                          placeholder="name Cliente"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.name}
                        />
                      </div>

                      {props.touched.name && props.errors.name ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                          <p className="font-bold">Error</p>
                          <p>{props.errors.name}</p>
                        </div>
                      ) : null}


                      {props.touched.apellido && props.errors.apellido ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                          <p className="font-bold">Error</p>
                          <p>{props.errors.apellido}</p>
                        </div>
                      ) : null}


                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                          company
                        </label>

                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="company"
                          type="text"
                          placeholder="company Cliente"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.company}
                        />
                      </div>

                      {props.touched.company && props.errors.company ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                          <p className="font-bold">Error</p>
                          <p>{props.errors.company}</p>
                        </div>
                      ) : null}

                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                          Email
                        </label>

                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="email"
                          type="email"
                          placeholder="Email Cliente"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.email}
                        />
                      </div>

                      {props.touched.email && props.errors.email ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                          <p className="font-bold">Error</p>
                          <p>{props.errors.email}</p> 
                        </div>
                      ) : null}

                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                          Teléfono
                        </label>

                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="phone"
                          type="tel"
                          placeholder="Teléfono Cliente"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.phone}
                        />
                      </div>

                      <input
                        type="submit"
                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                        value="Editar Cliente"
                      />
                    </form>
                  )
                }}
              </Formik>
            </div>
          </div>
        )}

      </Layout>
    </PrivateRoute>
  )
}

export default EditWorker