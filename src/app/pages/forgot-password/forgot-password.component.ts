import { Utils } from './../../utils/utils';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { configuration } from './../../configuration';
import { AuthService } from 'app/providers/auth/auth.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  private classes = ['hold-transition', 'login-page'];
  public emailToRecovery: string;
  public isSubmitting = false;
  public msgFeedback: string;
  public projectName = configuration.projectName;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
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

  public async recoveryPassword(): Promise<void> {
    this.isSubmitting = true;
    this.msgFeedback = '';
    await this.authService.forgotPassword(this.emailToRecovery);
    this.isSubmitting = false;
  }

}
