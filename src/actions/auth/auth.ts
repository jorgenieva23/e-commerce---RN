import { tesloApi } from '../../configs/api/telsloApi';
import type { AuthResponse } from '../../infrastructure/interface/auth.response';

export const authLogin = async (email: string, password: string) => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
