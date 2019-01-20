import { Actions, Effect } from '@ngrx/effects';
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
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class AdminEffects {

  constructor(
    private actions$: Actions,
  ) {}

}
