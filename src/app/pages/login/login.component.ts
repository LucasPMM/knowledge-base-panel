import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UtilsService } from './../../providers/utils/utils.service';
import { configuration } from './../../configuration';
import { Credential } from './../../models/credential';
import { AuthService } from 'app/providers/auth/auth.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private utilsService: UtilsService,
  ) {}

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  public async login(formValue: any, isValid: boolean): Promise<void> {
    this.errorMsg = '';
    this.isFormSubmitted = true;
    const credentials = new Credential(formValue['email'], formValue['password']);
    if (!isValid) { return; }

    // TODO: criar a login store pois o usuário é deslogado quando recarrega a pagina pois os dados são perdidos.

    try {
      await this.authService.signinUser(credentials);
      this.router.navigate(['/']);
    } catch (e) {
      this.utilsService.handleError(e);
    }
  }

  ngOnInit() {
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
  }

}
