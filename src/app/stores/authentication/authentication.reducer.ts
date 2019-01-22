import { cloneObj } from '../../utils/utils-functions';
import { authenticationEmptyState, AuthenticationState } from './authentication.state';
import { AuthenticationAction, AuthenticationActionTypes } from './authentication.actions';

export function authenticationReducer(state = authenticationEmptyState, action: AuthenticationAction): AuthenticationState {

  let obj: AuthenticationState = cloneObj(state);

  switch (action.type) {

    case AuthenticationActionTypes.AUTHENTICATION_REQUESTED:
      obj = {
        credentials: action.payload.credentials,
        userToken: null,
        isLoggedIn: false,
        isLoading: true,
        error: null,
      };
      break;

    case AuthenticationActionTypes.AUTHENTICATION_COMPLETED:
      obj = {
        credentials: state.credentials,
        userToken: action.payload.userToken,
        isLoggedIn: true,
        isLoading: false,
        error: null,
      };
      break;

    case AuthenticationActionTypes.AUTHENTICATION_ERROR:
      obj = {
        credentials: null,
        userToken: null,
        isLoggedIn: false,
        isLoading: false,
        error: action.payload.error,
      };
      break;

    case AuthenticationActionTypes.LOGOUT:
      obj = {
        credentials: null,
        userToken: null,
        isLoggedIn: false,
        isLoading: false,
        error: null,
      };
      break;

    case AuthenticationActionTypes.AUTHENTICATION_RESET:
      obj = cloneObj(authenticationEmptyState);
      break;

  }

  return obj;
}
