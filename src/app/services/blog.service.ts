import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Blog} from "../models/blog";

const _api = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) {

  }
  getblog(): Observable<Array<Blog>>{
    return this.http.get<Array<Blog>>(_api + 'blog');
  }
  getList (_limit : number = 4, search_key:any = null): Observable<Array<Blog>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/blog/?_limit='+ _limit + '&_sort=id&_order=desc';
    if ( search_key != null ){
      url += '&name_like=' + search_key; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
    }
    return this.http.get<Array<Blog>> (url);
  }

  getSearchName (search_key: string): Observable<Array<Blog>>{ // ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/blog/?name_like=' + search_key  ; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
    return this.http.get<Array<Blog>> (url);
  }

  getRelatedblog  (_limit : number = 4 , like_key: string): Observable<Array<Blog>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    // http://localhost:3000/blog?category_like=game

    let url = 'http://localhost:3000/blog/?_limit='+ _limit + '&category_like=' + like_key;
    return this.http.get<Array<Blog>> (url);
  }
  getRelated  (like_key: string): Observable<Array<Blog>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    // http://localhost:3000/blog?category_like=game

    let url = 'http://localhost:3000/blog/?category_like='+ like_key;
    return this.http.get<Array<Blog>> (url);
  }
  /*
  Them moi
  POST : http://localhost:3000/blog
   */
  create(data: any): Observable<any>{
    return this.http.post<any> ('http://localhost:3000/blog/' , data);
  }

  // GET/:id: http://localhost:3000/blog/1
  getOne(id: number): Observable<Blog>{
    return this.http.get<Blog> ('http://localhost:3000/blog/' + id);
  }

  // PUT/:id: http://localhost:3000/blog/1
  update(id: number, data: any): Observable<any>{
    return this.http.put<any> ('http://localhost:3000/blog/' + id , data);
  }

  // DELETE/:id: http://localhost:3000/blog/1
  delete(id: number): Observable<any>{
    return this.http.delete<any> ('http://localhost:3000/blog/' + id);
  }

  private getData(url: string, header: object = {}): Observable<any> {
    return this.http.get<any[]>(url, header);
  }

  getblogs(): Observable<any[]> {
    return this.getData('http://localhost:4200/assets/data.json');
  }

}
