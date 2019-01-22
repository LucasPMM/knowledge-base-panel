import { Action } from '@ngrx/store';
import { type } from '../../utils/utils-functions';
import { Credential } from 'app/models/credential';

export const AuthenticationActionTypes = {
  AUTHENTICATION_REQUESTED: type('[Authentication] -Authentication requested-'),
  AUTHENTICATION_COMPLETED: type('[Authentication] -Authentication completed-'),
  AUTHENTICATION_RESET: type('[Authentication] -Authentication reset-'),
  AUTHENTICATION_ERROR: type('[Authentication] -Authentication error-'),

  LOGOUT: type('[Authentication] -Authentication logout-'),
};

export interface AuthenticationPayload {
  credentials?: Credential;
  userToken?: string;
  error?: string | boolean;
}

export class AuthenticationRequestedAction implements Action {
  readonly type = AuthenticationActionTypes.AUTHENTICATION_REQUESTED;
  constructor(public payload?: AuthenticationPayload) { }
}

export class AuthenticationCompletedAction implements Action {
  readonly type = AuthenticationActionTypes.AUTHENTICATION_COMPLETED;
  constructor(public payload?: AuthenticationPayload) { }
}

export class AuthenticationResetAction implements Action {
  readonly type = AuthenticationActionTypes.AUTHENTICATION_RESET;
  constructor(public payload?: AuthenticationPayload) { }
}

export class AuthenticationErrorAction implements Action {
  readonly type = AuthenticationActionTypes.AUTHENTICATION_ERROR;
  constructor(public payload?: AuthenticationPayload) { }
}

export class AuthenticationLogoutAction implements Action {
  readonly type = AuthenticationActionTypes.LOGOUT;
  constructor(public payload?: AuthenticationPayload) { }
}

export type AuthenticationAction =
  | AuthenticationRequestedAction
  | AuthenticationCompletedAction
  | AuthenticationResetAction
  | AuthenticationErrorAction
  | AuthenticationLogoutAction
;

