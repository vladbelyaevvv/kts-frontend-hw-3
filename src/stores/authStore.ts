import { setJWTToken } from '@/api/axios';
import { makeAutoObservable } from 'mobx';
import { signIn, signUp, AuthResponse } from '@/api/authApi';

export type AuthUser = {
  email: string;
  username: string;
  jwt: string;
};

export type SignInResponse = {
  jwt: string;
  user: {
    email: string;
    username: string;
  };
};

const USER_DATA_KEY = 'auth_user';

class AuthStore {
  user: AuthUser | null = null;

  constructor() {
    makeAutoObservable(this);
    this.restoreFromStorage();
    setJWTToken(this.user?.jwt ?? null);
  }

  get isAuthenticated() {
    return this.user !== null;
  }

  get email() {
    return this.user?.email ?? null;
  }

  get username() {
    return this.user?.username ?? null;
  }

  // загрузка из локал стораджа
  private saveToStorage() {
    try {
      if (this.user) {
        const userData = JSON.stringify(this.user);
        localStorage.setItem(USER_DATA_KEY, userData);
      } else {
        localStorage.removeItem(USER_DATA_KEY);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to save auth data to localStorage: ', error);
    }
  }

  //сохранение данных в локал сторадж
  private restoreFromStorage() {
    try {
      const storedData = localStorage.getItem(USER_DATA_KEY);
      if (storedData) {
        const userData = JSON.parse(storedData) as AuthUser;
        if (userData?.email && userData?.username && userData.jwt) {
          this.user = userData;
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to restore auth data from localStorage: ', error);
    }
  }

  //установка данных авторизованного пользователя
  setSignedIn(response: AuthResponse) {
    const { user, jwt } = response;

    this.user = {
      email: user.email,
      username: user.username,
      jwt: jwt,
    };

    setJWTToken(jwt);
    this.saveToStorage();
  }

  //выход из системы
  setSignOut() {
    this.user = null;
    setJWTToken(null);
    this.saveToStorage();
  }

  async login(username: string, password: string) {
    const response = await signIn(username, password);
    this.setSignedIn(response);
  }

  async register(username: string, email: string, password: string) {
    const response = await signUp(username, email, password);
    this.setSignedIn(response);
  }
}

export const authStore = new AuthStore();
