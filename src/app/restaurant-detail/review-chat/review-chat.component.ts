import { animate, style, transition, trigger } from '@angular/animations';

import { Component, OnInit, } from '@angular/core';
import { DatePipe } from '@angular/common'

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginService } from 'app/security/login/login.service';
import { ReviewService } from '../reviews/reviews.service';

import { Review } from '../reviews/reviews.model';
import { RestaurantService } from 'app/restaurants/restaurants.service';
import { Restaurant } from 'app/restaurants/restaurant/restaurant.model';
import { ActivatedRoute } from '@angular/router';
import { User } from 'app/security/login/user.model';
import { ReviewsComponent } from '../reviews/reviews.component';

@Component({
  selector: 'mt-review-chat',
  templateUrl: './review-chat.component.html',
  providers: [DatePipe],
  animations: [
    // fundo escuro que fica atrás do modal
    trigger('overlay', [
      transition(':enter', [
        // Inicia com o opacity zerado
        style({ opacity: 0 }),
        
        // efetua a animação de 250ms para o
        // o opacity de 0 até 0.5
        animate('250ms', style({ opacity: .5 })),
      ]),
      transition(':leave', [
        // Quando for esconder o overlay, 
        // anima do opacity atual, 0.5, até
        // o valor 0
        animate('500ms', style({ opacity: 0 }))
      ])
    ]),
    // animação na parte branca do modal
    trigger('modal', [
      transition(':enter', [
        // inicia com o modal "lá em cima"
        style({ top: -999 }),
        
        // e finaliza com o modal no meio da tela
        animate('500ms', style({ top: '50%' })),
      ]),
      transition(':leave', [
      
        // para esconder o modal, basta
        // "jogar ele lá para cima da tela"
        animate('250ms', style({ top: -999 }))
      ])
    ]),
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

  toggleAppear: boolean = false;

  toggle () {
    this.toggleAppear = !this.toggleAppear;
  }

  //#endregion

  constructor(
    private loginService: LoginService,
    private restaurantService: RestaurantService,
    private reviewsService: ReviewService,
    public datePipe: DatePipe,
    private route: ActivatedRoute,
    public reviewComponent: ReviewsComponent
  ) { }

  ngOnInit() {
    this.doCreateChatForm();
    this.doGetRestaurant();
  }

  //#region === Funções de formulário ===

  doCreateChatForm() {
    this.chatForm = new FormGroup({
      comments: new FormControl('', {validators: [Validators.required]}),
      rating: new FormControl(5, {validators: [Validators.required]}),
      date: new FormControl(this.getDate(), {validators: [Validators.required]})
    })
  }

  getDate() {
    return this.datePipe.transform(this.date, 'yyyy-MM-dd')
  }

  doClearOrderForm() {
    if (this.chatForm) {
      this.chatForm.reset();
      this.doCreateChatForm();
    }
  }

  doCloseModal() {
    this.doClearOrderForm();
    this.toggle();
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
    }, () => {});

    this.doCloseModal();

    this.reviewComponent.doGetReviews();
    console.log('===DO GET REVIEWS===');
  }

  rate(evt){
    this.ratingValue = evt;
    console.log('===RATE FUNCTION===', this.ratingValue);
  }

  //#endregion

}
