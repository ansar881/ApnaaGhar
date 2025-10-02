import { AfterViewInit, Component, OnInit } from '@angular/core';
import { allPrimeNGModules } from '../../services/primeNGShared';
import { SharedDataService } from '../../services/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-propertyDetails',
  templateUrl: './propertyDetails.component.html',
  styleUrls: ['./propertyDetails.component.css'],
  standalone: true,
  imports: [allPrimeNGModules],
})
export class PropertyDetailsComponent implements OnInit, AfterViewInit {
  propertyId:any;
  routerFrom:any;
  propertyData:any = {};


  constructor(private sharedDataService: SharedDataService, private router:Router, private actRoute:ActivatedRoute) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.actRoute.queryParams.subscribe((params) => {
      this.propertyId = params['id'];
      this.routerFrom = params['rfm'];
    });
    setTimeout(()=>{
      if(this.propertyId)this.getDatafromService();
    },1000)
  }

  getDatafromService(){
    let multiPropertiesData = JSON.parse(JSON.stringify(this.sharedDataService.multiPropertiesData));
    let imageList = this.sharedDataService.imageList;
    let multiData = multiPropertiesData.find((data:any)=>data.id == this.propertyId);
    if(multiData){
      multiData['imageList'] = imageList;
      this.propertyData = multiData;
    }
  }
}
