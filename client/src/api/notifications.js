import { apiWithoutAutorization } from '../libs/axios';

export const getNotificationsUser = async (id) => {
  try {
    const res = await apiWithoutAutorization.get(
      `api_notifications/list_filter_user/${id}`,
    );
    const { data } = res;
    return data;
  } catch (err) {
    console.log(err);
  }
};
