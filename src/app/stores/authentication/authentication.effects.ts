import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  AuthenticationErrorAction,
  AuthenticationCompletedAction,
  authenticationActionTypes,
  AuthenticationRequestedAction,
  AuthenticationAction,
  AuthenticationPayload,
  AuthenticationCreateUserCompletedAction,
  AuthenticationCreateUserRequestedAction,
  AuthenticationAddUserAction,
} from './authentication.actions';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { AuthService } from 'app/providers/auth/auth.service';
import { Router } from '@angular/router';
import { AdminService } from 'app/providers/admin/admin.service';
import { AdminList } from 'app/models/admin';

@Injectable()
export class AuthenticationEffects {

  @Effect()
  authenticationRequested$: Observable<AuthenticationCompletedAction | AuthenticationErrorAction> = this.actions$
  .pipe(
    ofType<AuthenticationRequestedAction>(authenticationActionTypes.AUTHENTICATION_REQUESTED),
    map((action: AuthenticationAction) => action.payload),
    switchMap((payload: AuthenticationPayload) =>
        from(this.authService.signinUser(payload.credentials))
          .pipe(
            map((userToken: string) => {
              return new AuthenticationCompletedAction({ userToken });
            }),
            catchError((error) => {
              console.log('error', error);
              return of(new AuthenticationErrorAction({ error }));
            }),
          ),
        ),
    );

  @Effect({
    dispatch: false,
  })
  authenticationCompleted$: Observable<any> = this.actions$
  .pipe(
    ofType<AuthenticationCompletedAction>(authenticationActionTypes.AUTHENTICATION_COMPLETED),
    tap(() => {
      this.router.navigate(['/']);
    }),
  );

  @Effect()
  createUserRequested$: Observable<AuthenticationAddUserAction | AuthenticationErrorAction> = this.actions$
  .pipe(
    ofType<AuthenticationCreateUserRequestedAction>(authenticationActionTypes.AUTHENTICATION_CREATE_USER_REQUESTED),
    map((action: AuthenticationAction) => {
      return action.payload;
    }),
    switchMap((payload: AuthenticationPayload) =>
        from(this.authService.signupUser(payload.credentials, payload.adminProperties))
          .pipe(
            map((adminProperties) => {
              return new AuthenticationAddUserAction({ adminProperties });
            }),
            catchError((error) => {
              return of(new AuthenticationErrorAction({ error }));
            }),
          ),
        ),
    );

  @Effect()
  createUserCompleted$: Observable<AuthenticationCreateUserCompletedAction | AuthenticationErrorAction> = this.actions$
  .pipe(
    ofType<AuthenticationAddUserAction>(authenticationActionTypes.AUTHENTICATION_ADD_USER),
    map((action: AuthenticationAction) => {
      return action.payload;
    }),
    switchMap((payload: AuthenticationPayload) =>
      from(this.adminService.addAdmin(payload.adminProperties))
        .pipe(
          map(() => {
            return new AuthenticationCreateUserCompletedAction(null);
          }),
          catchError((error) => {
            return of(new AuthenticationErrorAction({ error }));
          }),
        ),
      ),
    tap(() => this.router.navigate(['/admins'])),
  );

  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router,
  ) {}

}
