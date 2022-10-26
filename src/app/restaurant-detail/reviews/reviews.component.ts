import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'app/restaurants/restaurants.service';
import { Observable } from 'rxjs/Observable';

import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html',
  animations: [
    trigger('reviewAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translateY(-20px)'}),
        animate('300ms 0s ease-in')
      ])
    ])
  ]
})
export class ReviewsComponent implements OnInit {

  reviewState = 'ready';

  reviews: Observable<any>

  constructor(private restaurantsService: RestaurantService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //sub-rota -> parent.snapshot
    this.reviews = this.restaurantsService
    .restaurantsReviews(this.route.parent.snapshot.params['id']);
  }

}
