import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { 
  AdminErrorAction,
  AdminCompletedAction,
  AdminActionTypes,
  AdminRequestedAction,
  AdminAction,
  AdminPayload,
} from './admin.actions';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { AdminService } from 'app/providers/admin/admin.service';
import { AdminList } from 'app/models/admin';

@Injectable()
export class AdminEffects {


  @Effect()
  adminListRequested$: Observable<AdminCompletedAction | AdminErrorAction> = this.actions$
  .pipe(
    ofType<AdminRequestedAction>(AdminActionTypes.ADMIN_REQUESTED),
    map((action: AdminAction) => action.payload),
      switchMap((payload: AdminPayload) =>
        from(this.adminService.getAdminList())
          .pipe(
            map((adminList: AdminList) => {
              return new AdminCompletedAction({ adminList });
            }),
            catchError(error => {
              return of(new AdminErrorAction({ error }));
            }),
          ),
        ),
    );

  constructor(
    private actions$: Actions,
    private adminService: AdminService,
  ) {}

}
