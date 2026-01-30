import { Component, OnInit } from '@angular/core';
import { allPrimeNGModules } from '../../services/primeNGShared';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';
import { Guid } from 'guid-typescript';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [allPrimeNGModules],
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  headerItems: any[] | undefined;
  items: any[] | undefined;
  openWindowId:any;

  constructor(private router: Router, private sharedDataService: SharedDataService, private authService: AuthService) { }

  ngOnInit() {
    this.openWindowId = Guid.create();
    
    this.headerItems = [
      { label: 'Home', icon: 'pi pi-home' }
    ]

    let cityData = (this.sharedDataService.cityNames).map((data:any)=>{
      data['label'] = data['city'];
      return data
    });
    
    this.items = [
      {
        label: 'Buy',
        items: [
          [
            {
              label: 'Buy in',
              items: cityData.map(city => ({
                ...city,
                command: () => this.megaMenuItemClick('buy', city.label)
              }))
            }
          ],
        ]
      },
      {
        label: 'Rent/Pg',
        items: [
          [
            {
              label: 'Rent/Pg in',
              items: cityData.map(city => ({
                ...city,
                command: () => this.megaMenuItemClick('rent/pg', city.label)
              }))
            }
          ]
        ]
      },
      {
        label: 'Projects',
        items: [
          [
            {
              label: 'Projects in',
              items: cityData.map(city => ({
                ...city,
                command: () => this.megaMenuItemClick('projects', city.label)
              }))
            }
          ]
        ]
      },
      {
        label: 'Commerical',
        items: [
          [
            {
              label: 'Commerical in',
              items: cityData.map(city => ({
                ...city,
                command: () => this.megaMenuItemClick('commerical', city.label)
              }))
            }
          ]
        ]
      },
      {
        label: 'Dealers',
        items: [
          [
            {
              label: 'Dealers in',
              items: cityData.map(city => ({
                ...city,
                command: () => this.megaMenuItemClick('dealers', city.label)
              }))
            }
          ]
        ]
      },
    ]
  }

  headerBtnClicked(option: any){
    if(option.label === "Home"){
      this.router.navigate(['/home']);
    }
  }

  avatarClick(e:any, loginPopup:any){
    loginPopup.toggle(e);
  }

  goToLoginPage(){
    this.router.navigate(
      ['/login'],
      { queryParams: { action: 'login' } }
    );
  }

  megaMenuItemClick(category:string, cityName:any){
    this.router.navigate(
      ['/showAll'],
      { queryParams: { rfm:'headerMenu', category: category, searchValue: cityName, owid: this.openWindowId }}
    );
  }

  logOut(){
    this.authService.userLogin = false;
    this.authService.adminLogin = false;
    this.authService.user = {};
    this.router.navigate(['/home']);
  }

  isUserLoggedIn(): boolean {
    return this.authService.userLogin;
  }

  getUserName(): string {
    return this.authService.user?.username || 'Guest User';
  }

  getUserEmail(): string {
    return this.authService.user?.email || 'not@specified.com';
  }

  getUserRole(): string {
    return this.authService.user?.member || 'User';
  }

  getRoleSeverity(): 'danger' | 'info' | 'success' {
    const role = this.getUserRole();
    if (role === 'Admin') return 'danger';
    if (role === 'Agent') return 'info';
    return 'success';
  }

  getUserMemberSince(): string {
    return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }

  getUserType(): string {
    return this.authService.user?.member || 'User';
  }

  getUserInitials(): string {
    const name = this.getUserName();
    const initials = name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
    return initials || 'GU';
  }

  viewProfile() {
    // this.router.navigate(['/profile']);
  }

  goToMyListings() {
    // this.router.navigate(['/myListings']);
  }

  goToSettings() {
    // this.router.navigate(['/settings']);
  }

  goToSignUp() {
    this.router.navigate(
      [`/login`],
      { queryParams: { action: 'signup' } }
    );
  }
}
