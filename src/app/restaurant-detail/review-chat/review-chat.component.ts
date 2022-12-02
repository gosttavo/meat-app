import { animate, state, style, transition, trigger } from '@angular/animations';

import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginService } from 'app/security/login/login.service';
import { ReviewService } from '../reviews/reviews.service';

import { Review } from '../reviews/reviews.model';
import { RestaurantService } from 'app/restaurants/restaurants.service';
import { Restaurant } from 'app/restaurants/restaurant/restaurant.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-review-chat',
  templateUrl: './review-chat.component.html',
  providers: [DatePipe],
  animations: [
    trigger('toggleChat', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "100px"
      })),
      transition('* => *', animate('0ms 0s ease-in-out'))
    ])
  ]
})

export class ReviewChatComponent implements OnInit {

  restaurantId: string;

  restaurant: Restaurant;

  toggleState = 'hidden';

  chatForm: FormGroup;

  notificationService: any;

  date = new Date();

  constructor(
      private loginService: LoginService,
      private restaurantService: RestaurantService,
      private reviewsService: ReviewService,
      public datepipe: DatePipe,
      private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.doCreateChatForm();
  }

  doCreateChatForm() {
    this.chatForm = new FormGroup({
      comment: new FormControl('', {
        validators: [Validators.required]
      }),
      rating: new FormControl(0, {
        validators: [Validators.required]
      }),
      date: new FormControl(this.getDate(), {
        validators: [Validators.required]
      })
    })
  }

  getDate() {
    let newDate = this.datepipe.transform(this.date, 'yyyy-MM-dd')
    return newDate;
  }

  doGetRestaurantId() {
    this.restaurantId = this.route.parent.snapshot.params['id'];
    return this.restaurantId;
  }

  doGetRestaurant(): Restaurant {
    let restaurants: Restaurant[] = this.restaurantService.restaurant;
    let restaurantId = this.doGetRestaurantId();
    let rest: any;

    restaurants.forEach(restaurant => {
      if (restaurant.id == restaurantId) {
        rest = restaurant;
      }
    });

    console.log(rest);
    return this.restaurant = rest;
  }

  postReview(review: Review) {
    console.log('===REVIEW===', review)
    this.reviewsService.postReview(review)
  }

  toggleAppear() {
    this.toggleState = this.toggleState === 'hidden' ? 'visible' : 'hidden';
  }

}
