import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Cart} from "./models/cart";
import {ProductService} from "./services/product.service";
import {CartService} from "./services/cart.service";
import {Router} from "@angular/router";
import {Product} from "./models/product";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpService} from "./Shared/http.service";
import {LoginService} from "./services/login.service";
import {Login} from "./models/login";
import { ElementRef, AfterViewInit} from '@angular/core';
import {GoogleSigninService} from "./google-signin.service";


// import signIn = gapi.auth.signIn;
// import {response} from "express";
declare const gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //   <router-outlet></router-outlet>
  // `,
  styleUrls: ['./app.component.scss'],
  // selector: 'google-signin',
  // template: '<button id="googleBtn">Google Sign-In</button>'
})
export class AppComponent implements OnInit{

  title = 'mdb5-angular-ui-kit-pro-advanced';
  data: any[] = [];
  cartList: Array<Cart> = [];
  loginOne: Login;
  totalCart: number = 0;
  productList: Array<Product> = [];
  error: string;
  erro: string;
  loginAdmin : Login;

  // user : gapi.auth2.GoogleUser;

  public searchForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    sale_price: new FormControl(''),
  });

  constructor(private proSrv: ProductService,
              private cartSrv: CartService,
              private route: Router,
              public http: HttpService,
              public loginSrv: LoginService,
              private element: ElementRef,
              private signInService : GoogleSigninService,
              private ref : ChangeDetectorRef ) {

          // console.log('ElementRef: ', this.element);

  }
  // METHOD To Actually signin with google
  // signIn2(platform: string):void
  // {
  //   platform = GoogleLoginProvider.PROVIDER_ID;
  //
  //   this.socioAuthServ.signIn(platform).then((response)=>{
  //     console.log(platform + "logged in user data is = " , response);
  //
  //     this.user2 = response;
  //   }
  //   )
  //  }

   // SignOut method to let the user signout of their account

  // signOut2 ():void {
  //   this.socioAuthServ.signOut();
  //
  //   console.log("User Signed Out");
  // }

  ngOnInit(): void {

    // this.signInService.observable().subscribe(user => {
    //      this.user = user;
    //      this.ref.detectChanges();
    // })
    this.title = 'Hello World';
    this.data = [
      [1, 'Nguy???n V??n A', '18130000', 'DH18DT', 10],
      [2, 'Nguy???n V??n B', '18130000', 'DH18DT', 10],
      [3, 'Nguy???n V??n C', '18130000', 'DH18DT', 10],
      [4, 'Nguy???n V??n D', '18130000', 'DH18DT', 10],
      [5, 'Nguy???n V??n E', '18130000', 'DH18DT', 10],
      [6, 'Nguy???n V??n F', '18130000', 'DH18DT', 10],
      [7, 'Nguy???n V??n G', '18130000', 'DH18DT', 10],
      [8, 'Nguy???n V??n H', '18130000', 'DH18DT', 10],
      [9, 'Nguy???n V??n I', '18130000', 'DH18DT', 10],
    ];
    this.cartSrv.getCart().subscribe(data => {

      this.cartList = data;

      // CART TOTAL
      for (const datum of this.cartList) {
        this.totalCart += datum.quantitySold;
      }
    })
    this.loginSrv.getOne(0).subscribe(data => {

      this.loginOne = data;
    })
  }

  // signIn (){
  //     this.signInService.signIn()
  // }
  // signOut (){
  //   this.signInService.signOut()
  // }

  public logOut(): void {
    this.loginSrv.update(0, "").subscribe(data => {
    });
    location.reload();
  }


  public admin() {

   this.loginSrv.getOne(0).subscribe(data =>{
     this.loginAdmin = data ;
     if (this.loginAdmin.email == undefined ){
       location.replace('../login');
     }else {
       location.replace('../shop');
     }
   })
  }


  onSearch(id: number) {
    // alert(this.searchForm.value.name);
    location.replace('../productDetail/' + id);
  }

  onProductSearch() {
    // alert(this.searchForm.value.name);

    this.proSrv.getSearchName(this.searchForm.value.name).subscribe(data => {
      this.productList = data;
      // alert(data)
      if (data == null) {
        this.error = "There are no products matching your search";
        this.erro = "You can try with simpler keywords or contact support";
      }
      this.error = "";
      this.erro = "";
    })

  }


}
