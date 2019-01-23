import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminList } from 'app/models/admin';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() adminList: AdminList;
  @Input() columns: string[];
  @Input() actions: string[];

  // @Output() whenDetail: EventEmitter<number> = new EventEmitter<number>();
  // @Output() whenChangeStatus: EventEmitter<number> = new EventEmitter<number>();

  public hasActions: boolean = false;
  public hasChangeAction: boolean = false;
  public statusList: string[] = [];
  public usersIds: string[] = [];

  public data: any[] = [];

  constructor() { }


  private tableHasActions() {
    if (this.actions) {
      this.hasActions = this.actions.length ? true : false;
      this.hasChangeAction = this.actions.includes('changeStatus');
    }
  }

  private mountData(): void {
    for (let i = 0; i < this.adminList.admins.length; i++) {
      const arr = [this.adminList.admins[i].name, this.adminList.admins[i].email, this.adminList.admins[i].phone];
      this.data.push(arr);

      if (this.hasChangeAction) {
        const status = this.adminList.admins[i].statusActive;
        this.statusList.push(status ? 'activated' : 'disabled');
      }

      const id = this.adminList.admins[i].idFirebase;
      this.usersIds.push(id);
    }
  }

  ngOnInit() {
    this.tableHasActions();
    this.mountData();
  }

}
