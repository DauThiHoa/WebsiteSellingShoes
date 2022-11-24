import {NgModule} from '@angular/core';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Statistical} from "../models/statistical";

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
    return this.http.get<Array<Statistical>>(_api + '?page=' + page);
  }

  getProduct(): Observable<Array<Statistical>>{
    return this.http.get<Array<Statistical>>(_api + 'statistical');
  }

  getList (_limit : number = 4, search_key:any = null): Observable<Array<Statistical>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/statistical/?_limit='+ _limit + '&_sort=id&_order=desc';
    if ( search_key != null ){
      url += '&name_like=' + search_key; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
    }
    return this.http.get<Array<Statistical>> (url);
  }

  getListPriceLow (): Observable<Array<Statistical>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/statistical/?_sort=price&_order=asc';
    return this.http.get<Array<Statistical>> (url);
  }
  getListPriceHight (): Observable<Array<Statistical>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/statistical/?_sort=price&_order=desc';
    return this.http.get<Array<Statistical>> (url);
  }
  getListNameLow (): Observable<Array<Statistical>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/statistical/?_sort=name&_start=1&_order=asc';
    return this.http.get<Array<Statistical>> (url);
  }
  getListNameHight (): Observable<Array<Statistical>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/statistical/?_sort=name&_start=1&_order=desc';
    return this.http.get<Array<Statistical>> (url);
  }
  getPrice (count : number): Observable<Array<Statistical>>{ // ( _limit = 4 , search_key có hoặc không )

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
       url = 'http://localhost:3000/statistical/?price_gte=' + min + '&price_lte=' + max  ; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
    }
    return this.http.get<Array<Statistical>> (url);
}

  getColor (count : number): Observable<Array<Statistical>>{ // ( _limit = 4 , search_key có hoặc không )

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
   url = 'http://localhost:3000/statistical/?color_like=' +color; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
   return this.http.get<Array<Statistical>> (url);
  }

  getType (count : number): Observable<Array<Statistical>>{

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
    url = 'http://localhost:3000/statistical/?category=' + type; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
    return this.http.get<Array<Statistical>> (url);
  }
getSearchName (search_key: string): Observable<Array<Statistical>>{ // ( _limit = 4 , search_key có hoặc không )
  let url = 'http://localhost:3000/statistical/?name_like=' + search_key  ; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
  return this.http.get<Array<Statistical>> (url);
}

getRelatedProduct  (_limit : number = 4 , like_key: string): Observable<Array<Statistical>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
  // http://localhost:3000/product?category_like=game

  let url = 'http://localhost:3000/statistical/?_limit='+ _limit + '&category_like=' + like_key;
  return this.http.get<Array<Statistical>> (url);
}
getRelated  (like_key: string): Observable<Array<Statistical>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
  // http://localhost:3000/product?category_like=game

  let url = 'http://localhost:3000/statistical/?category_like='+ like_key;
  return this.http.get<Array<Statistical>> (url);
}
/*
Them moi
POST : http://localhost:3000/product
 */
create(data: any): Observable<any>{
  return this.http.post<any> ('http://localhost:3000/statistical/' , data);
}

// GET/:id: http://localhost:3000/product/1
getOne(id: number): Observable<Statistical>{
  return this.http.get<Statistical> ('http://localhost:3000/statistical/' + id);
}

// PUT/:id: http://localhost:3000/product/1
update(id: number, data: any): Observable<any>{
  return this.http.put<any> ('http://localhost:3000/statistical/' + id , data);
}

// DELETE/:id: http://localhost:3000/product/1
delete(id: number): Observable<any>{
  return this.http.delete<any> ('http://localhost:3000/statistical/' + id);
}

private getData(url: string, header: object = {}): Observable<any> {
  return this.http.get<any[]>(url, header);
}

getProducts(): Observable<any[]> {
  return this.getData('http://localhost:4200/assets/data.json');
}

}
