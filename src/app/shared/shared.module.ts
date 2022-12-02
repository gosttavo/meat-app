import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { OrderService } from "app/order/order.service";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantService } from "app/restaurants/restaurants.service";

import { InputComponent } from "./input/input.component";
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";
import { SnackbarComponent } from './messages/snackbar/snackbar.component'
import { NotificationService } from "./messages/notification.service";
import { LoginService } from "app/security/login/login.service";
import { LoggedInGuard } from "app/security/loggedin.guard";
import { LeaveOrderGuard } from "app/order/leave-order.guard";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "app/security/auth.interceptor";
import { SignUpService } from "app/security/sign-up/sign-up.service";
import { ReviewService } from "app/restaurant-detail/reviews/reviews.service";

@NgModule({
    declarations: [
        InputComponent, 
        RadioComponent, 
        RatingComponent, 
        SnackbarComponent
    ],
    imports: [
        FormsModule, 
        ReactiveFormsModule, 
        CommonModule
    ],
    exports: [
        InputComponent, 
        RadioComponent, 
        RatingComponent, 
        FormsModule, 
        ReactiveFormsModule, 
        CommonModule,
        SnackbarComponent
    ]
})
export class SharedModule {
    //função que vai retornar módulo com providers 
    static forRoot(): ModuleWithProviders{
        return{
            ngModule: SharedModule,
            providers: [
                ShoppingCartService, 
                RestaurantService, 
                OrderService,
                NotificationService,
                LoginService,
                LoggedInGuard,
                LeaveOrderGuard,
                SignUpService,
                ReviewService,
                {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
            ]
        }
    }
}