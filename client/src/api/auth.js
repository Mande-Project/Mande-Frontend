import { apiWithAutorization, apiWithoutAutorization } from "../libs/axios";
import { useAuthStore } from "../store/auth";

const { loginSuccess, userLoadedSuccess, userLoadedFail, loginFail, authenticatedFail, authenticatedSuccess, logoutUser, signupSuccess, signupFail, activationSucess, activationFail } = useAuthStore.getState();

export const checkAuthenticated = async (access) => {

  if (access) {
    const body = JSON.stringify({ token: access })
    try {
      const res = await apiWithoutAutorization.post("api_users/auth/jwt/verify/", body)

      if (res.data.code !== 'token_not_valid') {
        authenticatedSuccess()
      } else {
        authenticatedFail()
      }
    } catch (error) {
      authenticatedFail()
    }
  } else {
    authenticatedFail()
  }
}

export const load_user = async (access) => {
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
    const access = res.data.access
    load_user(access)
    return { type: 'success', message: 'Accessing...' }
  } catch (err) {
    loginFail()
    const message = JSON.parse(err.request.response).detail;
    return { type: 'error', message };
  }
}


export const signupRequest = async (body) => {
  try {
    const res = await apiWithoutAutorization.post("api_users/users/", body)
    signupSuccess(res.data)
    return { type: 'success', message: 'Please check your email...' }
  } catch (err) {
    signupFail()
    try {
      const errorResponse = JSON.parse(err.request.response);

      if (errorResponse) {
        const firstErrorKey = Object.keys(errorResponse)[0];

        if (firstErrorKey && Array.isArray(errorResponse[firstErrorKey])) {
          const firstErrorMessage = errorResponse[firstErrorKey][0];
          const message = `Error ${firstErrorKey}: ${firstErrorMessage}`;
          return { type: 'error', message };
        } else {
          console.error('Error response in an undexpected formar');
        }
      } else {
        console.error('Empty error response');
      }
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
    }
  }
}

export const verify = async (uid, token) => {
  const body = JSON.stringify({ uid, token })
  try {
    await apiWithoutAutorization.post("api_users/auth/users/activation/", body)
    activationSucess()
    return { type: 'success', message: 'The user was activated' }
  } catch (err) {
    activationFail()
    const message = `An error ocurred`;
    // console.log(err)
    return { type: 'error', message };
  }
}

export const logout = async () => {
  logoutUser()
}