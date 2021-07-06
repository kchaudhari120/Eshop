import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/Operators'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getAllUserUrl = "http://localhost/api/users";
  private userSignupUrl = "http://localhost/api/users/signup";
  private userLoginUrl = "http://localhost/api/users/login";
  private isAdminUrl = "http://localhost/api/users/is-admin";
  private _loginObservable : BehaviorSubject<Object>;

  constructor(private http: HttpClient) {
    this._loginObservable = new BehaviorSubject({});
   }

  
  public get loginObservable() {
    return this._loginObservable
  }
  
  
  private saveTokenToLocalStorege(token: string) {
    localStorage.setItem('token', "Bearer "+token)
  }

  getToken(){
    return localStorage.getItem('token') ? localStorage.getItem('token') : "";
  }

  isLoggedIn(){
    if(this.getToken() != ''){
      return true
    }
    return false
  }
//GET ALL USERS
  getAllUsers() {
    let headers = new HttpHeaders({
      'authorization' : this.getToken()
    })
    return this.http.get(this.getAllUserUrl, {headers})
      .pipe(
        map((result : {users : User[]}) => {
          return result.users
        })
      )
  }

  signup(user: User) {
    return this.http.post(this.userSignupUrl, user)
      .pipe(
        map(result => {
          return <{ message: string }>result;
        })
      )
  }

  login(credintial: { email: string, password: string }) {
    return this.http.post(this.userLoginUrl, credintial)
      .pipe(
        map((result : loginResponce) => {
          this.saveTokenToLocalStorege(result.token)
          this.loginObservable.next({});
          return result
        })
      )
  }

  logout(){
    localStorage.removeItem('token');
    this.loginObservable.next({});
  }

  isAdmin(){
    let headers = new HttpHeaders({
      'authorization' : this.getToken()
    })    
    return this.http.get(this.isAdminUrl,{headers}).pipe(
      map(result=>{
        return <boolean> result
      })
    )
  }

}

interface loginResponce {
  token: string,
  message: string
}