import { AfterViewInit, Component, OnInit } from '@angular/core';
import { allPrimeNGModules } from '../../services/primeNGShared';
import { FormsModule } from '@angular/forms';
import { SharedDataService } from '../../services/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css'],
  standalone: true,
  imports: [allPrimeNGModules, FormsModule],
})
export class ShowAllComponent implements OnInit, AfterViewInit{
  filerBtns:any[] = [];
  propertyTypeOptions:any[] = [];
  priceOptions:any[] = [];
  BHKOptions:any[] = [];
  ownershipOptions:any[] = [];
  filterOptionsData:any[] = [];
  popupUi:any;
  minPrice:number = 0;
  maxPrice:number = 1000000000;
  priceRangeValues: number[] = [this.minPrice, this.maxPrice];
  multiPropertiesData:any[] = [];
  openWindowId!:any;
  searchedValue:string = '';
  propCategory:any[] = [];
  selectedPropCategory:any | undefined;
  searchData:any = {};

  constructor(private sharedDataService: SharedDataService, private router:Router, private actRoute:ActivatedRoute) { }

  ngOnInit() {
    this.filerBtns = [
      {btnName: 'Property Type', badgeVal: 0},
      {btnName: 'Price', badgeVal: 0},
      {btnName: 'BHK', badgeVal: 0},
      {btnName: 'Ownership', badgeVal: 0}
    ]
    this.optionsData();
    this.showAllData();
  }

  ngAfterViewInit(){
    this.actRoute.queryParams.subscribe((params) => {
      this.searchData = params;
      this.openWindowId = params['owid'];
      setTimeout(()=>{
        this.searchedValue = this.searchData['searchValue'] ? this.searchData['searchValue'] 
        : this.searchData['cityname'] ? this.searchData['cityname'] : '';

        this.selectedPropCategory = this.propCategory.find(data=>data['category'].includes(this.searchData['category']));
      },0)
    });
  }

  showAllData(){
    let multiPropertiesData = JSON.parse(JSON.stringify(this.sharedDataService.multiPropertiesData));
    let imageData = JSON.parse(JSON.stringify(this.sharedDataService.imageList));
    let imageList = imageData.map((img:any)=>{
      img['imageUrl'] = '../../../assets/images/'+img.imageUrl
      return img
    });
    let multiPropData = multiPropertiesData.map((data: any)=>{
      data['imageList'] = this.shuffleArray(imageList);
      return data;
    });
    for(let i=0; i<5; i++){
      this.multiPropertiesData.push(...multiPropData);
    }
  }

  optionsData(){
    this.propertyTypeOptions = [
      { name: 'Flats', type: 'Property Type', value: false },
      { name: 'Residential Plots', type: 'Property Type', value: false },
      { name: 'House', type: 'Property Type', value: false },
      { name: 'Villa', type: 'Property Type', value: false },
      { name: 'Builder Floors', type: 'Property Type', value: false },
      { name: 'Farm House', type: 'Property Type', value: false },
      { name: 'Penthouse', type: 'Property Type', value: false },
      { name: 'Agricultural Land', type: 'Property Type', value: false },
      { name: 'Commercial Land', type: 'Property Type', value: false },
      { name: 'Office Space', type: 'Property Type', value: false },
      { name: 'Commercial Shops', type: 'Property Type', value: false },
      { name: 'Hotels', type: 'Property Type', value: false },
      { name: 'Business Center', type: 'Property Type', value: false }
    ];

    this.BHKOptions = [
      { name: '1 RK', type: 'BHK', value: false },
      { name: '1 BHK', type: 'BHK', value: false },
      { name: '2 BHK', type: 'BHK', value: false },
      { name: '3 BHK', type: 'BHK', value: false },
      { name: '4 BHK', type: 'BHK', value: false },
      { name: '5 BHK', type: 'BHK', value: false },
      { name: '5+ BHK', type: 'BHK', value: false }
    ];

    this.ownershipOptions = [
      { name: 'Agent', type: 'Ownership', value: false },
      { name: 'Individual', type: 'Ownership', value: false },
      { name: 'Builder', type: 'Ownership', value: false }
    ];

    this.propCategory = [
      { type: 'Buy', category: 'buy' },
      { type: 'Rent/Pg', category: 'rent/pg' },
      { type: 'Projects', category: 'projects' },
      { type: 'Commerical', category: 'commerical' },
      { type: 'Dealers', category: 'dealers' }
    ]
  }

  popupToggle(e:any, btnName:any, popup:any){
    this.popupUi = btnName;
    if(btnName === 'Property Type'){
      this.filterOptionsData = this.propertyTypeOptions;
    }else if(btnName === 'BHK'){
      this.filterOptionsData = this.BHKOptions;
    }else if(btnName === 'Ownership'){
      this.filterOptionsData = this.ownershipOptions;
    }
    popup.toggle(e);
  }

  filterCheckBoxValueChanged(e:any, option:any){
    if(option.type === 'Property Type'){
      let data = this.propertyTypeOptions.find(op=>op.name === option.name);
      data.value = e.checked;
      this.badgeValueChange(option, this.propertyTypeOptions);
    }else if(option.type === 'BHK'){
      let data = this.BHKOptions.find(op=>op.name === option.name);
      data.value = e.checked;
      this.badgeValueChange(option, this.BHKOptions);
    }else if(option.type === 'Ownership'){
      let data = this.ownershipOptions.find(op=>op.name === option.name);
      data.value = e.checked;
      this.badgeValueChange(option, this.ownershipOptions);
    }
  }

  badgeValueChange(option:any, data:any[]){
    let batch = this.filerBtns.find(btn=>btn.btnName === option.type);
    let chooseOptions = data.filter(choose=>choose.value === true);
    batch.badgeVal = chooseOptions.length;
  }

  sliderValueChanged(e:any){
    this.minPrice = e.values[0];
    this.maxPrice = e.values[1];
  }

  priceValueChanged(e:any, type:string){
    if(type === 'minPrice'){
      this.minPrice = e.value;
    }else{
      this.maxPrice = e.value;
    }
  }

  seeDetailsOfProperty(id:any){
    this.router.navigate(
      [`propertyDetails/${id}`],
      { queryParams:{ id: id, rfm: 'showAll', owid: this.openWindowId } }
    )
  }

  shuffleArray(array: any[]): any[] {
    const copiedArray = [...array];
    for (let i = copiedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
    }
    return copiedArray;
  }
}
