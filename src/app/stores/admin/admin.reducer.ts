import { cloneObj } from '../../utils/utils-functions';
import { adminEmptyState, AdminState } from './admin.state';
import { AdminAction, adminActionTypes } from './admin.actions';

export function adminReducer(state = adminEmptyState, action: AdminAction): AdminState {

  switch (action.type) {

    case adminActionTypes.ADMIN_REQUESTED:
      return {
        adminList: null,
        isLoading: true,
        error: null,
      };

    case adminActionTypes.ADMIN_COMPLETED:
      return {
        adminList: action.payload.adminList,
        isLoading: false,
        error: null,
      };

    case adminActionTypes.ADMIN_ERROR:
      return {
        adminList: null,
        isLoading: false,
        error: action.payload.error,
      };

    case adminActionTypes.ADMIN_CHANGE_STATUS_REQUESTED:
      return {
        adminList: state.adminList,
        isLoading: true,
        error: null,
      };

    case adminActionTypes.ADMIN_CHANGE_STATUS_COMPLETED:
      return {
        adminList: action.payload.adminList,
        isLoading: false,
        error: null,
      };

    case adminActionTypes.ADMIN_RESET:
      return { ...cloneObj(adminEmptyState), adminList: state.adminList };

    default:
      return cloneObj(state);
  }

}
