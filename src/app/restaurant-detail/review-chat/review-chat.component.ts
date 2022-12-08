import { animate, state, style, transition, trigger } from '@angular/animations';

import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginService } from 'app/security/login/login.service';
import { ReviewService } from '../reviews/reviews.service';

import { Review } from '../reviews/reviews.model';
import { RestaurantService } from 'app/restaurants/restaurants.service';
import { Restaurant } from 'app/restaurants/restaurant/restaurant.model';
import { ActivatedRoute } from '@angular/router';
import { User } from 'app/security/login/user.model';

@Component({
  selector: 'mt-review-chat',
  templateUrl: './review-chat.component.html',
  providers: [DatePipe],
  animations: [
    trigger('toggleChat', [
      state('hidden', style({
        display: 'none',
        "max-height": "0px"
      })),
      state('visible', style({
        display: 'block',
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('0s 0s ease-in-out'))
    ])
  ]
})
export class ReviewChatComponent implements OnInit {

  //#region === variáveis ===
  reviewId: string;
  restaurantId: string; 
  ratingValue: number = 5; 

  restaurant: Restaurant;
  userInfo: User;
  chatForm: FormGroup;
  date = new Date();

  toggleState = 'hidden';

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
      comments: new FormControl(''),
      rating: new FormControl(5, {validators: [Validators.required]}),
      date: new FormControl(this.getDate(), {validators: [Validators.required]})
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

  toggleAppear() {
    this.toggleState = this.toggleState === 'hidden' ? 'visible' : 'hidden';
  }

  doCloseModal() {
    this.doClearOrderForm();
    this.toggleAppear();
  }
  
  //#endregion

  //#region === Funções de Restaurant ===

  doGetRestaurantId() {
    this.restaurantId = this.route.parent.snapshot.params['id'];
  
    return this.restaurantId;
  }

  doGetRestaurant() {
    this.doGetRestaurantId();

    console.log('===RESTAURANT ID===', this.restaurantId)

    this.restaurantService
      .restaurantsById(this.restaurantId)
      .subscribe(restaurant => {
        console.log('===RESTAURANT===', restaurant);
        this.restaurant = restaurant;
      });
  }

  //#endregion

  //#region === Funções de Usuário ===

  user(): User {
    return this.loginService.user;
  }

  //#endregion

  //#region === Funções de Review ===

  doCompleteReviewBody(review: Review){
    review.rating = this.ratingValue;
    review.restaurant = this.doGetRestaurantId();
    review.user = this.user().id;
    review.userName = this.user().name;

    this.postReview(review);
  }

  postReview(review: Review) {
    console.log('===REVIEW===', review);

    this.reviewsService.postReview(review).subscribe(res => {
      console.log('=== res postReview ===', res);
    }, resError => {
      console.log('===ERROR postReview ===', resError);
    }, () => {
    
    })

    this.doCloseModal();
  }

  rate(evt){
    this.ratingValue = evt;
    console.log('===RATE FUNCTION===', this.ratingValue);
  }

  //#endregion

}
