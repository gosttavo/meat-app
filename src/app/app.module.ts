import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import locatePt from '@angular/common/locales/pt';

registerLocaleData(locatePt, 'pt');

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ShoppingCartComponent } from './restaurant-detail/shopping-cart/shopping-cart.component'; 
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './security/login/login.component';
import { UserDetailComponent } from './header/user-detail/user-detail.component';
import { AppErrorHandler } from './app.error-handler';
import { OrderHistoricComponent } from './order-historic/order-historic.component';
import { HistoricCardComponent } from './order-historic/historic-card/historic-card.component';
import { HistoricService } from './order-historic/order-historic.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SignUpComponent } from './security/sign-up/sign-up.component';
import { ReviewChatComponent } from './restaurant-detail/review-chat/review-chat.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,   
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    OrderSummaryComponent,
    NotFoundComponent,
    LoginComponent,
    UserDetailComponent,
    OrderHistoricComponent,
    HistoricCardComponent,
    SignUpComponent,
    ReviewChatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules}),
    ReactiveFormsModule,
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    })
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'},
    {provide: ErrorHandler, useClass: AppErrorHandler}, 
    HistoricService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
