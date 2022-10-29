import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Register} from "../models/register";

const _api = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  data: any[];

  constructor(private http: HttpClient) {}

  getRegister(): Observable<Array<Register>>{
    return this.http.get<Array<Register>>(_api + 'register');
  }
  getList (_limit : number = 4, search_key:any = null): Observable<Array<Register>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/register/?_limit='+ _limit + '&_sort=id&_order=desc';
    if ( search_key != null ){
      url += '&name_like=' + search_key; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
    }
    return this.http.get<Array<Register>> (url);
  }

  getSearchName (search_key: string): Observable<Array<Register>>{ // ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/register/?name_like=' + search_key  ; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
    return this.http.get<Array<Register>> (url);
  }

  getRelatedregister  (_limit : number = 4 , like_key: string): Observable<Array<Register>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    // http://localhost:3000/register?category_like=game

    let url = 'http://localhost:3000/register/?_limit='+ _limit + '&category_like=' + like_key;
    return this.http.get<Array<Register>> (url);
  }
  getRelated  (like_key: string): Observable<Array<Register>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    // http://localhost:3000/register?category_like=game

    let url = 'http://localhost:3000/register/?category_like='+ like_key;
    return this.http.get<Array<Register>> (url);
  }
  /*
  Them moi
  POST : http://localhost:3000/register
   */
  create(data: any): Observable<any>{
    return this.http.post<any> ('http://localhost:3000/register/' , data);
  }

  // GET/:id: http://localhost:3000/register/1
  getOne(id: number): Observable<Register>{
    return this.http.get<Register> ('http://localhost:3000/register/' + id);
  }

  // PUT/:id: http://localhost:3000/register/1
  update(id: number, data: any): Observable<any>{
    return this.http.put<any> ('http://localhost:3000/register/' + id , data);
  }

  // DELETE/:id: http://localhost:3000/register/1
  delete(id: number): Observable<any>{
    return this.http.delete<any> ('http://localhost:3000/register/' + id);
  }

  private getData(url: string, header: object = {}): Observable<any> {
    return this.http.get<any[]>(url, header);
  }

  getregisters(): Observable<any[]> {
    return this.getData('http://localhost:4200/assets/data.json');
  }

}
