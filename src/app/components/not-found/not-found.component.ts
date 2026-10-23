import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { allPrimeNGModules } from '../../services/primeNGShared';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [...allPrimeNGModules]
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
