import { ActionReducerMap, createSelector } from '@ngrx/store';
import { AdminState } from './admin/admin.state';
import { adminReducer } from './admin/admin.reducer';
import { AuthenticationState } from './authentication/authentication.state';
import { authenticationReducer } from './authentication/authentication.reducer';

export interface AppState {
    admin: AdminState;
    authentication: AuthenticationState;
}

export const reducers: ActionReducerMap<AppState> = {
    admin: adminReducer,
    authentication: authenticationReducer,
};


export const mapApplicationState = (state: AppState) => state;
export const getApplicationState = createSelector(mapApplicationState);
