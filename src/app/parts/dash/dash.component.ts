import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { configuration } from './../../configuration';
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit, OnDestroy {

  public projectName: any = configuration.projectName;
  public userDefault: string = configuration.userDefaultImage;
  private classes: string[] = [configuration.skin, 'sidebar-mini'];

  constructor(
    private router: Router,
  ) { }

  public async logout(): Promise<void> {
    console.log('entrei aqui');
    this.router.navigate(['/login']);
    console.log('entrei aqui');

  }

  ngOnInit() {
    $(document).ready(() => {
      const layout = $('body').data('lte.layout');
      if (layout) {
        layout.fix();
      }
      const trees: any = $('[data-widget="tree"]');
      if (trees) {
        trees.tree();
      }
    });
    const body = document.getElementsByTagName('body')[0];
    for (const cl of this.classes) {
      body.classList.add(cl);
    }
  }

  ngOnDestroy() {
    // const body = document.getElementsByTagName('body')[0];
    // for (const cl of this.classes) {
    //   body.classList.remove(cl);
    // }
  }

}
