import { AdminProperties, AdminList } from 'app/models/admin';

export interface AdminState {
  adminList: AdminList;
  isLoading: boolean;
  error: string | boolean;
}

export const adminEmptyState: AdminState = {
  adminList: null,
  isLoading: false,
  error: null,
};
