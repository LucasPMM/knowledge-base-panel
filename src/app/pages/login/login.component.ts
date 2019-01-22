import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UtilsService } from './../../providers/utils/utils.service';
import { configuration } from './../../configuration';
import { Credential } from './../../models/credential';
import { AuthService } from 'app/providers/auth/auth.service';
import { Store, select } from '@ngrx/store';
import { AuthenticationState } from 'app/stores/authentication/authentication.state';
import { AuthenticationRequestedAction, AuthenticationResetAction } from 'app/stores/authentication/authentication.actions';
import { getAuthError, getAuthIsLoading } from 'app/stores/authentication/authentication.selectors';
import { unsubscribeSubscriptions } from 'app/utils/utils-functions';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private classes = ['hold-transition', 'login-page'];
  public projectName = configuration.projectName;
  public isFormSubmitted: boolean;
  public loginForm: FormGroup;
  public errorMsg: string;

  public isLoading$: Observable<boolean>;
  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private utilsService: UtilsService,
    private authStore: Store<AuthenticationState>,
  ) {}

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  // private watchError(): void {
  //   const error$ = this.authStore.pipe(select(getAuthError));
  //   const sub = error$.subscribe(error => {
  //     if (!error) {
  //       this.router.navigate(['/']);
  //       return;
  //     }
  //     console.error('Error getting suggested orders', error);
  //     this.utilsService.handleError(error);
  //     this.authStore.dispatch(new AuthenticationResetAction( null ));
  //   });
  //   this.subscriptions.push(sub);
  // }

  public login(formValue: any, isValid: boolean): void {
    const credentials = new Credential(formValue['email'], formValue['password']);
    if (!isValid) { return; }
    this.authStore.dispatch(new AuthenticationRequestedAction({ credentials }));
    // this.watchError();
  }
  private getStates(): void {
    // this.isLoading$ = this.authStore.pipe(select(getAuthIsLoading));
  }

  ngOnInit() {
    this.getStates();
    this.initForm();
    const body = document.getElementsByTagName('body')[0];
    for (const cl of this.classes) {
      body.classList.add(cl);
    }
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    for (const cl of this.classes) {
      body.classList.remove(cl);
    }
    unsubscribeSubscriptions(this.subscriptions);
  }

}
