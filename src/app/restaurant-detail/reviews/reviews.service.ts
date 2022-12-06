import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MEAT_API } from "app/app.api";
import { Observable } from "rxjs";
import { Review } from "./reviews.model";
import { tap } from 'rxjs/operators';


@Injectable()
export class ReviewService {

    review: Review;

    constructor(private http: HttpClient) { }

    reviews(): Observable<Review[]> {
        return this.http.get<Review[]>(`${MEAT_API}/reviews`)
    }

    postReview(review: Review): Observable<Review> {
        console.log('=== SERVICE REVIEW ===', JSON.stringify(review));
        console.log('=== SERVICE REVIEW ===', review);

        return this.http.post<Review>(`${MEAT_API}/reviews`, review)
            .pipe(tap(review => this.review = review));
    }
}
