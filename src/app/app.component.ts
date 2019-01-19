import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
  }

}
