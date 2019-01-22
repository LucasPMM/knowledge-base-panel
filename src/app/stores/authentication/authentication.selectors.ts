import { AppState } from '../reducers';
import { createSelector } from '@ngrx/store';
import { AuthenticationState } from './authentication.state';

export const mapAuthenticationState = (state: AppState) => state.authentication;

export const mapUserCredentials = (state: AuthenticationState) => state.credentials;
export const getUserCredentials = createSelector(mapAuthenticationState, mapUserCredentials);

export const mapUserToken = (state: AuthenticationState) => state.userToken;
export const getUserToken = createSelector(mapAuthenticationState, mapUserToken);

export const mapIsLoggedIn = (state: AuthenticationState) => state.isLoggedIn;
export const getIsLoggedIn = createSelector(mapAuthenticationState, mapIsLoggedIn);

export const mapIsLoading = (state: AuthenticationState) => state.isLoading;
export const getAuthIsLoading = createSelector(mapAuthenticationState, mapIsLoading);

export const mapError = (state: AuthenticationState) => state.error;
export const getAuthError = createSelector(mapAuthenticationState, mapError);
