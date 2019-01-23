import { Component, OnInit } from '@angular/core';
import { Credential } from 'app/models/credential';
import { AdminProperties } from 'app/models/admin';
import { AuthenticationCreateUserRequestedAction } from 'app/stores/authentication/authentication.actions';
import { AppState } from 'app/stores/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin-new-update',
  templateUrl: './admin-new-update.component.html',
  styleUrls: ['./admin-new-update.component.scss']
})
export class AdminNewUpdateComponent implements OnInit {

  public isEdit: boolean = false;

  constructor(
    private appStore: Store<AppState>,
  ) { }

  ngOnInit() {
    const credentials: Credential = new Credential('lucaspaulom@gmail.com', '34960550');
    const adminProperties: AdminProperties = {
      idUser: '123',
      email: 'lucaspaulom@gmail.com',
      name: 'Lucas Paulo Martins Mariz',
      dtBirth: '1999-11-06',
      phone: '(31) 9 7502-7868',
      cpf: '144.010.016-05',
      statusActive: true,
    }
    this.appStore.dispatch(new AuthenticationCreateUserRequestedAction({ adminProperties, credentials }));
  }
  // TODO: get id from url
}
