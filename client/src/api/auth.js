import { apiWithAutorization, apiWithoutAutorization } from "../libs/axios";
import { useAuthStore } from "../store/auth";

const { loginSuccess, userLoadedSuccess, userLoadedFail, loginFail, authenticatedFail, authenticatedSuccess, logoutUser, signupSuccess, signupFail, } = useAuthStore.getState();

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
    if (err.request && err.request.response && !err.request.response.includes('Bad Request (400)')) {
      const errorResponse = JSON.parse(err.request.response);
      if (errorResponse && errorResponse.detail) {
        const message = errorResponse.detail;
        return { type: 'error', message };
      }
    }
    return { type: 'error', message: 'An error occurred' };
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
      if(err.request.status === 400)
      {
        if(err.request.response){
          if(err.request.response.includes('custom user with this email already exists.')){
            return { type: 'error', message: 'This email already exists' };
          }
          try{
            for (const key in JSON.parse(err.request.response)) {
              return { type: 'error', message: JSON.parse(err.request.response)[key][0] };
            }
          } catch {
            return { type: 'error', message: err.request.response };
          }
        }
        return { type: 'error', message: 'An server error occurred' };
      }
      if (err.request.status === 500) {
        return { type: 'error', message: 'A server error ocurred' };
      }
      const errorResponse = JSON.parse(err.request.response);

      if (errorResponse) {
        const firstErrorKey = Object.keys(errorResponse)[0];

        if (firstErrorKey && Array.isArray(errorResponse[firstErrorKey])) {
          const firstErrorMessage = errorResponse[firstErrorKey][0];
          const message = `Error ${firstErrorKey}: ${firstErrorMessage}`;
          return { type: 'error', message };
        } else {
          console.error('Error response in an undexpected format');
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
    // activationSucess()
    return { type: 'success', message: 'User was activated' }
  } catch (err) {
    // activationFail()
    if (err.response.data.detail) {
      const message = err.response.data.detail;
      return { type: 'error', message };
    }
    const message = `An error ocurred`;
    return { type: 'error', message };
  }
}

export const logout = async () => {
  logoutUser()
}