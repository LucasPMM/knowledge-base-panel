import { Credential } from 'app/models/credential';

export interface AuthenticationState {
  credentials: Credential;
  userToken: string;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | boolean;
}

export const authenticationEmptyState: AuthenticationState = {
  credentials: null,
  userToken: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};
