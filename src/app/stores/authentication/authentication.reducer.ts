import { cloneObj } from '../../utils/utils-functions';
import { authenticationEmptyState, AuthenticationState } from './authentication.state';
import { AuthenticationAction, authenticationActionTypes } from './authentication.actions';

export function authenticationReducer(state = authenticationEmptyState, action: AuthenticationAction): AuthenticationState {

  switch (action.type) {

    case authenticationActionTypes.AUTHENTICATION_REQUESTED:
      return {
        credentials: action.payload.credentials,
        userToken: null,
        isLoggedIn: false,
        isLoading: true,
        error: null,
      };

    case authenticationActionTypes.AUTHENTICATION_COMPLETED:
      return {
        credentials: state.credentials,
        userToken: action.payload.userToken,
        isLoggedIn: true,
        isLoading: false,
        error: null,
      };

    case authenticationActionTypes.AUTHENTICATION_ERROR:
      return {
        credentials: null,
        userToken: null,
        isLoggedIn: state.isLoggedIn,
        isLoading: false,
        error: action.payload.error,
      };

    case authenticationActionTypes.LOGOUT:
      return {
        credentials: null,
        userToken: null,
        isLoggedIn: false,
        isLoading: false,
        error: null,
      };

    case authenticationActionTypes.AUTHENTICATION_CREATE_USER_REQUESTED:
      return {
        credentials: action.payload.credentials,
        userToken: state.userToken,
        isLoggedIn: state.isLoggedIn,
        isLoading: true,
        error: null,
      };

    case authenticationActionTypes.AUTHENTICATION_CREATE_USER_COMPLETED:
      return {
        credentials: state.credentials,
        userToken: state.userToken,
        isLoggedIn: state.isLoggedIn,
        isLoading: false,
        error: null,
      };

    case authenticationActionTypes.LOGOUT:
      return {
        credentials: null,
        userToken: state.userToken,
        isLoggedIn: state.isLoggedIn,
        isLoading: false,
        error: null,
      };

    case authenticationActionTypes.AUTHENTICATION_RESET:
      return {
        isLoggedIn: state.isLoggedIn,
        ...cloneObj(authenticationEmptyState),
      };

    default:
      return cloneObj(state);
  }

}
