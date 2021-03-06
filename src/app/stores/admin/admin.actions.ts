import { Action } from '@ngrx/store';
import { type } from '../../utils/utils-functions';
import { FilterAdmins, AdminList } from 'app/models/admin';

export const AdminActionTypes = {
  ADMIN_REQUESTED: type('[Admin] -Admin requested-'),
  ADMIN_COMPLETED: type('[Admin] -Admin completed-'),
  ADMIN_RESET: type('[Admin] -Admin reset-'),
  ADMIN_ERROR: type('[Admin] -Admin error-'),
};

export interface AdminPayload {
  adminList?: AdminList;
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

export class AdminErrorAction implements Action {
  readonly type = AdminActionTypes.ADMIN_ERROR;
  constructor(public payload?: AdminPayload) { }
}

export type AdminAction =
  | AdminRequestedAction
  | AdminCompletedAction
  | AdminResetAction
  | AdminErrorAction
;

