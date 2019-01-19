import { ProjectState } from '../reducers';
import { createSelector } from '@ngrx/store';
import { AdminState } from './admin.state';

export const mapAdminState = (state: ProjectState) => state.admin;

export const mapAdminList = (state: AdminState) => state.adminList;
export const getAdminList = createSelector(mapAdminState, mapAdminList);

export const mapIsLoading = (state: AdminState) => state.isLoading;
export const getAdminIsLoading = createSelector(mapAdminState, mapIsLoading);

export const mapError = (state: AdminState) => state.error;
export const getAdminError = createSelector(mapAdminState, mapError);
