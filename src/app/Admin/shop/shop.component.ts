import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {BannerService} from "../../services/banner.service";
import {Banner} from "../../models/banner";
import {Product} from "../../models/product";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {CartService} from "../../services/cart.service";
import {BillingService} from "../../services/billing.service";
import {Billing} from "../../models/billing";

@Component({
  selector: 'app-test',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponents implements OnInit {
  submited: boolean = false;
  data: any[];
  result : boolean ;

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
  billingList : Array<Billing> = [];

  cartFormOneQuantity: FormGroup = new FormGroup({
  });
  FromDate = new FormGroup({
    date: new FormControl(''),
  });

  constructor(private bannerService:BannerService ,
              private cartSrv: CartService,
              private productService:ProductService,
              private categoryService:CategoryService,
              private prodSrv : ProductService,
              private route: Router,
              private billingSrc : BillingService) { }


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
    this.billingSrc.getBilling().subscribe(data =>{
      this.billingList = data ;
    })
  }

  onSubmitDate(id: number , date : string): boolean{
    alert("DATE : "+ this.FromDate.controls.date.value);
    if (this.FromDate.controls.date.value < date ){
      this.result  = true ;
    }else {
      this.result  = false ;
    }
    // this.billingSrc.getBilling().subscribe(data =>{
    //   for (const datum of data) {
    //     if (datum.id == id && this.FromDate.controls.date.value < datum.orderDate){
    //       this.result  = true ;
    //     }else {
    //       this.result = false ;
    //     }
    //   }
    // })
    return this.result;
  }
  onTurnover(totalMoney : number ):number{
     return ( totalMoney / 50000 ) * 100 ;
  }
  public onClickProduct (id :number): void {
    // if (confirm(id+ 'h')) {
    this.route.navigate(['/productDetail/' + id]);
    // }
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
