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
    this.router.navigate(['/login']);
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
}
