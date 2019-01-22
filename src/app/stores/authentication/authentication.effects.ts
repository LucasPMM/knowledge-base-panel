import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  AuthenticationErrorAction,
  AuthenticationCompletedAction,
  AuthenticationActionTypes,
  AuthenticationRequestedAction,
  AuthenticationAction,
  AuthenticationPayload,
} from './authentication.actions';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { AuthService } from 'app/providers/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationEffects {

  @Effect()
  authenticationRequested$: Observable<AuthenticationCompletedAction | AuthenticationErrorAction> = this.actions$
  .pipe(
    ofType<AuthenticationRequestedAction>(AuthenticationActionTypes.AUTHENTICATION_REQUESTED),
    map((action: AuthenticationAction) => action.payload),
      switchMap((payload: AuthenticationPayload) =>
        from(this.authService.signinUser(payload.credentials))
          .pipe(
            map((userToken: string) => {
              return new AuthenticationCompletedAction({ userToken });
            }),
            catchError(error => {
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
    ofType<AuthenticationCompletedAction>(AuthenticationActionTypes.AUTHENTICATION_COMPLETED),
    tap(() => {
      this.router.navigate(['/']);
    }),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}


}
