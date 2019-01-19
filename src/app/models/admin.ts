import { FilterList } from './filter-list';

export class AdminList {
    admins: AdminProperties[];
}

interface AdminProperties {
    idAdmin: number;
    idUser: number;
    email: string;
    name: string;
    dtBirth: string;
    phone: string;
    cpf: string;
    statusActive: boolean;
    dtCreate: string;
    dtLastLogin: string;
}


export class FilterAdmins extends FilterList {
  name: string;
  email: string;
}
