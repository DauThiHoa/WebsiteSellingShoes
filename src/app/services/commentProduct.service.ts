import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../models/comment";
import {CommentProduct} from "../models/commentProduct";

const _api = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})

export class CommentProductService {

  constructor(private http: HttpClient) {

  }
  getcomment(): Observable<Array<CommentProduct>>{
    return this.http.get<Array<CommentProduct>>(_api + 'commentProduct');
  }

  getList (_limit : number = 4, search_key:any = null): Observable<Array<CommentProduct>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/commentProduct/?_limit='+ _limit + '&_sort=id&_order=desc';
    if ( search_key != null ){
      url += '&name_like=' + search_key; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
    }
    return this.http.get<Array<CommentProduct>> (url);
  }

  getSearchName (search_key: string): Observable<Array<CommentProduct>>{ // ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/commentProduct/?name_like=' + search_key  ; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
    return this.http.get<Array<CommentProduct>> (url);
  }

  getRelatedcomment  (_limit : number = 4 , like_key: string): Observable<Array<CommentProduct>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    // http://localhost:3000/comment?category_like=game

    let url = 'http://localhost:3000/commentProduct/?_limit='+ _limit + '&category_like=' + like_key;
    return this.http.get<Array<CommentProduct>> (url);
  }
  getRelated  (like_key: string): Observable<Array<CommentProduct>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    // http://localhost:3000/comment?category_like=game

    let url = 'http://localhost:3000/commentProduct/?category_like='+ like_key;
    return this.http.get<Array<CommentProduct>> (url);
  }
  /*
  Them moi
  POST : http://localhost:3000/comment
   */
  create(data: any): Observable<any>{
    return this.http.post<any> ('http://localhost:3000/commentProduct/' , data);
  }

  // GET/:id: http://localhost:3000/comment/1
  getOne(id: number): Observable<CommentProduct>{
    return this.http.get<CommentProduct> ('http://localhost:3000/commentProduct/' + id);
  }

  // PUT/:id: http://localhost:3000/comment/1
  update(id: number, data: any): Observable<any>{
    return this.http.put<any> ('http://localhost:3000/commentProduct/' + id , data);
  }

  // DELETE/:id: http://localhost:3000/comment/1
  delete(id: number): Observable<any>{
    return this.http.delete<any> ('http://localhost:3000/commentProduct/' + id);
  }

  private getData(url: string, header: object = {}): Observable<any> {
    return this.http.get<any[]>(url, header);
  }

  getcomments(): Observable<any[]> {
    return this.getData('http://localhost:4200/assets/data.json');
  }

}
