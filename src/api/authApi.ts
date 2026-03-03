import api from './axios';

export type SignInRequest = {
  identifier: string;
  password: string;
};

export type SignUpRequest = {
  username: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

export const signIn = async (identifier: string, password: string) => {
  const response = await api.post<AuthResponse>('/auth/local', {
    identifier,
    password,
  });
  return response.data;
};

export const signUp = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await api.post<AuthResponse>('/auth/local/register', {
    username,
    email,
    password,
  });
  return response.data;
};
