import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private translate: TranslateService,
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  private initFirebase(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyDKW-cbzYKjOVUSdMp85ygzjdwFu11DGaE',
      authDomain: 'knowledge-base-server.firebaseapp.com',
      databaseURL: 'https://knowledge-base-server.firebaseio.com',
      projectId: 'knowledge-base-server',
      storageBucket: 'knowledge-base-server.appspot.com',
      messagingSenderId: '873739364983'
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      $('html,body').animate({ scrollTop: 0 }, 'slow', () => {
        $('body').removeClass('sidebar-open');
      });
      const collapse = $('.navbar-collapse');
      if (collapse && collapse[0] && collapse[0].classList.contains('in')) {
        collapse[0].classList.remove('in');
      }
    });
    this.initFirebase();
  }

}


// TODO:
// - Adicionar o lint do Airbnb
// - Refatorar os reducers
// - Trabalhar a responsividade das tabelas
