import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {BannerService} from "../../services/banner.service";
import {Banner} from "../../models/banner";
import {Product} from "../../models/product";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../services/cart.service";
import {LoginService} from "../../services/login.service";
import {Login} from "../../models/login";
import {Profile} from "../../models/profile";
import {ProfileService} from "../../services/profile.service";
import {BillingService} from "../../services/billing.service";
import {Billing} from "../../models/billing";

@Component({
  selector: 'app-test',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponents implements OnInit {
  submited: boolean = false;
  data: any[];
  profileOne: Profile;
  loginOne : Login;
  billingList :Array<Billing> = [];
  status : string;
  today = new Date();

  FromProfile = new FormGroup({
    id: new FormControl(1),
    name: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    phoneNo : new FormControl(""),
    message : new FormControl(""),
    selectCountry: new FormControl(""),
  });

  FromLogin = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
  });

  // updateStatus = new FormGroup({
  //   status : new FormControl(''),
  // });

  updateStatus = new FormGroup({

    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    postCode: new FormControl(''),
    phone: new FormControl(''),
    email : new FormControl("", [ Validators.required, Validators.email ]),
    paymentMethods: new FormControl(''),
    accountNumber : new FormControl(''),
    orderDate: new FormControl(),
    receiptDate : new FormControl(),
    status : new FormControl(),
    totalMoney : new FormControl(),
  });

  // constructor(private productService:ProductService) { }
  //
  // ngOnInit(): void {
  //   this.productService.getProducts()
  //     .subscribe(value => this.data = Object.entries(value).map(v => v[1]));
  // }

  banners : Array<Banner> = new Array<Banner>();
  products : Array<Product> = new Array<Product>();
  category : Array<Category> = new Array<Category>();

  productsList : Array<Product> = [];

  cartFormOneQuantity: FormGroup = new FormGroup({
  });

  constructor(private bannerService:BannerService ,
              private cartSrv: CartService ,
              private productService:ProductService ,
              private categoryService:CategoryService ,
              private prodSrv : ProductService,
              private route: Router,
              public loginSrv: LoginService ,
              public profileSrv: ProfileService ,
              public billingSrv: BillingService ,) { }


  ngOnInit(): void {
    // LAY DU LIEU VAO TRANG HOME
    this.bannerService.getBanners()
      .subscribe(res => {
        this.banners = res;
      });
    this.productService.getProduct()
      .subscribe(res => {
        this.products = res;
      });
    this.categoryService.getCategory()
      .subscribe(res => {
        this.category = res;
      });

    // PHU THUOC VAO TRANG SERVE
    this.prodSrv.getList().subscribe(data =>{
      this.productsList = data ;
    })

    this.billingSrv.getBilling().subscribe(data => {
      this.billingList = data;
      for (const datum of data) {
        // if(this.today.toLocaleDateString() <= datum.receiptDate.toLocaleDateString()){
        //       this.status = "DELIVERY";
        // }else {
        //   this.status = "RECEIVED";
        // }
      }
    })

    this.loginSrv.getOne(0).subscribe(data => {
      this.loginOne = data;
    })

    this.profileSrv.getOne(1).subscribe(data => {
      this.profileOne = data;

      this.FromProfile = new FormGroup({
        id: new FormControl(1),
        name: new FormControl(data.name),
        email: new FormControl(data.email),
        password: new FormControl(this.loginOne.password),
        phoneNo : new FormControl(data.phoneNo),
        message : new FormControl(data.message),
        selectCountry: new FormControl(data.selectCountry),
      });

    })

  }

  onDelete(id:number){
    if (confirm("Do you want to delete the product?")){
      this.billingSrv.delete(id).subscribe(data =>{
        // Load data
        // Sửa đổi mặc định trong _limit = 4 => _limit = 10
        this.billingSrv.getList().subscribe(data =>  {
          this.billingList = data;
          // location.reload();
        })
      })
    }
  }

  onEdit (id:number){
    alert(this.updateStatus.value)
  }

  onChangeStatus (id:number){
    // alert( "STATUS : " + this.updateStatus.controls.status.value + " ID : " + id);
    if (this.FromProfile.invalid) {
      if (confirm("Please fill in all the information")) {
        this.route.navigate(['/history']);
      }
      return;
    }else {
      this.billingSrv.getOne(id).subscribe(data => {
        this.updateStatus = new FormGroup({

          firstName: new FormControl(data.firstName),
          lastName: new FormControl(data.lastName),
          address: new FormControl(data.address),
          postCode: new FormControl(data.postcode),
          phone: new FormControl(data.phone),
          email : new FormControl(data.email, [ Validators.required, Validators.email ]),
          paymentMethods: new FormControl(data.paymentMethods),
          accountNumber : new FormControl(data.accountNumber),
          orderDate: new FormControl(data.orderDate),
          receiptDate : new FormControl(data.receiptDate),
          status : new FormControl(this.updateStatus.controls.status.value),
          totalMoney : new FormControl(data.totalMoney),
        });
      this.billingSrv.update(id, this.updateStatus.value).subscribe(data => {
        alert("Order status change successful")
        location.reload();
       });
      });
    }
  }

  public onClickProduct (id :number): void {
    // if (confirm(id+ 'h')) {
    this.route.navigate(['/productDetail/' + id]);
    // }
  }

  public onUpdateProfile (): void {
    this.submited = true;
    if (this.FromProfile.invalid) {
      if (confirm("Please fill in all the information")) {
        this.route.navigate(['/profile']);
      }
      return;
    } else {
      // this.route.navigate(['/home']);
      this.profileSrv.update(1, this.FromProfile.value).subscribe(data => {
         });

      this.FromLogin = new FormGroup({
        id: new FormControl(0),
        name: new FormControl(this.FromProfile.value.name),
        email: new FormControl(this.FromProfile.value.email),
        password: new FormControl(this.FromProfile.value.password),
      });

      this.loginSrv.update(0, this.FromLogin.value).subscribe(data => {
      });

      this.loginSrv.getlogin().subscribe(data => {
        for (const datum of data) {
            if ( datum.email == this.FromProfile.value.email){
              this.loginSrv.update(datum.id, this.FromLogin.value).subscribe(data => {
              });
            }
        }
      });

      if (confirm("Successfully updated")) {
        // this.route.navigate(['/profile']);
        location.replace("/profile");
      }
      return;

    }
  }

  public onCreateOneQuantity (id :number): void {
    this.prodSrv.getOne(id).subscribe(data => {

      // alert(id)
      this.cartFormOneQuantity = new FormGroup({
        id: new FormControl(id),
        name: new FormControl(data.name),
        image: new FormControl(data.image),
        price: new FormControl(data.price),
        quantitySold: new FormControl(1),
        total : new FormControl(data.price * 1)
      });

      this.submited = true;

      if (this.cartFormOneQuantity.invalid) {
        return;
      } else {
        this.cartSrv.create(this.cartFormOneQuantity.value).subscribe(data => {
          if (confirm("Add To Cart Success")) {
            this.route.navigate(['/product-list']);
          }
        });
      }
    })

    this.cartSrv.getOne(id).subscribe(data1 => {
      if (data1.id != null) {
        this.cartFormOneQuantity = new FormGroup({
          id: new FormControl(id),
          name: new FormControl(data1.name),
          image: new FormControl(data1.image),
          price: new FormControl(data1.price),
          quantitySold: new FormControl(data1.quantitySold + 1),
          total : new FormControl(data1.price * ( data1.quantitySold + 1 ))
        });
        this.cartSrv.update(id , this.cartFormOneQuantity.value).subscribe(data => {
          if (confirm("Add To Cart Success")) {
            this.route.navigate(['/product-list']);
          }
        });
      }else {
        return;
      }
    })
  }
}
