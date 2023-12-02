import { apiWithoutAutorization } from '../libs/axios';

export const getServicesUser = async (id) => {
  try {
    const res = await apiWithoutAutorization.get(
      `/mande_app/services/?id_user=${id}`,
    );
    const { data } = res;
    return data;
  } catch (err) {
    console.log(err);
  }
}

export const getPeopleJobsAPI = async (id_user) => {
  try {
    const res = await apiWithoutAutorization.get(`/mande_app/worker_job/?id_user=${id_user}`)
    const { data } = res.data
    return data;
  } catch (err) {
    const errorResponse = (err.request.response);
    if (errorResponse) {
      return { type: 'error', message: errorResponse };
    }
  }
}

export const contractServiceAPI = async (body) => {
  try {
    const res = await apiWithoutAutorization.post('mande_app/services/', body
    )
    console.log(res)
    const { data } = res
    return { type: 'success', message: data };
  } catch (err) {
    if (err.request) {
      const errorResponse = (err.request.response);
      if (errorResponse) {
        return { type: 'error', message: errorResponse };
      }
    }
  }
}
