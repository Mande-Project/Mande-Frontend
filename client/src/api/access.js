import { accessApi, baseApi } from ".";

export const registerClient = (body) => 
  accessApi.post('customer_register/', body)

export const registerWorker = (body) =>
  accessApi.post('worker_register/', body)

export const loginClient = (body) => 
  accessApi.post('customer_login/', body)

export const loginWorker = (body) =>
  accessApi.post('worker_login/', body)

export const logoutUser = () =>
  accessApi.post('logout/')

export const testSession = () =>
  baseApi.get()