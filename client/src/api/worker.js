import { apiWithoutAutorization } from "../libs/axios";

/* -------------------------------------------------------------------------- */
/*                                    JOBS                                    */
/* -------------------------------------------------------------------------- */

export const getJobasAPI = async (body) => {
  try {
    const res = await apiWithoutAutorization.get("mande_app/jobs/", body)
    const { data } = res
    return data
  } catch (err) {
    console.log(err)
  }
}

export const setJobAPI = async (body) => {
  try {
    const res = await apiWithoutAutorization.post("mande_app/worker_job/", body)
    const { data } = res
    return { type: 'success', message: data };
  } catch (err) {
    const errorResponse = (err.request.response);
    if (errorResponse) {
      return { type: 'error', message: errorResponse };
    }
  }
}

export const deleteJobAPI = async (body) => {
  try {
    const res = await apiWithoutAutorization.delete("mande_app/worker_job/", { data: body })
    const { data } = res
    return { type: 'success', message: data };
  } catch (err) {
    const errorResponse = (err.request.response);
    if (errorResponse) {
      return { type: 'error', message: errorResponse };
    }
  }
}

