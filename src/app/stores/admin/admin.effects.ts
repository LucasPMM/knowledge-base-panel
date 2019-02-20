import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  AdminErrorAction,
  AdminCompletedAction,
  adminActionTypes,
  AdminRequestedAction,
  AdminAction,
  AdminPayload,
  AdminChangeStatusCompletedAction,
  AdminChangeStatusRequestedAction,
} from './admin.actions';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { AdminService } from 'app/providers/admin/admin.service';
import { AdminList } from 'app/models/admin';
import { Router } from '@angular/router';

@Injectable()
export class AdminEffects {

  @Effect()
  adminListRequested$: Observable<AdminCompletedAction | AdminErrorAction> = this.actions$
  .pipe(
    ofType<AdminRequestedAction>(adminActionTypes.ADMIN_REQUESTED),
    map((action: AdminAction) => action.payload),
    switchMap((payload: AdminPayload) =>
        from(this.adminService.getAdminList())
          .pipe(
            map((adminList: AdminList) => {
              return new AdminCompletedAction({ adminList });
            }),
            catchError((error) => {
              return of(new AdminErrorAction({ error }));
            }),
          ),
        ),
    );

  @Effect()
  adminChangeStatusRequested$: Observable<AdminChangeStatusCompletedAction | AdminErrorAction> = this.actions$
  .pipe(
    ofType<AdminChangeStatusRequestedAction>(adminActionTypes.ADMIN_CHANGE_STATUS_REQUESTED),
    map((action: AdminAction) => action.payload),
    switchMap((payload: AdminPayload) =>
        from(this.adminService.changeStatus(payload.adminToChange, payload.indexToChangeStatus))
          .pipe(
            map((adminList: AdminList) => {
              console.log('a nova adminList', adminList);
              return new AdminChangeStatusCompletedAction({ adminList });
            }),
            catchError((error) => {
              return of(new AdminErrorAction({ error }));
            }),
          ),
        ),
    );

  constructor(
    private actions$: Actions,
    private router: Router,
    private adminService: AdminService,
  ) {}

}
