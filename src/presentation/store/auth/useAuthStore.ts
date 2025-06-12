import { create } from 'zustand';
import { AuthStatus } from '../../../infrastructure/interface/auth.status';
import { authCheckStatus, authLogin } from '../../../actions/auth/auth';
import { User } from '../../../domain/entities/user';
import { StorageAdapter } from '../../../configs/adapters/storage-adapter';
import { tesloApi } from '../../../configs/api/telsloApi';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);

    if (!resp) {
      set({
        status: 'unauthenticated',
        token: undefined,
        user: undefined,
      });
      return false;
    }
    await StorageAdapter.setItem('token', resp.token);
    tesloApi.defaults.headers.common['Authorization'] = `Bearer ${resp.token}`;

    set({ status: 'authenticated', token: resp.token, user: resp.user });
    return true;
  },
  checkStatus: async () => {
    const token = await StorageAdapter.getItem('token');

    if (!token) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return;
    }

    tesloApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const resp = await authCheckStatus();

    if (!resp) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return;
    }
    set({ status: 'authenticated', token: resp.token, user: resp.user });
  },
  logout: async () => {
    await StorageAdapter.removeItem('token');
    set({ status: 'unauthenticated', token: undefined, user: undefined });
  },
}));
