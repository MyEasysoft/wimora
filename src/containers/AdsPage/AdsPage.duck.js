import { storableError } from '../../util/errors';
// import { deleteUserAccount } from '../../util/api';

// ================ Action types ================ //

export const DELETE_ACCOUNT_REQUEST =
  'app/AdsPage/DELETE_ACCOUNT_REQUEST';
export const DELETE_ACCOUNT_SUCCESS =
  'app/AdsPage/DELETE_ACCOUNT_SUCCESS';
export const DELETE_ACCOUNT_ERROR =
  'app/AdsPage/DELETE_ACCOUNT_ERROR';
export const DELETE_ACCOUNT_CLEANUP =
  'app/AdsPage/DELETE_ACCOUNT_CLEANUP';

export const DELETE_ACCOUNT_CLEAR =
  'app/AdsPage/DELETE_ACCOUNT_CLEAR';

export const RESET_PASSWORD_REQUEST =
  'app/AdsPage/RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS =
  'app/AdsPage/RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR =
  'app/AdsPage/RESET_PASSWORD_ERROR';

// ================ Reducer ================ //

const initialState = {
  adsError: null,
  adsInProgress: false,
  accountDeleted: false,
  resetPasswordInProgress: false,
  resetPasswordError: null,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        adsInProgress: true,
        adsError: null,
        accountDeleted: false,
      };
    case DELETE_ACCOUNT_SUCCESS:
      return { ...state, adsInProgress: false, accountDeleted: true };
    case DELETE_ACCOUNT_ERROR:
      return {
        ...state,
        adsInProgress: false,
        adsError: payload,
      };

    case DELETE_ACCOUNT_CLEAR:
      return { ...initialState };

    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPasswordInProgress: true,
        resetPasswordError: null,
      };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, resetPasswordInProgress: false };
    case RESET_PASSWORD_ERROR:
      console.error(payload); // eslint-disable-line no-console
      return {
        ...state,
        resetPasswordInProgress: false,
        resetPasswordError: payload,
      };

    default:
      return state;
  }
}

// ================ Action creators ================ //

export const adsRequest = () => ({ type: DELETE_ACCOUNT_REQUEST });
export const adsSuccess = () => ({ type: DELETE_ACCOUNT_SUCCESS });
export const adsError = error => ({
  type: DELETE_ACCOUNT_ERROR,
  payload: error,
  error: true,
});

export const adsClear = () => ({ type: DELETE_ACCOUNT_CLEAR });

export const resetPasswordRequest = () => ({ type: RESET_PASSWORD_REQUEST });

export const resetPasswordSuccess = () => ({ type: RESET_PASSWORD_SUCCESS });

export const resetPasswordError = e => ({
  type: RESET_PASSWORD_ERROR,
  error: true,
  payload: e,
});

// ================ Thunks ================ //

export const ads = params => (dispatch, getState, sdk) => {
  dispatch(adsRequest());
  const { currentPassword } = params;

  return deleteUserAccount({ currentPassword })
    .then(() => {
      dispatch(adsSuccess());
      return;
    })
    .catch(e => {
      dispatch(adsError(storableError(storableError(e))));
      // This is thrown so that form can be cleared
      // after a timeout on ads submit handler
      throw e;
    });
};

export const resetPassword = email => (dispatch, getState, sdk) => {
  dispatch(resetPasswordRequest());
  return sdk.passwordReset
    .request({ email })
    .then(() => dispatch(resetPasswordSuccess()))
    .catch(e => dispatch(resetPasswordError(storableError(e))));
};