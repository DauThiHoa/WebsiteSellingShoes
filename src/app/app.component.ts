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

  // @ts-ignore
  user : gapi.auth2.GoogleUser;

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
              private ref : ChangeDetectorRef) {

          console.log('ElementRef: ', this.element);
  }

  ngOnInit(): void {

    this.signInService.observable().subscribe(user => {
         this.user = user;
         this.ref.detectChanges();
    })
    this.title = 'Hello World';
    this.data = [
      [1, 'Nguyễn Văn A', '18130000', 'DH18DT', 10],
      [2, 'Nguyễn Văn B', '18130000', 'DH18DT', 10],
      [3, 'Nguyễn Văn C', '18130000', 'DH18DT', 10],
      [4, 'Nguyễn Văn D', '18130000', 'DH18DT', 10],
      [5, 'Nguyễn Văn E', '18130000', 'DH18DT', 10],
      [6, 'Nguyễn Văn F', '18130000', 'DH18DT', 10],
      [7, 'Nguyễn Văn G', '18130000', 'DH18DT', 10],
      [8, 'Nguyễn Văn H', '18130000', 'DH18DT', 10],
      [9, 'Nguyễn Văn I', '18130000', 'DH18DT', 10],
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

  signIn (){
      this.signInService.signIn()
  }
  signOut (){
    this.signInService.signOut()
  }

  public logOut(): void {
    this.loginSrv.update(0, "").subscribe(data => {
    });
    location.reload();
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
