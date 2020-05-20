export function signInRequest(email, password) {
  return {
    type: '@auth/SIGNIN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGNIN_SUCCESS',
    payload: { token, user },
  };
}

export function signInFailure() {
  return {
    type: '@auth/SIGNIN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGNOUT',
  };
}
