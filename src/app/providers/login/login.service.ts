import { Credential } from './../../models/credential';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  constructor(

  ) { }

// TODO: Add functions do handleError

  public login(credentials: Credential): Promise<any> {
    // return this.serverService.post(LoginEndpoints.login(), credentials)
    //   .then(res => {
    //       if (res['kindOfUser'] === 'admin') {
    //         return res;
    //       } else {
    //         throw new CustomError('InvalidKindOfUser', null);
    //       }
    //     });
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

   public recoveryPassword(email: string): Promise<any> {
    // return this.serverService.put(LoginEndpoints.recoveryPassword(), {email: email});
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

}
