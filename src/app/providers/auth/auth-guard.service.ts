import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getIsLoggedIn } from 'app/stores/authentication/authentication.selectors';
import { take } from 'rxjs/operators';
import { AppState } from 'app/stores/reducers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authStore: Store<AppState>,
    private router: Router,
  ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    const isLogged = await this.authStore.pipe(select(getIsLoggedIn)).pipe(take(1)).toPromise();
    if (!isLogged) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
