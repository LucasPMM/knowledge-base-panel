import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AdminList, AdminProperties } from 'app/models/admin';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { getAdminList } from 'app/stores/admin/admin.selectors';

@Injectable()
export class AdminService {

  private adminsCollection: AngularFirestoreCollection<AdminProperties>;
  private admins: Observable<AdminProperties[]>;

  constructor(public afs: AngularFirestore) {
    this.updateCollection();
  }

  public updateCollection() {
    this.adminsCollection = this.afs.collection('admins');

    this.admins = this.adminsCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map(a => {
          const data = a.payload.doc.data() as AdminProperties;
          data.idFirebase = a.payload.doc.id;
          return data;
        });
      }),
    );
  }

  public async changeStatus(newAdmin: AdminProperties, indexToChangeStatus: number): Promise<AdminList> {
    this.afs.collection('admins').doc(newAdmin.idFirebase).update({
      cpf: newAdmin.cpf,
      dtBirth: newAdmin.dtBirth,
      email: newAdmin.email,
      idUser: newAdmin.idUser,
      name: newAdmin.name,
      phone: newAdmin.phone,
      statusActive: !newAdmin.statusActive!,
    });
    const adminList: AdminList = await this.getAdminList();
    // adminList.admins[indexToChangeStatus].statusActive = !adminList.admins[indexToChangeStatus].statusActive;
    return adminList;
}

  public async getAdminList(): Promise<AdminList> {
    this.updateCollection();
    const adminProperties: AdminProperties[] = await this.admins.pipe(take(1)).toPromise();
    const adminList: AdminList = {
      admins: adminProperties,
    };
    return adminList;
  }

  public async addAdmin(admin: AdminProperties): Promise<AdminList> {
    this.adminsCollection.add(admin);
    const adminList: AdminList = await this.getAdminList();
    return adminList;
  }

}
