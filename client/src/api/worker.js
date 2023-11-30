import { apiWithoutAutorization } from "../libs/axios";

export const getJobasAPI = async (body) => {
  try {
    const res = await apiWithoutAutorization.get("mande_app/jobs/",body)
    const {data} = res
    return data
  } catch (err) {
    console.log(err)
  }
}

export const setJobAPI = async (body) => {
  try {
    const res = await apiWithoutAutorization.post("mande_app/worker_job/",body)
    const {data} = res
    return data
  } catch (err) {
    const errorResponse = (err.request.response);
    if(errorResponse){
      return { type: 'error', message: errorResponse };
    }
  }
}