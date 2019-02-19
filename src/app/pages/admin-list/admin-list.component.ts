import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminList, AdminProperties } from 'app/models/admin';
import { AppState } from 'app/stores/reducers';
import { Store, select } from '@ngrx/store';
import { AdminRequestedAction, AdminResetAction, AdminChangeStatusRequestedAction } from 'app/stores/admin/admin.actions';
import { Observable, Subscription } from 'rxjs';
import { getAdminList, getAdminIsLoading, getAdminError } from 'app/stores/admin/admin.selectors';
import { unsubscribeSubscriptions } from 'app/utils/utils-functions';
import { UtilsService } from 'app/providers/utils/utils.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit, OnDestroy {

  public columns: string[] = [
    'nome',
    'e-mail',
    'telefone',
  ]; // TODO: trocar pro translate.
  public actions: string[] = [
    'detail',
    'changeStatus'
  ];

  public adminList$: Observable<AdminList>;
  public isLoading$: Observable<boolean>;

  private subscriptions: Subscription[] = [];

  constructor(
    private utilsService: UtilsService,
    private appStore: Store<AppState>,
  ) { }

  public async changeStatus(index: number) {
    const adminList: AdminList = await this.adminList$.pipe(take(1)).toPromise();
    const adminToChange: AdminProperties = adminList.admins[index];
    this.appStore.dispatch(new AdminChangeStatusRequestedAction({ adminToChange, indexToChangeStatus: index }));
  }

  private watchError(): void {
    const error$ = this.appStore.pipe(select(getAdminError));
    const sub = error$.subscribe(error => {
      if (!error) { return; }
      this.utilsService.handleError(error);
      this.appStore.dispatch(new AdminResetAction( null ));
    });
    this.subscriptions.push(sub);
  }

  private async getStates(): Promise<void> {
    this.appStore.dispatch(new AdminRequestedAction( null ));
    this.adminList$ = this.appStore.pipe(select(getAdminList));
    this.isLoading$ = this.appStore.pipe(select(getAdminIsLoading));
    this.watchError();
  }

  ngOnInit() {
    this.getStates();
  }

  ngOnDestroy() {
    unsubscribeSubscriptions(this.subscriptions);
  }

}

// TODO:
//    - fazer um pipe de filtragem
