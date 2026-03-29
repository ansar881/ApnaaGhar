import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { AuthService } from '../../services/auth.service';
import { allPrimeNGModules } from '../../services/primeNGShared';
import { SharedDataService } from '../../services/shared-data.service';

interface HeaderAction {
  label: string;
  icon: string;
}

interface NavigationSection {
  label: string;
  category: string;
  icon: string;
  description: string;
  items?: any[][];
}

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [CommonModule, allPrimeNGModules],
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  headerItems: HeaderAction[] = [];
  items: any[] | undefined;
  navigationSections: NavigationSection[] = [];
  featuredCities: string[] = [];
  openWindowId: any;
  mobileMenuVisible = false;
  activeMobileSection = 'Buy';

  constructor(
    private router: Router,
    public sharedDataService: SharedDataService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.openWindowId = Guid.create();

    this.headerItems = [
      { label: 'Home', icon: 'pi pi-home' }
    ];

    const cityData = this.sharedDataService.cityNames.map((data: any) => ({
      ...data,
      label: data.city
    }));

    this.featuredCities = cityData.slice(0, 6).map(city => city.label);

    this.navigationSections = [
      {
        label: 'Buy',
        category: 'buy',
        icon: 'pi pi-building',
        description: 'Ready-to-move homes and investment opportunities'
      },
      {
        label: 'Rent/Pg',
        category: 'rent/pg',
        icon: 'pi pi-key',
        description: 'Flexible rentals, shared stays and city living'
      },
      {
        label: 'Projects',
        category: 'projects',
        icon: 'pi pi-objects-column',
        description: 'New launches from trusted builders'
      },
      {
        label: 'Commerical',
        category: 'commerical',
        icon: 'pi pi-briefcase',
        description: 'Offices, shops and workspace options'
      },
      {
        label: 'Dealers',
        category: 'dealers',
        icon: 'pi pi-users',
        description: 'Verified property dealers across major cities'
      }
    ].map(section => ({
      ...section,
      items: [
        [
          {
            label: `${section.label} in`,
            items: cityData.map(city => ({
              ...city,
              command: () => this.megaMenuItemClick(section.category, city.label)
            }))
          }
        ]
      ]
    }));

    this.items = this.navigationSections.map(section => ({
      label: section.label,
      items: section.items
    }));
  }

  goHome() {
    this.mobileMenuVisible = false;
    this.router.navigate(['/home']);
  }

  headerBtnClicked(option: HeaderAction) {
    if (option.label === 'Home') {
      this.goHome();
    }
  }

  avatarClick(e: any, loginPopup: any) {
    loginPopup.toggle(e);
  }

  toggleMobileMenu() {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }

  selectMobileSection(sectionLabel: string) {
    this.activeMobileSection = sectionLabel;
  }

  getActiveMobileSection(): NavigationSection | undefined {
    return this.navigationSections.find(section => section.label === this.activeMobileSection);
  }

  goToLoginPage() {
    this.mobileMenuVisible = false;
    this.router.navigate(
      ['/login'],
      { queryParams: { action: 'login' } }
    );
  }

  megaMenuItemClick(category: string, cityName: any) {
    this.mobileMenuVisible = false;
    this.router.navigate(
      ['/showAll'],
      { queryParams: { rfm: 'headerMenu', category: category, searchValue: cityName, owid: this.openWindowId } }
    );
  }

  logOut() {
    this.authService.userLogin = false;
    this.authService.adminLogin = false;
    this.authService.user = {};
    this.mobileMenuVisible = false;
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
    this.mobileMenuVisible = false;
    this.router.navigate(
      ['/login'],
      { queryParams: { action: 'signup' } }
    );
  }
}
