import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { JwtHelperService, JwtInterceptor } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7224/api/User";
  private userPayLoad: any;


  constructor(private http: HttpClient, private router: Router) {
    this.userPayLoad = this.decodedToken();
  }

  //Register
  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, userObj)
  }

  //Authenticate
  Login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, loginObj)
  }

  SignOut() {
    //localStorage.clear();
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token);

  }

  getFullNameFromToken() {
    if (this.userPayLoad)
      return this.userPayLoad.name;
  }

  getRoleFromToken() {
    if (this.userPayLoad)
      return this.userPayLoad.role;
  }

}
