import { Injectable } from '@angular/core';
import { Credential } from 'app/models/credential';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private toasterService: ToasterService,
    private router: Router,
  ) { }

  public async signinUser(credential: Credential): Promise<any> {
    let res;
    res = await this.afAuth.auth.signInWithEmailAndPassword(credential.email, credential.password);
    const token = this.afAuth.auth.currentUser.getIdToken(); // TODO: COLOCAR TOKEN NA STORE
    console.log('token', token);
    return res;
  }

  public async signOut(): Promise<void> {
    return await this.afAuth.auth.signOut();
  }

  public async forgotPassword(email: string): Promise<void> {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(email);
      this.toasterService.pop('success', 'Email enviado!', 'Um email com as instruções para mudar sua senha foi enviado.');
      this.router.navigate(['/login']);
    } catch (error) {
      this.toasterService.pop('error', 'Email inválido!', 'O email digitado não se encontra na lista de usuários cadastrados.');
    }
  }

}
