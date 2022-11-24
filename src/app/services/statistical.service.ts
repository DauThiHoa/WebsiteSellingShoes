import {NgModule} from '@angular/core';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product";

const _api = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class StatisticalService {
  data: any[];
  productList: any[];
  price : any;
  // productsList : Array<Product> = [];

  constructor(private http: HttpClient) {

  }
  getProductPage (page: number){
    return this.http.get<Array<Product>>(_api + '?page=' + page);
  }

  getProduct(): Observable<Array<Product>>{
    return this.http.get<Array<Product>>(_api + 'product');
  }
  // Trả về các giá trị có chữ INTERNET => ?q = INTERNET
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

    let min;
    let max;
    let url = '';
    if (count == 7) {
        min = 0 ;
        max = 500 ;
        // url = 'http://localhost:3000/product/?price_gte=' + this.price; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
    }else if (count == 8) {
      min = 500 ;
      max = 1000 ;
    }else if (count == 9) {
      min = 1000 ;
      max = 2000 ;
    }else if (count == 10) {
      min = 2000 ;
      max = 2500 ;
    }else if (count == 11) {
      min = 2500 ;
      max = 3000 ;
    }else if (count == 12) {
      min = 3000 ;
      max = 3500 ;
    }else if (count == 13) {
      min = 3500 ;
      max = 4000 ;
    }else if (count == 14) {
      min = 4000 ;
      max = 4500 ;
    }else if (count == 15) {
      min = 4500 ;
      max = 5000 ;
    }else if (count == 16) {
      min = 5000 ;
      // max = 5000 ;       url = 'http://localhost:3000/product/?price_gte=' + min ;
    }
    // console.log("url = " + url)
    // console.log("price = " + this.price)
    if (count == 16 ){
    }else {
       url = 'http://localhost:3000/product/?price_gte=' + min + '&price_lte=' + max  ; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
    }
    return this.http.get<Array<Product>> (url);
}

  getColor (count : number): Observable<Array<Product>>{ // ( _limit = 4 , search_key có hoặc không )

    let color;
    let url = '';

       if (count == 17) {
         color = 'Black' ;
       }else if (count == 18) {
         color = 'Creamy white' ;
       }else if (count == 19) {
         color = 'Green' ;
       }else if (count == 20) {
         color = 'Violet' ;
       }else if (count == 21) {
         color = 'Oranges' ;
       }else if (count == 22) {
         color = 'Blue' ;
       }else if (count == 23) {
         color = 'Yellow' ;
       }else if (count == 24) {
         color = 'White' ;
       }else if (count == 25) {
         color = 'Pink' ;
       }else if (count == 26) {
         color = 'Red' ;
       }
   url = 'http://localhost:3000/product/?color_like=' +color; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
   return this.http.get<Array<Product>> (url);
  }

  getType (count : number): Observable<Array<Product>>{

    let type;
    let url = '';

    if (count == 1) {
      type = 'Shoes Sandals' ;
    }else if (count == 2) {
      type = 'High Heels' ;
    }else if (count == 3) {
      type = 'Sneakers' ;
    }else if (count == 4) {
      type = 'Sport Shoes' ;
    }else if (count == 5) {
      type = 'Doll Shoes' ;
    }
    url = 'http://localhost:3000/product/?category=' + type; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
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
