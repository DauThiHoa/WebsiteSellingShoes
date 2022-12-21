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
import {Statistical} from "../../models/statistical";
import {StatisticalService} from "../../services/statistical.service";

@Component({
  selector: 'app-test',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponents implements OnInit {
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

  productsList : Array<Product> = [];

  cartFormOneQuantity: FormGroup = new FormGroup({
  });

  staticForm : FormGroup = new FormGroup({
  });
  constructor(private bannerService:BannerService ,
              private cartSrv: CartService,
              private productService:ProductService,
              private categoryService:CategoryService,
              private prodSrv : ProductService,
              private route: Router,
              private StaticSrc: StatisticalService) { }


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
  }

  public onClickProduct (id :number): void {
    // if (confirm(id+ 'h')) {
    this.route.navigate(['/productDetail/' + id]);
    // }
  }

  public countCategory (categoryData : string , category : string ): number {
    if (category == categoryData){
      return 1;
    }
    return 0;
  }
  public onCreateOneQuantity (id :number): void {

    //
    this.prodSrv.getOne(id).subscribe(data => {

      // alert(id)
      this.cartFormOneQuantity = new FormGroup({
        id: new FormControl(id),
        name: new FormControl(data.name),
        image: new FormControl(data.image),
        category : new FormControl(data.category),
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

            this.StaticSrc.getOne(2).subscribe(data => {
              this.staticForm = new FormGroup({
                id : new FormControl(2),
                ShoesSandals : new FormControl(data.ShoesSandals + this.countCategory ("ShoesSandals" , this.cartFormOneQuantity.controls.category.value)),
                HighHeels : new FormControl(data.HighHeels + this.countCategory ("HighHeels" , this.cartFormOneQuantity.controls.category.value)),
                Sneakers : new FormControl(data.Sneakers + this.countCategory ("Sneakers" , this.cartFormOneQuantity.controls.category.value)),
                SportShoes : new FormControl(data.SportShoes + this.countCategory ("SportShoes" , this.cartFormOneQuantity.controls.category.value)),
                DollShoes : new FormControl(data.DollShoes + this.countCategory ("DollShoes" , this.cartFormOneQuantity.controls.category.value)),
              });
              this.StaticSrc.setCategory(2, this.staticForm.value).subscribe(data =>{
                alert( "ADD 1 : " +  data.ShoesSandals + this.countCategory ("ShoesSandals" , this.cartFormOneQuantity.controls.category.value));
              });
            });

            this.route.navigate(['/product-list']);
          }
        });
      }
    })

    //
    this.cartSrv.getOne(id).subscribe(data1 => {
      if (data1.id != null) {
        this.cartFormOneQuantity = new FormGroup({
          id: new FormControl(id),
          name: new FormControl(data1.name),
          image: new FormControl(data1.image),
          category : new FormControl(data1.category),
          price: new FormControl(data1.price),
          quantitySold: new FormControl(data1.quantitySold + 1),
          total : new FormControl(data1.price * ( data1.quantitySold + 1 ))
        });
        this.cartSrv.update(id , this.cartFormOneQuantity.value).subscribe(data => {
          if (confirm("Add To Cart Success")) {

            this.StaticSrc.getOne(2).subscribe(data => {
              this.staticForm = new FormGroup({
                id : new FormControl(2),
                ShoesSandals : new FormControl(data.ShoesSandals + this.countCategory ("ShoesSandals" , this.cartFormOneQuantity.controls.category.value)),
                HighHeels : new FormControl(data.HighHeels + this.countCategory ("HighHeels" , this.cartFormOneQuantity.controls.category.value)),
                Sneakers : new FormControl(data.Sneakers + this.countCategory ("Sneakers" , this.cartFormOneQuantity.controls.category.value)),
                SportShoes : new FormControl(data.SportShoes + this.countCategory ("SportShoes" , this.cartFormOneQuantity.controls.category.value)),
                DollShoes : new FormControl(data.DollShoes + this.countCategory ("DollShoes" , this.cartFormOneQuantity.controls.category.value)),
              });
              this.StaticSrc.setCategory(2, this.staticForm.value).subscribe(data =>{});
            })

            this.route.navigate(['/product-list']);
          }
        });
      }else {
        return;
      }
    })
  }
}
