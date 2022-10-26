import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantService } from './restaurants.service';

import { animate, state, style, transition, trigger } from '@angular/animations';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';

import { Observable } from 'rxjs/Observable';

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

  toggleState = 'hidden';

  restaurants: Restaurant[];

  //propriedades pra representar a search bar
  searchForm: FormGroup;
  //vai ouvir valores digitados
  searchControl: FormControl;

  //construtor vai receber o serviço
  constructor(private restaurantsService: RestaurantService,
              private fb: FormBuilder) { }

  //inicializar o componente
  ngOnInit() {

    //reactive forms
    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    //vai ouvir o que o usuário digitar
    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(searchTerm => this.restaurantsService.restaurants(searchTerm)
        .catch(error => Observable.from([]))) //caso a query dê erro
      .subscribe(restaurants => this.restaurants = restaurants);


    //subscribe para fazer requisição http
    //restaurants vai receber a lista de restaurantes e vai passar para a propriedade
    this.restaurantsService.restaurants()
    .subscribe(restaurants => this.restaurants = restaurants);
  }

  toggleAppear(){
    this.toggleState = this.toggleState === 'hidden' ? 'visible' : 'hidden';
  }

}
