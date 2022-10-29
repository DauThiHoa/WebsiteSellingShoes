import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Contact} from "../models/contact";
import {HttpClient} from "@angular/common/http";

const _api = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {

  }
  getContact(): Observable<Array<Contact>>{
    return this.http.get<Array<Contact>>(_api + 'contact');
  }
  getList (_limit : number = 4, search_key:any = null): Observable<Array<Contact>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/contact/?_limit='+ _limit + '&_sort=id&_order=desc';
    if ( search_key != null ){
      url += '&name_like=' + search_key; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
    }
    return this.http.get<Array<Contact>> (url);
  }

  getSearchName (search_key: string): Observable<Array<Contact>>{ // ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/contact/?name_like=' + search_key  ; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
    return this.http.get<Array<Contact>> (url);
  }

  getRelatedContact  (_limit : number = 4 , like_key: string): Observable<Array<Contact>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    // http://localhost:3000/Contact?category_like=game

    let url = 'http://localhost:3000/contact/?_limit='+ _limit + '&category_like=' + like_key;
    return this.http.get<Array<Contact>> (url);
  }
  getRelated  (like_key: string): Observable<Array<Contact>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    // http://localhost:3000/Contact?category_like=game

    let url = 'http://localhost:3000/contact/?category_like='+ like_key;
    return this.http.get<Array<Contact>> (url);
  }
  /*
  Them moi
  POST : http://localhost:3000/Contact
   */
  create(data: any): Observable<any>{
    return this.http.post<any> ('http://localhost:3000/contact/' , data);
  }

  // GET/:id: http://localhost:3000/Contact/1
  getOne(id: number): Observable<Contact>{
    return this.http.get<Contact> ('http://localhost:3000/contact/' + id);
  }

  // PUT/:id: http://localhost:3000/Contact/1
  update(id: number, data: any): Observable<any>{
    return this.http.put<any> ('http://localhost:3000/contact/' + id , data);
  }

  // DELETE/:id: http://localhost:3000/Contact/1
  delete(id: number): Observable<any>{
    return this.http.delete<any> ('http://localhost:3000/contact/' + id);
  }

  private getData(url: string, header: object = {}): Observable<any> {
    return this.http.get<any[]>(url, header);
  }

  getContacts(): Observable<any[]> {
    return this.getData('http://localhost:4200/assets/data.json');
  }

}
