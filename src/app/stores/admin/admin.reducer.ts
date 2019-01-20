import { cloneObj } from '../../utils/utils-functions';
import { adminEmptyState, AdminState } from './admin.state';
import { AdminAction, AdminActionTypes } from './admin.actions';

export function adminReducer(state = adminEmptyState, action: AdminAction): AdminState {

  let obj: AdminState = cloneObj(state);

  switch (action.type) {

    case AdminActionTypes.ADMIN_REQUESTED:
      obj = {
        adminList: null,
        isLoading: true,
        error: null,
      };
      break;

    case AdminActionTypes.ADMIN_COMPLETED:
      obj = {
        adminList: action.payload.adminList,
        isLoading: false,
        error: null,
      };
      break;

    case AdminActionTypes.ADMIN_ERROR:
      obj = {
        adminList: null,
        isLoading: false,
        error: action.payload.error,
      };
      break;

    case AdminActionTypes.ADMIN_RESET:
      obj = cloneObj(adminEmptyState);
      break;

  }

  return obj;
}
