import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Credential } from 'app/models/credential';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;

  constructor(
    private toasterService: ToasterService,
    private router: Router,
  ) {}

  public async signinUser(credentials: Credential): Promise<void> {
    try {
      await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
      firebase.auth().currentUser.getIdToken()
        .then(token => {
          this.token = token;
          console.log('token', this.token);
        });
      this.toasterService.pop('success', 'Login feito com sucesso');
    } catch (error) {
      this.toasterService.pop(
        'error',
        'Desculpe',
        'Email ou senha inválido(s).'
      );
    }
  }

  public logout(): void {
    firebase.auth().signOut();
    this.token = null;
  }

  public async forgotPassword(email: string): Promise<void> {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      this.toasterService.pop('success', 'Email enviado!', 'Um email com as instruções para mudar sua senha foi enviado.');
      this.router.navigate(['/login']);
    } catch (error) {
      this.toasterService.pop('error', 'Email inválido!', 'O email digitado não se encontra na lista de usuários cadastrados.');
    }
  }

  public isAuthenticated() {
    return this.token != null;
  }

  public getToken(): string {
    let tk: string;
    firebase.auth().currentUser.getIdToken()
      .then((token: string) => {
        tk = token;
      });
    return tk;
  }
}
