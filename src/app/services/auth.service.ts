import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userLogin:boolean = false;
  adminLogin:boolean = false;
  user:any = {};
  csrfToken:string = '';

  constructor() { }

}