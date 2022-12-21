import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Banner} from "../models/banner";

const _api = 'http://localhost:3000/';
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) {}

  makePayment(stripeToken: any): Observable<any>{
    const url = "http://localhost:5000/checkout/"

    return this.http.post<any>(url,{token:stripeToken})
  }

}
