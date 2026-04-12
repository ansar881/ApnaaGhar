import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { allPrimeNGModules } from '../../services/primeNGShared';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
    selector: 'app-home',
    imports: [CommonModule, allPrimeNGModules],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  propertiesData: any[] = [];
  responsiveOptions: any[] = [];
  featureResponsiveOptions: any[] = [];
  propertiesCategory: any[] = [];
  multiShowProperties: any[] = [];
  multiPropertiesData: any[] = [];
  searchTabDataSource: any[] = [];
  cityHighlights: string[] = [];
  heroStats = [
    { value: '15+', label: 'Active cities' },
    { value: '1K+', label: 'Verified listings' },
    { value: '24/7', label: 'Property discovery' }
  ];
  quickFilters = [
    { label: 'Ready to move', category: 'buy', searchValue: 'Mumbai' },
    { label: 'Family rentals', category: 'rent/pg', searchValue: 'Delhi' },
    { label: 'New launches', category: 'projects', searchValue: 'Gurgaon' }
  ];
  openWindowId!: Guid;
  isNoticeExpanded = false;

  noticeText: string = `This is a personal project and not a business project.
  It has no connection with any business or commercial entity. The design,
  architecture, and all other aspects of this project have been created
  independently and are not copied from any other platform, project, or website.
  While certain elements may appear similar to those on other platforms or websites,
  this project has no affiliation with them in any way.`;

  constructor(private router: Router, private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.openWindowId = Guid.create();
    this.propData();
  }

  propData() {
    this.searchTabDataSource = [
      { title: 'BUY', category: 'buy', description: 'Explore premium homes in top localities' },
      { title: 'RENT / PG', category: 'rent/pg', description: 'Find flexible stays and family rentals' },
      { title: 'PROJECTS', category: 'projects', description: 'Track new launches and builder offers' },
      { title: 'COMMERICAL', category: 'commerical', description: 'Browse offices, retail and workspaces' },
      { title: 'DEALERS', category: 'dealers', description: 'Connect with trusted local experts' }
    ];

    this.propertiesData = this.sharedDataService.propertiesData;
    this.multiPropertiesData = this.sharedDataService.multiPropertiesData;
    this.cityHighlights = this.sharedDataService.cityNames.slice(0, 8).map(city => city.city);

    this.responsiveOptions = [
      { breakpoint: '1280px', numVisible: 3, numScroll: 1 },
      { breakpoint: '991px', numVisible: 2, numScroll: 1 },
      { breakpoint: '767px', numVisible: 1, numScroll: 1 }
    ];

    this.featureResponsiveOptions = [
      { breakpoint: '1199px', numVisible: 1, numScroll: 1 },
      { breakpoint: '767px', numVisible: 1, numScroll: 1 }
    ];

    this.propertiesCategory = [
      {
        proptitle: 'Top Trending Homes',
        subtitle: 'Most searched homes across popular destinations',
        propData: this.propertiesData
      },
      {
        proptitle: 'Spotlight Picks',
        subtitle: 'Handpicked listings with standout value and location',
        propData: this.propertiesData
      }
    ];

    const multiPropDatas = [
      { parentTitle: 'Top New Project', data: this.multiPropertiesData },
      { parentTitle: 'Top New Project', data: this.multiPropertiesData },
      { parentTitle: 'Top New Project', data: this.multiPropertiesData },
      { parentTitle: 'Top New Project', data: this.multiPropertiesData }
    ];

    this.multiShowProperties = [
      {
        proptitle: 'Top New Projects',
        subtitle: 'Fresh launches with stronger layouts and better community amenities',
        propData: multiPropDatas
      }
    ];
  }

  homeSearchClicked(tab: any, serchVal: any) {
    if (serchVal.value) {
      this.router.navigate(
        ['/showAll'],
        { queryParams: { tab: tab.title, rfm: 'home', category: tab.category, searchValue: serchVal.value, owid: this.openWindowId } }
      );
    }
  }

  quickSearch(filter: any) {
    this.router.navigate(
      ['/showAll'],
      { queryParams: { tab: filter.label, rfm: 'home', category: filter.category, searchValue: filter.searchValue, owid: this.openWindowId } }
    );
  }

  searchByCity(city: string) {
    this.router.navigate(
      ['/showAll'],
      { queryParams: { tab: 'BUY', rfm: 'home', category: 'buy', searchValue: city, owid: this.openWindowId } }
    );
  }

  seePropertyDetails(id: any) {
    this.router.navigate(
      [`propertyDetails/${id}`],
      { queryParams: { id: id, rfm: 'home', owid: this.openWindowId } }
    );
  }

  toggleNotice() {
    this.isNoticeExpanded = !this.isNoticeExpanded;
  }
}
