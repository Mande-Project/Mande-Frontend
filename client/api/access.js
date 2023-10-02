import { accessApi } from ".";

export const registerClient = (body) => 
  accessApi.post('customer_register/', body)

export const registerWorker = (body) =>
  accessApi.post('worker_register/', body)

export const loginClient = (body) => 
  accessApi.post('customer_login/', body)

export const loginWorker = (body) =>
  accessApi.post('worker_login/', body)

// export const getCar = (id) => path.get(`vehicle/${id}`);

// export const getCarByColor = (id, vehicle, color) =>
//   path.get(`sucursal/${id}/${vehicle}/${color}/vehicle-sucursal-id/`);