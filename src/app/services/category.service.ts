import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/category";

const _api = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getCategory(): Observable<Array<Category>>{
    return this.http.get<Array<Category>>(_api + 'category');
  }
  /*
  Danh sach
  GET : http://localhost:3000/category
   */
  // getList(_limit : number = 4): Observable<Array<Category>>{ // Mặc định hiển thị 4 sản phẩm
  //   return this.http.get<Array<Category>> ('http://localhost:3000/category/?_limit='+ _limit + '&_sort=id&_order=desc');
  // => Hiển thị 2 sản phẩm trong danh sách sản phẩm ( ?_limit=2 )
  // => Sắp xếp theo id ( _sort=id )
  // => Theo thứ tự giảm dần của id ( _order=desc )
  // return this.http.get<Array<Category>> ('http://localhost:3000/category');
  // }
  /*
     http://localhost:3000/category/?_limit=3&_page=1 => 1 2 3 ( Hiển thị 3 sản phẩm đầu tiên ) => PHÂN TRANG TÌM KIẾM ( CHUYỂN XEM CÁC KHUNG SẢN PHẨM KHÁC )
     http://localhost:3000/category/?_limit=3&_page=2 => 4 5 6 ( Hiển thị 3 sản phẩm tiếp theo )
   */
  getList (_limit : number = 4, search_key:any = null): Observable<Array<Category>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/category/?_limit='+ _limit + '&_sort=id&_order=desc';
    if ( search_key != null ){
      url += '&name_like=' + search_key; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
    }
    return this.http.get<Array<Category>> (url);
  }

  /*
  Them moi
  POST : http://localhost:3000/category
   */
  create(data: any): Observable<any>{
    return this.http.post<any> ('http://localhost:3000/category/' , data);
  }

  // GET/:id: http://localhost:3000/category/1
  getOne(id: number): Observable<Category>{
    return this.http.get<Category> ('http://localhost:3000/category/' + id);
  }

  // PUT/:id: http://localhost:3000/category/1
  update(id: number, data: any): Observable<any>{
    return this.http.put<any> ('http://localhost:3000/category/' + id , data);
  }

  // DELETE/:id: http://localhost:3000/category/1
  delete(id: number): Observable<any>{
    return this.http.delete<any> ('http://localhost:3000/category/' + id);
  }

  private getData(url: string, header: object = {}): Observable<any> {
    return this.http.get<any[]>(url, header);
  }

  getCategorys(): Observable<any[]> {
    // this.data =[
    //   [
    //     "43836", "East", "Jones", "Pencil", 95, 1.99, 189.05],
    //   ["43853", "Central", "Kivell", "Binder", 50, 19.99, 999.5],
    //   ["43870", "Central", "Jardine", "Pencil", 36, 4.99, 179.64],
    //   ["43887", "Central", "Gill", "Pen", 27, 19.99, 539.73],
    //    ["43905", "West", "Sorvino", "Pencil", 56, 2.99, 167.44],
    //   ["43922", "East", "Jones", "Binder", 60, 4.99, 299.4],
    //   ["43939", "Central", "Andrews", "Pencil", 75, 1.99, 149.25],
    //    ["43956", "Central", "Jardine", "Pencil", 90, 4.99, 449.1]
    // ];
    return this.getData('http://localhost:4200/assets/data.json');
    // .subscribe(value => {
    //   for (const [k, v] of Object.entries(value)) {
    //     this.data.push(v);
    //   }
    // });
    // return of(this.data);
  }
}
