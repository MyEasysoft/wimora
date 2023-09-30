import { storableError } from '../../util/errors';
// import { salesUserAccount } from '../../util/api';

// ================ Action types ================ //

export const SEO_ACCOUNT_REQUEST =
  'app/SEOPage/SEO_ACCOUNT_REQUEST';
export const SEO_ACCOUNT_SUCCESS =
  'app/SEOPage/SEO_ACCOUNT_SUCCESS';
export const SEO_ACCOUNT_ERROR =
  'app/SEOPage/SEO_ACCOUNT_ERROR';
export const SEO_ACCOUNT_CLEANUP =
  'app/SEOPage/SEO_ACCOUNT_CLEANUP';

export const SEO_ACCOUNT_CLEAR =
  'app/SEOPage/SEO_ACCOUNT_CLEAR';

export const RESET_PASSWORD_REQUEST =
  'app/SEOPage/RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS =
  'app/SEOPage/RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR =
  'app/SEOPage/RESET_PASSWORD_ERROR';

// ================ Reducer ================ //

const initialState = {
  seoError: null,
  seoInProgress: false,
  accountDeleted: false,
  resetPasswordInProgress: false,
  resetPasswordError: null,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SEO_ACCOUNT_REQUEST:
      return {
        ...state,
        seoInProgress: true,
        seoError: null,
        accountDeleted: false,
      };
    case SEO_ACCOUNT_SUCCESS:
      return { ...state, seoInProgress: false, accountDeleted: true };
    case SEO_ACCOUNT_ERROR:
      return {
        ...state,
        seoInProgress: false,
        seoError: payload,
      };

    case SEO_ACCOUNT_CLEAR:
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

export const seoRequest = () => ({ type: SEO_ACCOUNT_REQUEST });
export const seoSuccess = () => ({ type: SEO_ACCOUNT_SUCCESS });
export const seoError = error => ({
  type: SEO_ACCOUNT_ERROR,
  payload: error,
  error: true,
});

export const seoClear = () => ({ type: SEO_ACCOUNT_CLEAR });

export const resetPasswordRequest = () => ({ type: RESET_PASSWORD_REQUEST });

export const resetPasswordSuccess = () => ({ type: RESET_PASSWORD_SUCCESS });

export const resetPasswordError = e => ({
  type: RESET_PASSWORD_ERROR,
  error: true,
  payload: e,
});

// ================ Thunks ================ //

export const seo = params => (dispatch, getState, sdk) => {
  dispatch(seoRequest());
  const { currentPassword } = params;

  return salesUserAccount({ currentPassword })
    .then(() => {
      dispatch(seoSuccess());
      return;
    })
    .catch(e => {
      dispatch(seoError(storableError(storableError(e))));
      // This is thrown so that form can be cleared
      // after a timeout on seo submit handler
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