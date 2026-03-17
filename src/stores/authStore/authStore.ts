import { setJWTToken } from '@api/axios';
import { action, computed, makeObservable, observable } from 'mobx';
import { signIn, signUp, AuthResponse } from '@api/authApi';
import { type AuthUser } from './types';
import { LoadingStageModel } from '../LoadingStageModel';

const USER_DATA_KEY = 'auth_user';

export class AuthStore {
  user: AuthUser | null = null;

  formUsername = '';
  formEmail = '';
  formPassword = '';

  authMeta = new LoadingStageModel();

  constructor() {
    makeObservable(this, {
      user: observable,
      formUsername: observable,
      formEmail: observable,
      formPassword: observable,
      authMeta: observable,
      isAuthenticated: computed,
      email: computed,
      username: computed,
      setSignedIn: action.bound,
      setSignOut: action.bound,
      setFormUsername: action.bound,
      setFormEmail: action.bound,
      setFormPassword: action.bound,
      clearForm: action.bound,
      login: action.bound,
      register: action.bound,
    });

    if (typeof window !== 'undefined'){
      this.restoreFromStorage();
      setJWTToken(this.user?.jwt ?? null);
    }
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
      if (typeof window === 'undefined') {return;}
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

  setFormUsername(value: string) {
    this.formUsername = value;
  }

  setFormEmail(value: string) {
    this.formEmail = value;
  }

  setFormPassword(value: string) {
    this.formPassword = value;
  }

  clearForm() {
    this.formUsername = '';
    this.formEmail = '';
    this.formPassword = '';
  }

  async login(username: string, password: string) {
    this.authMeta.start();
    try {
      const response = await signIn(username, password);
      this.setSignedIn(response);
      this.authMeta.success();
    } catch (error) {
      const message =
        (error as any)?.response?.data?.error?.message || 'An error has occurred';
      this.authMeta.error(message);
    }
  }

  async register(username: string, email: string, password: string) {
    this.authMeta.start();
    try {
      const response = await signUp(username, email, password);
      this.setSignedIn(response);
      this.authMeta.success();
      this.clearForm();
    } catch (error) {
      const message =
        (error as any)?.response?.data?.error?.message || 'An error has occurred';
      this.authMeta.error(message);
    }
  }
}
