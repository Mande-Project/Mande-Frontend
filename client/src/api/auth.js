import { apiWithAutorization, apiWithoutAutorization } from "../libs/axios";
import { useAuthStore } from "../store/auth";

const { loginSuccess, userLoadedSuccess, userLoadedFail, loginFail } = useAuthStore.getState();

export const load_user = async () => {
  const access = useAuthStore.getState().access
  if (access) {
    try {
      const res = await apiWithAutorization.get("api_users/users/me/")
      userLoadedSuccess(res.data)
    } catch (err) {
      userLoadedFail()
    }
  } else {
    userLoadedFail()
  }
}

export const loginRequest = async (body) => {
  try {
    const res = await apiWithoutAutorization.post("api_users/auth/jwt/create/", body)
    loginSuccess(res.data)
    load_user()
    return { type: 'success', message:'Accessing...' }
  } catch (err) {
    loginFail()
    const message = JSON.parse(err.request.response).detail;
    return { type: 'error', message };
  }
}
