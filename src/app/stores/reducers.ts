import { ActionReducerMap, createSelector } from '@ngrx/store';
import { AdminState } from './admin/admin.state';
import { adminReducer } from './admin/admin.reducer';

export interface ProjectState {
    admin: AdminState;
}

export const reducers: ActionReducerMap<ProjectState> = {
    admin: adminReducer,
};


export const mapApplicationState = (state: ProjectState) => state;
export const getApplicationState = createSelector(mapApplicationState);
