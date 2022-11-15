import {NgModule} from '@angular/core';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Profile} from "../models/profile";

const _api = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  data: any[];
  productList: any[];
  price : any;
  // profilesList : Array<Profile> = [];

  constructor(private http: HttpClient) {

  }

  getProfile(): Observable<Array<Profile>>{
    return this.http.get<Array<Profile>>(_api + 'profile');
  }
  // Trả về các giá trị có chữ INTERNET => ?q = INTERNET
  /*
  Danh sach
  GET : http://localhost:3000/profile
   */
  // getList(_limit : number = 4): Observable<Array<Profile>>{ // Mặc định hiển thị 4 sản phẩm
  //   return this.http.get<Array<Profile>> ('http://localhost:3000/profile/?_limit='+ _limit + '&_sort=id&_order=desc');
  // => Hiển thị 2 sản phẩm trong danh sách sản phẩm ( ?_limit=2 )
  // => Sắp xếp theo id ( _sort=id )
  // => Theo thứ tự giảm dần của id ( _order=desc )
  // return this.http.get<Array<Profile>> ('http://localhost:3000/profile');
  // }
  /*
     http://localhost:3000/profile/?_limit=3&_page=1 => 1 2 3 ( Hiển thị 3 sản phẩm đầu tiên ) => PHÂN TRANG TÌM KIẾM ( CHUYỂN XEM CÁC KHUNG SẢN PHẨM KHÁC )
     http://localhost:3000/profile/?_limit=3&_page=2 => 4 5 6 ( Hiển thị 3 sản phẩm tiếp theo )
   */
  getList (_limit : number = 4, search_key:any = null): Observable<Array<Profile>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/profile/?_limit='+ _limit + '&_sort=id&_order=desc';
    if ( search_key != null ){
      url += '&name_like=' + search_key; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
    }
    return this.http.get<Array<Profile>> (url);
  }

  getListPriceLow (): Observable<Array<Profile>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/profile/?_sort=price&_order=asc';
    return this.http.get<Array<Profile>> (url);
  }
  getListPriceHight (): Observable<Array<Profile>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/profile/?_sort=price&_order=desc';
    return this.http.get<Array<Profile>> (url);
  }
  getListNameLow (): Observable<Array<Profile>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/profile/?_sort=name&_start=1&_order=asc';
    return this.http.get<Array<Profile>> (url);
  }
  getListNameHight (): Observable<Array<Profile>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
    let url = 'http://localhost:3000/profile/?_sort=name&_start=1&_order=desc';
    return this.http.get<Array<Profile>> (url);
  }
  getPrice (count : number): Observable<Array<Profile>>{ // ( _limit = 4 , search_key có hoặc không )

    let min;
    let max;
    let url = '';
    if (count == 7) {
        min = 0 ;
        max = 500 ;
        // url = 'http://localhost:3000/profile/?price_gte=' + this.price; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
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
      // max = 5000 ;
    }
    // console.log("url = " + url)
    // console.log("price = " + this.price)
    if (count == 16 ){
       url = 'http://localhost:3000/profile/?price_gte=' + min ;
    }else {
       url = 'http://localhost:3000/profile/?price_gte=' + min + '&price_lte=' + max  ; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
    }
    return this.http.get<Array<Profile>> (url);
}

 getColor (count : number): Observable<Array<Profile>>{ // ( _limit = 4 , search_key có hoặc không )

    let color;
    let url = '';

       if (count == 17) {
         color = 'Pink' ;
       }else if (count == 18) {
         color = 'Green' ;
       }else if (count == 19) {
         color = 'Blue' ;
       }else if (count == 20) {
         color = 'Oranges' ;
       }else if (count == 21) {
         color = 'White' ;
       }else if (count == 22) {
         color = 'Red' ;
     }
   url = 'http://localhost:3000/profile/?color_like=' +color; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
   return this.http.get<Array<Profile>> (url);
  }
getSearchName (search_key: string): Observable<Array<Profile>>{ // ( _limit = 4 , search_key có hoặc không )
  let url = 'http://localhost:3000/profile/?name_like=' + search_key  ; // Tìm kiếm theo tên có xuất hiện trong tên sản phẩm
  return this.http.get<Array<Profile>> (url);
}

getRelatedProfile (_limit : number = 4 , like_key: string): Observable<Array<Profile>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
  // http://localhost:3000/profile?category_like=game

  let url = 'http://localhost:3000/profile/?_limit='+ _limit + '&category_like=' + like_key;
  return this.http.get<Array<Profile>> (url);
}
getRelated  (like_key: string): Observable<Array<Profile>>{ // Mặc định hiển thị 4 sản phẩm ( _limit = 4 , search_key có hoặc không )
  // http://localhost:3000/profile?category_like=game

  let url = 'http://localhost:3000/profile/?category_like='+ like_key;
  return this.http.get<Array<Profile>> (url);
}
/*
Them moi
POST : http://localhost:3000/profile
 */
create(data: any): Observable<any>{
  return this.http.post<any> ('http://localhost:3000/profile/' , data);
}

// GET/:id: http://localhost:3000/profile/1
getOne(id: number): Observable<Profile>{
  return this.http.get<Profile> ('http://localhost:3000/profile/' + id);
}

// PUT/:id: http://localhost:3000/profile/1
update(id: number, data: any): Observable<any>{
  return this.http.put<any> ('http://localhost:3000/profile/' + id , data);
}

// DELETE/:id: http://localhost:3000/profile/1
delete(id: number): Observable<any>{
  return this.http.delete<any> ('http://localhost:3000/profile/' + id);
}

private getData(url: string, header: object = {}): Observable<any> {
  return this.http.get<any[]>(url, header);
}

getProfiles(): Observable<any[]> {
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
