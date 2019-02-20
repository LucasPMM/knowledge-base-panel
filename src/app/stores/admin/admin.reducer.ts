import { cloneObj } from '../../utils/utils-functions';
import { adminEmptyState, AdminState } from './admin.state';
import { AdminAction, AdminActionTypes } from './admin.actions';
import { AdminProperties } from 'app/models/admin';

export function adminReducer(state = adminEmptyState, action: AdminAction): AdminState {

  switch (action.type) {

    case AdminActionTypes.ADMIN_REQUESTED:
      return {
        adminList: null,
        isLoading: true,
        error: null,
      };

    case AdminActionTypes.ADMIN_COMPLETED:
      return {
        adminList: action.payload.adminList,
        isLoading: false,
        error: null,
      };

    case AdminActionTypes.ADMIN_ERROR:
      return {
        adminList: null,
        isLoading: false,
        error: action.payload.error,
      };

    case AdminActionTypes.ADMIN_CHANGE_STATUS_REQUESTED:
      return {
        adminList: state.adminList,
        isLoading: true,
        error: null,
      };

    case AdminActionTypes.ADMIN_CHANGE_STATUS_COMPLETED:
      return {
        adminList: action.payload.adminList,
        isLoading: false,
        error: null,
      };

    case AdminActionTypes.ADMIN_RESET:
      return {...cloneObj(adminEmptyState), adminList: state.adminList};

    default:
      return cloneObj(state);
  }

}
