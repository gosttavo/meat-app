import { Component, OnInit } from '@angular/core';
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
  
  restaurants: Restaurant[];
  loginService: any;

  toggleState = 'hidden';

  searchControl: FormControl;//vai ouvir valores digitados

  constructor(
    private restaurantsService: RestaurantService
    ) { }

  ngOnInit() {
    //subscribe para fazer requisição http
    this.restaurantsService.restaurants()
    .subscribe(restaurants => this.restaurants = restaurants);

    this.doCreateSearchBar();
    this.doReadValueChanges();
  }

  doCreateSearchBar() {
    this.searchControl = new FormControl('');
  }

    doReadValueChanges() {
    this.searchControl.valueChanges
    .pipe(
      debounceTime(500), 
      distinctUntilChanged(), 
      switchMap(searchTerm => this.restaurantsService
        .restaurants(searchTerm)
        .pipe(catchError(error => from([]))))
    )
    .subscribe(restaurants => this.restaurants = restaurants);
  }

  toggleAppear() {
    this.toggleState = this.toggleState === 'hidden' ? 'visible' : 'hidden';
  }

}
