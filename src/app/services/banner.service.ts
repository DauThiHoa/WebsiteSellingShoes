import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Banner} from "../models/banner";

const _api = 'http://localhost:3000/';
@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) {}

  getBanners(): Observable<Array<Banner>>{
    return this.http.get<Array<Banner>>(_api + 'banner');
  }
}
