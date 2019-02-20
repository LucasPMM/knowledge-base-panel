import { cloneObj } from '../../utils/utils-functions';
import { authenticationEmptyState, AuthenticationState } from './authentication.state';
import { AuthenticationAction, AuthenticationActionTypes } from './authentication.actions';

export function authenticationReducer(state = authenticationEmptyState, action: AuthenticationAction): AuthenticationState {

  switch (action.type) {

    case AuthenticationActionTypes.AUTHENTICATION_REQUESTED:
      return {
        credentials: action.payload.credentials,
        userToken: null,
        isLoggedIn: false,
        isLoading: true,
        error: null,
      };

    case AuthenticationActionTypes.AUTHENTICATION_COMPLETED:
      return {
        credentials: state.credentials,
        userToken: action.payload.userToken,
        isLoggedIn: true,
        isLoading: false,
        error: null,
      };

    case AuthenticationActionTypes.AUTHENTICATION_ERROR:
      return {
        credentials: null,
        userToken: null,
        isLoggedIn: state.isLoggedIn,
        isLoading: false,
        error: action.payload.error,
      };

    case AuthenticationActionTypes.LOGOUT:
      return {
        credentials: null,
        userToken: null,
        isLoggedIn: false,
        isLoading: false,
        error: null,
      };

    case AuthenticationActionTypes.AUTHENTICATION_CREATE_USER_REQUESTED:
      return {
        credentials: action.payload.credentials,
        userToken: state.userToken,
        isLoggedIn: state.isLoggedIn,
        isLoading: true,
        error: null,
      };


    case AuthenticationActionTypes.AUTHENTICATION_CREATE_USER_COMPLETED:
      return {
        credentials: state.credentials,
        userToken: state.userToken,
        isLoggedIn: state.isLoggedIn,
        isLoading: false,
        error: null,
      };

    case AuthenticationActionTypes.LOGOUT:
      return {
        credentials: null,
        userToken: state.userToken,
        isLoggedIn: state.isLoggedIn,
        isLoading: false,
        error: null,
      };

    case AuthenticationActionTypes.AUTHENTICATION_RESET:
      return {
        isLoggedIn: state.isLoggedIn,
        ...cloneObj(authenticationEmptyState),
      };

    default:
      return cloneObj(state);
  }

}
