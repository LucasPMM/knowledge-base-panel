import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AdminList, AdminProperties } from 'app/models/admin';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AdminService {

  private adminsCollection: AngularFirestoreCollection<AdminProperties>;
  private admins: Observable<AdminProperties[]>;

  constructor(public afs: AngularFirestore) {

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

  public changeStatus(idUser: number, status: any) {
    return null;
  }

  public async getAdminList(): Promise<AdminList> {
    const adminProperties: AdminProperties[] = await this.admins.pipe(take(1)).toPromise();
    const adminList: AdminList = {
      admins: adminProperties,
    };
    console.log('adminList', adminList);
    return adminList;
  }

  public async addAdmin(admin: AdminProperties): Promise<AdminList> {
    this.adminsCollection.add(admin);
    const adminList: AdminList = await this.getAdminList();
    console.log('retornando do addadmim', adminList);
    return adminList;
    // TODO: Quando adicionar um admin também deve registrá-lo como o um usuario (effect de register user na authStore);
  }

}
