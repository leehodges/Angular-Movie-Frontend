import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewApi: string;
  constructor(
    private http: HttpClient
  ) {
    this.reviewApi = `${environment.apiUrl}api/v1/reviews`;
  }
  getAllReview() {
    return this.http.get<any>(`${this.reviewApi}/index`);
  }
  createReview(params){
    return this.http.post<any>(`${this.reviewApi}/create`, params)
  }
  updateReviews(params){
    return this.http.patch<any>(`${this.reviewApi}/update`, params)
  }
  deleteReviews(params){
    return this.http.delete<any>(`${this.reviewApi}/${params.id}`)
  }
}
