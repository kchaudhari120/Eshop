import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGaurdService implements CanActivate {

  constructor(private userService : UserService, private router : Router) { }
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot) {
    let flag = false
   
    if(this.userService.isLoggedIn()){
      flag = true
    }else{
      let curenturl = state.url
      this.router.navigate(['login'],{
        queryParams : {
          returnUrl : curenturl
        }
      })
    }

    return flag
  }
}
