import {NgModule} from '@angular/core';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product";

const _api = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  data: any[];
  // productsList : Array<Product> = [];

  constructor(private http: HttpClient) {}

  getProduct(): Observable<Array<Product>>{
    return this.http.get<Array<Product>>(_api + 'product');
  }
  /*
  Danh sach
  GET : http://localhost:3000/product
   */
  // getList(_limit : number = 4): Observable<Array<Product>>{ // Mặc định hiển thị 4 sản phẩm
  //   return this.http.get<Array<Product>> ('http://localhost:3000/product/?_limit='+ _limit + '&_sort=id&_order=desc');
  // => Hiển thị 2 sản phẩm trong danh sách sản phẩm ( ?_limit=2 )
  // => Sắp xếp theo id ( _sort=id )
  // => Theo thứ tự giảm dần của id ( _order=desc )
  // return this.http.get<Array<Product>> ('http://localhost:3000/product');
  // }
  /*
     http://localhost:3000/product/?_limit=3&_page=1 => 1 2 3 ( Hiển thị 3 sản phẩm đầu tiên ) => PHÂN TRANG TÌM KIẾM ( CHUYỂN XEM CÁC KHUNG SẢN PHẨM KHÁC )
     http://localhost:3000/product/?_limit=3&_page=2 => 4 5 6 ( Hiển thị 3 sản phẩm tiếp theo )
   */
  getList (_limit : number = 4, search_key:any = null): Observable<Array<Product>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/product/?_limit='+ _limit + '&_sort=id&_order=desc';
    if ( search_key != null ){
      url += '&name_like=' + search_key; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
    }
    return this.http.get<Array<Product>> (url);
  }

  getListPriceLow (): Observable<Array<Product>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/product/?_sort=price&_order=asc';
    return this.http.get<Array<Product>> (url);
  }
  getListPriceHight (): Observable<Array<Product>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/product/?_sort=price&_order=desc';
    return this.http.get<Array<Product>> (url);
  }
  getListNameLow (): Observable<Array<Product>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/product/?_sort=name&_start=1&_order=asc';
    return this.http.get<Array<Product>> (url);
  }
  getListNameHight (): Observable<Array<Product>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/product/?_sort=name&_start=1&_order=desc';
    return this.http.get<Array<Product>> (url);
  }
  getPrice (count : number): Observable<Array<Product>>{ // ( _limit = 4 , search_key có hoặc không )
    let price ;
    let productsList : Observable<Array<Product>>;
    // let url;
    if (count == 7) {
      productsList = this.getProduct();
      // if (price >= 0 || price <= 500) {
      // url = 'http://localhost:3000/product/?price=' + price; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
    }
      let url = 'http://localhost:3000/product/?price=' + price  ; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
  return this.http.get<Array<Product>> (url);
}
getSearchName (search_key: string): Observable<Array<Product>>{ // ( _limit = 4 , search_key có hoặc không )
  let url = 'http://localhost:3000/product/?name_like=' + search_key  ; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
  return this.http.get<Array<Product>> (url);
}

getRelatedProduct  (_limit : number = 4 , like_key: string): Observable<Array<Product>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
  // http://localhost:3000/product?category_like=game

  let url = 'http://localhost:3000/product/?_limit='+ _limit + '&category_like=' + like_key;
  return this.http.get<Array<Product>> (url);
}
getRelated  (like_key: string): Observable<Array<Product>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
  // http://localhost:3000/product?category_like=game

  let url = 'http://localhost:3000/product/?category_like='+ like_key;
  return this.http.get<Array<Product>> (url);
}
/*
Them moi
POST : http://localhost:3000/product
 */
create(data: any): Observable<any>{
  return this.http.post<any> ('http://localhost:3000/product/' , data);
}

// GET/:id: http://localhost:3000/product/1
getOne(id: number): Observable<Product>{
  return this.http.get<Product> ('http://localhost:3000/product/' + id);
}

// PUT/:id: http://localhost:3000/product/1
update(id: number, data: any): Observable<any>{
  return this.http.put<any> ('http://localhost:3000/product/' + id , data);
}

// DELETE/:id: http://localhost:3000/product/1
delete(id: number): Observable<any>{
  return this.http.delete<any> ('http://localhost:3000/product/' + id);
}

private getData(url: string, header: object = {}): Observable<any> {
  return this.http.get<any[]>(url, header);
}

getProducts(): Observable<any[]> {
  // this.data =[
  //   [
  //   "43836", "East", "Jones", "Pencil", 95, 1.99, 189.05],
  //   ["43853", "Central", "Kivell", "Binder", 50, 19.99, 999.5],
  //   ["43870", "Central", "Jardine", "Pencil", 36, 4.99, 179.64],
  //   ["43887", "Central", "Gill", "Pen", 27, 19.99, 539.73],
  //   ["43905", "West", "Sorvino", "Pencil", 56, 2.99, 167.44],
  //   ["43922", "East", "Jones", "Binder", 60, 4.99, 299.4],
  //   ["43939", "Central", "Andrews", "Pencil", 75, 1.99, 149.25],
  //   ["43956", "Central", "Jardine", "Pencil", 90, 4.99, 449.1]
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
