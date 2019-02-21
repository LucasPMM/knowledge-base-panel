import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { configuration } from './../../configuration';
import { errorMessages } from './error-messages';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UtilsService {

  constructor(
    private toastr: ToastrService,
  ) { }

  /**
   * This method is used to handle every error that occur on the application.
   * @param {any} error - The error to be handled
   */
  public handleError(error: any) {
    if (error && error.status) {
      console.error('Server error ->', error.status);
      this.showToast(error.status);
      return;
    }
  }

  /**
   * This method is used to show a toast message to the user when an error is handled.
   * @param {string} errorStatus - An error string that has to be writed in error-messages.ts file
   */
  private showToast(errorStatus: string): void {
    const errorMessage = errorMessages[errorStatus] ? errorMessages[errorStatus] : errorMessages['Unexpected'];
    this.toastr.error('Um erro inesperado ocorreu', errorMessage);
  }
}
