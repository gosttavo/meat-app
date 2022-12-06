import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'app/restaurants/restaurants.service';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { ReviewService } from './reviews.service';
import { Review } from './reviews.model';
import { LoginService } from 'app/security/login/login.service';
import { User } from 'app/security/login/user.model';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html',
  animations: [
    trigger('reviewAppeared', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms 0s ease-in')
      ])
    ])
  ]
})
export class ReviewsComponent implements OnInit {

  reviewState = 'ready';

  user: User;

  @Input() reviews: Review[];

  constructor(private restaurantsService: RestaurantService,
    private loginService: LoginService,
    private reviewsService: ReviewService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //sub-rota -> parent.snapshot
    // this.reviews = this.restaurantsService
    // .restaurantsReviews(this.route.parent.snapshot.params['id']);
    this.doGetReviews();
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }
  
  doGetReviews() {
    this.reviewsService.reviews().subscribe(reviews => { this.reviews = reviews }
      , resError => { console.log('=== erro ===', resError) });
  }
}
