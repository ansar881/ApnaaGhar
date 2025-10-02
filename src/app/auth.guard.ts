import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AccessPermission{

  constructor(private router:Router){}

  navigateToLoginPage(){
    this.router.navigate(['/login'])
  }
}

export const AuthGuard: CanActivateFn = (route, state) => {
  let userlogin = inject(AuthService).userLogin;

  if(userlogin){
    return true;
  }else{
    inject(AccessPermission).navigateToLoginPage();
    return false
  }
};

export const adminAuthGuard: CanActivateFn = (route, state) => {
  let adminLogin = inject(AuthService).adminLogin;

  if(adminLogin){
    return true;
  }else{
    inject(AccessPermission).navigateToLoginPage();
    return false
  }
};