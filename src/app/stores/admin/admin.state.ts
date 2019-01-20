
export interface AdminState {
  adminList: any;
  isLoading: boolean;
  error: string | boolean;
}

export const adminEmptyState: AdminState = {
  adminList: null,
  isLoading: false,
  error: null,
};
