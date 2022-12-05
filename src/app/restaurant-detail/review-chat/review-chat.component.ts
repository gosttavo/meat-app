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
import { User } from 'app/security/login/user.model';
import { tap } from 'rxjs/operators';

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

  //#region === variáveis ===

  restaurantId: string;
  restaurant: Restaurant;
  userInfo: User;
  reviewId: string;

  toggleState = 'hidden';

  chatForm: FormGroup;

  notificationService: any;

  date = new Date();

  //#endregion

  constructor(
    private loginService: LoginService,
    private restaurantService: RestaurantService,
    private reviewsService: ReviewService,
    public datepipe: DatePipe,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.doCreateChatForm();
    this.doGetRestaurant();
  }

  //#region === Funções de formulário ===

  doCreateChatForm() {
    this.chatForm = new FormGroup({
      comments: new FormControl('', {
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
    return this.datepipe.transform(this.date, 'yyyy-MM-dd')
  }

  doClearOrderForm() {
    if (this.chatForm) {
      this.chatForm.reset();
      this.doCreateChatForm();
    }
  }

  //#endregion

  //#region === Funções de Restaurant ===

  doGetRestaurantId() {
    let restId: string;
    return restId = this.route.parent.snapshot.params['id'];
  }

  doGetRestaurant() {
    this.restaurantId = this.doGetRestaurantId();

    console.log('===RESTAURANT ID===', this.restaurantId)

    this.restaurantService
      .restaurantsById(this.restaurantId)
      .subscribe(restaurant => {
        console.log('===RESTAURANT===', restaurant)
        this.restaurant = restaurant
      });
  }

  //#endregion

  //#region === Funções de Usuário ===

  user(): User {
    return this.loginService.user;
  }

  //#endregion

  postReview(review: Review) {
    review.restaurant = this.doGetRestaurantId();
    review.user = this.user().id;

    console.log('===REVIEW===', review);

    this.reviewsService.postReview(review)
      .pipe(tap((reviewId: string) => {
        this.reviewId = reviewId;
      }))

    this.toggleAppear();
    this.doClearOrderForm();
  }

  toggleAppear() {
    this.toggleState = this.toggleState === 'hidden' ? 'visible' : 'hidden';
  }

}
