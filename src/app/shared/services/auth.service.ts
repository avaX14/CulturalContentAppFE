import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { RoutingService } from './routing.service';
import { BehaviorSubject } from 'rxjs';

const ENDPOINTS = {
  LOGIN: 'auth/login',
  REGISTER: 'api/users/public/register',
  LOGOUT: 'api/auth/logout',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isUserLogIn = false;
  private _requestErrors = new BehaviorSubject<any>([]);
  public requestErrors$ = this._requestErrors.asObservable();

  public constructor(
    private _httpService: HttpService,
    public routingService: RoutingService
  ) {
    this.init();
  }

  public goToLoginPage() {
    this.routingService.goToLoginPage();
  }

  public init() {
    const token = this.getToken();
    const user = this.getUser();

    if (token && user) {
      this.setAuthorizationHeader();
      this.isUserLogIn = true;
    }
  }

  public setAuthorizationHeader() {
    const token = this.getToken();
    if (token) {
      this._httpService.attachHeaders(`Bearer ${token}`);
    }
  }

  public createSession(user) {
    localStorage.setItem('user', JSON.stringify(user));
    this.setAuthorizationHeader();
  }

  public checkIfUserIsLogIn() {
    return this.isUserLogIn;
  }

  public destroySession() {
    localStorage.clear();
    this._httpService.removeHeaders(['Authorization']);
  }

  public login(loginData) {
    this._httpService
      .post(ENDPOINTS.LOGIN, loginData)
      .then((res) => {
        this.createSession(res.data);
        this.isUserLogIn = true;
        this.routingService.goHomePage();
      })
      .catch((err) => {
        this._requestErrors.next('Username or password are invalid!');
      });
  }

  public register(registerData) {
    this._httpService
      .post(ENDPOINTS.REGISTER, registerData)
      .then((res) => {
        this.routingService.goToLoginPage();
      })
      .catch((err) => {
        this._requestErrors.next(err.response.data.errors);
      });
  }

  public logout() {
    this._httpService.post(ENDPOINTS.LOGOUT).then((res) => {
      this.isUserLogIn = false;
      this.destroySession();
      this.routingService.goToLoginPage();
    });
  }

  public getToken() {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user).access_token : undefined;
  }

  public isAuthenticated() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.access_token ? true : false;
  }

  public getUser() {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
  }

  public updateUserInStorage(property) {
    const user = localStorage.getItem('user');
    let jsonUser = JSON.parse(user);
    jsonUser = { ...jsonUser, ...property };
    localStorage.setItem('user', JSON.stringify(jsonUser));
  }
}