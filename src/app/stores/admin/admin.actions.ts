import { Action } from '@ngrx/store';
import { type } from '../../utils/utils-functions';
import { FilterAdmins, AdminList, AdminProperties } from 'app/models/admin';

export const AdminActionTypes = {
  ADMIN_REQUESTED: type('[Admin] -Admin requested-'),
  ADMIN_COMPLETED: type('[Admin] -Admin completed-'),
  ADMIN_RESET: type('[Admin] -Admin reset-'),
  ADMIN_ERROR: type('[Admin] -Admin error-'),

  ADMIN_CHANGE_STATUS_REQUESTED: type('[Admin] -Admin change status requested-'),
  ADMIN_CHANGE_STATUS_COMPLETED: type('[Admin] -Admin change status completed-'),
};

export interface AdminPayload {
  adminList?: AdminList;
  indexToChangeStatus?: number;
  adminToChange?: AdminProperties;
  error?: string | boolean;
  filter?: FilterAdmins;
}

export class AdminRequestedAction implements Action {
  readonly type = AdminActionTypes.ADMIN_REQUESTED;
  constructor(public payload?: AdminPayload) { }
}

export class AdminCompletedAction implements Action {
  readonly type = AdminActionTypes.ADMIN_COMPLETED;
  constructor(public payload?: AdminPayload) { }
}

export class AdminResetAction implements Action {
  readonly type = AdminActionTypes.ADMIN_RESET;
  constructor(public payload?: AdminPayload) { }
}

export class AdminChangeStatusRequestedAction implements Action {
  readonly type = AdminActionTypes.ADMIN_CHANGE_STATUS_REQUESTED;
  constructor(public payload?: AdminPayload) { }
}

export class AdminChangeStatusCompletedAction implements Action {
  readonly type = AdminActionTypes.ADMIN_CHANGE_STATUS_COMPLETED;
  constructor(public payload?: AdminPayload) { }
}

export class AdminErrorAction implements Action {
  readonly type = AdminActionTypes.ADMIN_ERROR;
  constructor(public payload?: AdminPayload) { }
}

export type AdminAction =
  | AdminRequestedAction
  | AdminCompletedAction
  | AdminResetAction
  | AdminErrorAction
  | AdminChangeStatusRequestedAction
  | AdminChangeStatusCompletedAction
;

