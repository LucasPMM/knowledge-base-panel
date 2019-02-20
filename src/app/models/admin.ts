import { FilterList } from './filter-list';

export class AdminList {
  admins: AdminProperties[];
}

export interface AdminProperties {
  idUser: string;
  email: string;
  name: string;
  dtBirth: string;
  phone: string;
  cpf: string;
  statusActive: boolean;
  idFirebase?: string;
}

export class FilterAdmins extends FilterList {
  name: string;
  email: string;
}
