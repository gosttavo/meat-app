import { Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { MenuComponent } from "./restaurant-detail/menu/menu.component";
import { RestaurantDetailComponent } from "./restaurant-detail/restaurant-detail.component";
import { ReviewsComponent } from "./restaurant-detail/reviews/reviews.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { LoginComponent } from "./security/login/login.component";

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'restaurants', component: RestaurantsComponent},
    {path: 'restaurants/:id', component: RestaurantDetailComponent,
        children: [
            {path: '', redirectTo: 'menu', pathMatch: 'full'},
            {path: 'menu', component:MenuComponent},
            {path: 'reviews', component:ReviewsComponent},
    ]},
    {path: 'order', loadChildren: './order/order.module#OrderModule'}, //Lazy loading
    {path: 'order-summary', component: OrderSummaryComponent},
    {path: 'about', loadChildren: './about/about.module#AboutModule'}, //lazy loading
    {path: '**', component: NotFoundComponent} //rota wildcard - nao encontrado
]