import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { from } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantService } from './restaurants.service';

import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  //#region === VARIÁVEIS ===

  @Input() restaurants: Restaurant[];
  @Input() restaurant: Restaurant;
  toggleState = 'hidden';

  currentPage: number = 1;
  pageSize: number = 8;

  loginService: any;

  searchControl: FormControl;//vai ouvir valores digitados

  router: any;

  actualPage: number;

  //#endregion

  constructor(private restaurantsService: RestaurantService) { }

  ngOnInit() {
    this.loadRestaurants();
    this.doCreateSearchBar();
    this.doReadValueChanges();
  }

  //#region === LOAD FUNCTIONS ===

  loadRestaurants() {
    this.currentPage = 1;
    this.doGetRestaurants();
  }

  loadFilters(currentPage?, searchTerm?) {
    let filters = {page: currentPage, search: searchTerm};

    filters['page'] = currentPage;
    filters['search'] = searchTerm;

    this.doGetRestaurants(filters);
  }

  verifyPreviousPage(): boolean {
    let verify = false;
    if(this.currentPage === 1){
      verify = true;
    }
    
    return verify;
  }

  verifyPage(){
    console.log(this.restaurantsService.restaurants)
  }

  loadNextPage() {
    this.currentPage++;
    this.loadFilters(this.currentPage);
  }

  loadPreviousPage() {
    this.currentPage--;
    this.loadFilters(this.currentPage);
  }

  //#endregion === Fim LOAD FUNCTIONS ===

  //#region === FUNÇÕES SEARCH BAR ===

  doCreateSearchBar() {
    this.searchControl = new FormControl('');
  }

  doReadValueChanges() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(searchTerm => this.restaurantsService
          .restaurants({search: searchTerm})
          .pipe(catchError(error => from([]))))
      )
      .subscribe(restaurants => this.restaurants = restaurants);
  }

  doGetRestaurants(filters?: any) {
    this.restaurantsService
      .restaurants(filters)
      .subscribe(restaurants => {
        console.log('=== load next ===', restaurants)
        this.restaurants = restaurants
      }, resError => {
        console.log('=== erro ===', resError)
      });
  }

  toggleAppear() {
    this.toggleState = this.toggleState === 'hidden' ? 'visible' : 'hidden';
  }

  //#endregion

}
