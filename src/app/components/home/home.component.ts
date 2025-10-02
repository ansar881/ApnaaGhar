import { Component, OnInit } from '@angular/core';
import { allPrimeNGModules } from '../../services/primeNGShared';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';
import { Guid } from 'guid-typescript'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [allPrimeNGModules],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  propertiesData:any[] = [];
  responsiveOptions:any[] = [];
  propertiesCategory:any[] = [];
  multiShowProperties:any[] = [];
  multiPropertiesData:any[] = [];
  searchTabDataSource:any[] = [];
  openWindowId!:Guid;
  isNoticeExpanded: boolean = false;

  constructor(private router: Router, private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.openWindowId = Guid.create();
    this.propData();
  }

  propData(){
    this.searchTabDataSource = [
      { title: 'BUY', category: 'buy' },
      { title: 'RENT / PG', category: 'rent/pg' },
      { title: 'PROJECTS', category: 'projects' },
      { title: 'COMMERICAL', category: 'commerical' },
      { title: 'DEALERS', category: 'dealers' }
    ];
    
    this.propertiesData = this.sharedDataService.propertiesData;

    this.multiPropertiesData = this.sharedDataService.multiPropertiesData;

    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
    ];

    this.propertiesCategory = [
      { proptitle: 'Top Trending', propData: this.propertiesData },
      { proptitle: 'Spotlights', propData: this.propertiesData },
    ]

    let multiPropDatas = [
      { parentTitle: 'Top New Project', data: this.multiPropertiesData },
      { parentTitle: 'Top New Project', data: this.multiPropertiesData },
      { parentTitle: 'Top New Project', data: this.multiPropertiesData },
      { parentTitle: 'Top New Project', data: this.multiPropertiesData },
      { parentTitle: 'Top New Project', data: this.multiPropertiesData },
      { parentTitle: 'Top New Project', data: this.multiPropertiesData },
    ]
    
    this.multiShowProperties = [
      { proptitle: 'Top New Projects', propData: multiPropDatas }
    ]

  }

  homeSearchClicked(tab:any, serchVal:any){
    if(serchVal.value){
      this.router.navigate(
        ['/showAll'],
        { queryParams: { tab: tab.title, rfm:'home', category: tab.category, searchValue: serchVal.value, owid: this.openWindowId }}
      );
    }
  }

  seePropertyDetails(id:any){
    this.router.navigate(
      [`propertyDetails/${id}`],
      { queryParams: { id: id, rfm:'home', owid: this.openWindowId } }
    );
  }

  toggleNotice() {
    this.isNoticeExpanded = !this.isNoticeExpanded;
  }

  noticeText: string = `This is a personal project and not a business project. 
  It has no connection with any business or commercial entity. The design, 
  architecture, and all other aspects of this project have been created 
  independently and are not copied from any other platform, project, or website. 
  While certain elements may appear similar to those on other platforms or websites, 
  this project has no affiliation with them in any way.`;
  
}
