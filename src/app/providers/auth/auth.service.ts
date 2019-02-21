import { Injectable } from '@angular/core';
import { Credential } from 'app/models/credential';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AdminProperties } from 'app/models/admin';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  public async signinUser(credential: Credential): Promise<any> {
    const res = await this.afAuth.auth.signInWithEmailAndPassword(credential.email, credential.password);
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
      this.toastr.success('Email enviado!', 'Um email com as instruções para mudar sua senha foi enviado.');
      this.router.navigate(['/login']);
    } catch (error) {
      this.toastr.error('Email inválido!', 'O email digitado não se encontra na lista de usuários cadastrados.');
    }
  }

  public async signupUser(credential: Credential, adminProperties: AdminProperties): Promise<any> {
    const res = await this.afAuth.auth.createUserWithEmailAndPassword(credential.email, credential.password);
    console.log('Criando user:', res);
    return adminProperties;
  }

}
