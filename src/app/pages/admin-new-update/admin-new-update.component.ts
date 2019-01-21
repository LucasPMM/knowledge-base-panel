import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-new-update',
  templateUrl: './admin-new-update.component.html',
  styleUrls: ['./admin-new-update.component.scss']
})
export class AdminNewUpdateComponent implements OnInit {

  public isEdit: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  // TODO: get id from url
}
