import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantService } from './restaurants.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[];

  //construtor vai receber o serviço
  constructor(private restaurantsService: RestaurantService) { }

  //inicializar o componente
  ngOnInit() {
    //subscribe para fazer requisição http
    //restaurants vai receber a lista de restaurantes e vai passar para a propriedade
    this.restaurantsService.restaurants()
    .subscribe(restaurants => this.restaurants = restaurants);
  }

}
