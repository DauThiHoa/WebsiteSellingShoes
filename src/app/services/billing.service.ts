import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cart} from "../models/cart";
import {Billing} from "../models/billing";

const _api = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  data: any[];
  constructor(private http: HttpClient) {}

  getBilling (): Observable<Array<Billing>>{
    return this.http.get<Array<Billing>>(_api + 'billing');
  }

  getList (_limit : number = 4, search_key:any = null): Observable<Array<Billing>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/billing/?_limit='+ _limit + '&_sort=id&_order=desc';
    if ( search_key != null ){
      url += '&name_like=' + search_key; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
    }
    return this.http.get<Array<Billing>> (url);
  }

  /*
  Them moi
  POST : http://localhost:3000/product
   */

  create (data: any): Observable<any>{
    return this.http.post<any> ('http://localhost:3000/billing/' , data);
  }

  // GET/:id: http://localhost:3000/product/1
  getOne(id: number): Observable<Billing>{
    return this.http.get<Billing> ('http://localhost:3000/billing/' + id);
  }

  // PUT/:id: http://localhost:3000/product/1
  update(id: number, data: any): Observable<any>{
    return this.http.put<any> ('http://localhost:3000/billing/' + id , data);
  }

  // DELETE/:id: http://localhost:3000/product/1
  delete(id: number): Observable<any>{
    return this.http.delete<any> ('http://localhost:3000/billing/' + id);
  }

  private getData(url: string, header: object = {}): Observable<any> {
    return this.http.get<any[]>(url, header);
  }

  getBillings(): Observable<any[]> {
    return this.getData('http://localhost:4200/assets/data.json');
  }
}
