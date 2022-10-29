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

@Component({
  selector: 'app-test',
  templateUrl: './steamproduct.component.html',
  styleUrls: ['./steamproduct.component.scss']
})
export class SteamProductComponents implements OnInit {
  submited: boolean = false;
  data: any[];

  // constructor(private productService:ProductService) { }
  //
  // ngOnInit(): void {
  //   this.productService.getProducts()
  //     .subscribe(value => this.data = Object.entries(value).map(v => v[1]));
  // }

  banners : Array<Banner> = new Array<Banner>();
  products : Array<Product> = new Array<Product>();
  category : Array<Category> = new Array<Category>();

  productsLow : Array<Product> = new Array<Product>();
  productsHight : Array<Product> = new Array<Product>();

  productsList : Array<Product> = [];

  cartFormOneQuantity: FormGroup = new FormGroup({
  });

  constructor(private bannerService:BannerService ,
              private cartSrv: CartService,
              private productService:ProductService,
              private categoryService:CategoryService,
              private prodSrv : ProductService,
              private route: Router) {

  }


  ngOnInit(): void {
    // LAY DU LIEU VAO TRANG ListProduct
    this.bannerService.getBanners()
      .subscribe(res => {
        this.banners = res;
      });
    this.categoryService.getCategory()
      .subscribe(res => {
        this.category = res;
      });

    // PHU THUOC VAO TRANG SERVE
    this.prodSrv.getList().subscribe(data =>{
      this.productsList = data ;
    })

    this.productService.getProduct()
      .subscribe(res => {
        this.products = res;
      });
    // PHU THUOC VAO TRANG SERVE
    this.prodSrv.getListPriceLow().subscribe(data =>{
      this.productsLow = data ;
    })
    // PHU THUOC VAO TRANG SERVE
    this.prodSrv.getListPriceHight().subscribe(data =>{
      this.productsHight = data ;
    })

  }

  public onClickProduct (id :number): void {
    // if (confirm(id+ 'h')) {
    this.route.navigate(['/productDetail/' + id]);
    // }
  }

  public onCreate (id: number): void {
    // if (confirm(id+ 'h')) {
   // alert(id)
    // }
    if(id == 5 ){
      this.prodSrv.getListPriceHight().subscribe(data =>{
        this.products = data ;
      })
    }else if(id == 6 ){
      this.prodSrv.getListPriceLow().subscribe(data =>{
        this.products = data ;
      })
    }else if(id == 3 ){
      this.prodSrv.getListNameLow().subscribe(data =>{
        this.products = data ;
      })
    }else if(id == 4 ){
      this.prodSrv.getListNameLow().subscribe(data =>{
        this.products = data ;
      })
    }else if(id == 1 ){
      this.prodSrv.getProduct().subscribe(data =>{
        this.products = data ;
      })
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
