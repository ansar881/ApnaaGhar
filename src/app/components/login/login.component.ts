import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { allPrimeNGModules } from '../../services/primeNGShared';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CreateAccountComponent } from "../create-account/create-account.component";
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, allPrimeNGModules, CreateAccountComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, AfterViewInit {
  loginForm!: FormGroup;
  pswdDetailsDialog:boolean = false;
  openWindowId!:any;
  invalidUserPswd:boolean = false;
  isloginPanel:boolean = true;

  constructor(private fb: FormBuilder, private router:Router, private actRoute:ActivatedRoute, private authService: AuthService,
    private serverService: ServerService
  ) { }

  ngOnInit() {
    this.loginFormBuilder();
  }

  ngAfterViewInit(){
    this.actRoute.queryParams.subscribe((params) => {
      // this.openWindowId = params['owid'];
    });
  }

  loginFormBuilder(){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      member: ['User', [Validators.required]],
    });
  }

  onLogin(){
    if(this.loginForm['valid']){
      this.invalidUserPswd = false;
      this.authService.userLogin = true;
      this.authService.user = this.loginForm.value;

      this.serverService.userLogin(this.loginForm.value).subscribe(response => {
        const csrfToken = response.headers.get('X-CSRF-Token');
        if (csrfToken) {
          this.authService.csrfToken = csrfToken;
        }
      })

      if(this.loginForm.value.member === 'Admin'){
        this.authService.adminLogin = true;
        this.router.navigate(['/adminDashboard']);
      }else{
        this.router.navigate(['/home']);
      }
    }else{
      this.invalidUserPswd = true;
    }
  }

  onInput(e:any){
    this.invalidUserPswd = false;
  }

  showPswdValidation(){
    this.pswdDetailsDialog = true;
  }

  createAccount(){
    this.isloginPanel = false;
  }

  showloginPage(e:boolean){
    this.isloginPanel = true;
  }
}
