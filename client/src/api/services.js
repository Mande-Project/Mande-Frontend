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
};