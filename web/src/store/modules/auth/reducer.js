import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGNIN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGNIN_SUCCESS': {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGNIN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGNOUT': {
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
