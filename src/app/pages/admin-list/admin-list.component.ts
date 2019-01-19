import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/providers/admin/admin.service';
import { ToasterService } from 'angular2-toaster';
import { AdminList, FilterAdmins } from 'app/models/admin';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  public loading: boolean;
  public listAdmins: AdminList;
  public filter: FilterAdmins;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private toasterService: ToasterService,
  ) { }

  // public filtrate() {
  //   this.load()
  //     .then(() => this.initFilter());
  // }

  // private async changeStatus(row): Promise<void> {
  //   row.statusActive = !row.statusActive;
  //   try {
  //     await this.adminService.changeStatus(row.idUser, { status: row.statusActive });
  //     this.toasterService.pop('success', 'Status Alterado', row.statusActive ? 'Ativado!' : 'Desativado!');
  //   } catch (e) {
  //     row.statusActive = !row.statusActive;
  //     this.toasterService.pop('error', 'Desculpe', 'Não foi possível alterar o status do administrador.');
  //   }
  // }

  // private convertListToDataRow() {
  //   return this.listAdmins.admins.map(admin => {
  //     return {
  //       idAdmin: admin.idAdmin,
  //       idUser: admin.idUser,
  //       email: admin.email,
  //       name: admin.name,
  //       dtBirth: admin.dtBirth,
  //       phone: admin.phone,
  //       cpf: admin.cpf,
  //       statusActive: admin.statusActive,
  //       dtCreate: admin.dtCreate,
  //       dtLastLogin: admin.dtLastLogin,
  //     };
  //   });
  // }

  // private async load(): Promise<AdminList> {
  //   this.loading = true;
  //   try {
  //     const admins = await this.adminService.getAdminList(this.filter);
  //     this.listAdmins = admins;
  //     this.loading = false;
  //     return this.listAdmins;
  //   } catch (e) {
  //     this.toasterService.pop('error', 'Desculpe', 'Não foi possível carregar a listagem.');
  //   }
  //   this.loading = false;
  // }

  // private initFilter() {
  //   this.filter = {
  //     limit: 5,
  //     offset: 0,
  //     name: !this.filter ? '' : this.filter.name,
  //     email: !this.filter ? '' : this.filter.email
  //   };
  // }

  ngOnInit() {
    // this.initFilter();
    // this.load();
  }

}
