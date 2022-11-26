import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../models/product";
import {CartService} from "../../services/cart.service";
import {Cart} from "../../models/cart";
import {CommentService} from "../../services/comment.service";
import {CommentProductService} from "../../services/commentProduct.service";
import {Comment} from "../../models/comment";
import {CommentProduct} from "../../models/commentProduct";
import {LoginService} from "../../services/login.service";
import {Login} from "../../models/login";
import {StatisticalService} from "../../services/statistical.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id: number = 0;
  category: string = "";
  submited: boolean = false;

  // Doi Tuong Product Duoc Bam Vao
  pro: Product = new Product(); // any ( Nhan Tat Ca Cac Du Lieu )
  login: Login = new Login(); // any ( Nhan Tat Ca Cac Du Lieu )
  relatedProduct: Array<Product> = new Array<Product>();
  related: Array<Product> = new Array<Product>();

  quantity : number = 0 ;
  quantitySold : number = 0 ;

  count : number = 0 ;
  commentList: Array<CommentProduct> = [];

  staticForm : FormGroup = new FormGroup({
  });

  constructor(private prodSrv: ProductService,
              private cartSrv: CartService,
              private _route: ActivatedRoute,
              private productService: ProductService,
              private route: Router,
              private comProSrv : CommentProductService,
              private loginSrv : LoginService,
              private StaticSrc: StatisticalService) {
  }

  today = new Date();

  date = this.today.getDate()+ '/' + (this.today.getMonth() + 1 )+ '/' + this.today.getFullYear();

  commentCreate = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    content: new FormControl(''),
    date: new FormControl(this.date),
  });

  cartForm = new FormGroup({
    id: new FormControl( ),
    name : new FormControl(),
    image : new FormControl(),
    price : new FormControl(),
    quantitySold : new FormControl(),
    total : new FormControl()
  });

  cartFormOneQuantity: FormGroup = new FormGroup({
       });

  ngOnInit(): void {
    // LAY DU LIEU TREN THANH TIM KIEM
    // /productDetail/1 => id = 1
    this.id = this._route.snapshot.params.id ;
    this.category = this._route.snapshot.params.category ;

    this.prodSrv.getOne(this.id).subscribe(data =>{
      this.pro = data ;
      this.quantity = this.cartForm.controls.quantitySold.value;

      this.cartForm = new FormGroup({
        id: new FormControl(data.id ),
        name : new FormControl(data.name),
        image : new FormControl(data.image),
        category : new FormControl(data.category),
        price : new FormControl(data.price),
        quantitySold : new FormControl(),
        total : new FormControl(data.price * this.quantity)
      });
    })

    this.prodSrv.getOne(this.id).subscribe(data =>{
      this.category = data.category;
      this.productService.getRelatedProduct(4,this.category)
      .subscribe(res => {
        this.relatedProduct = res;
       })
      });

        this.prodSrv.getOne(this.id).subscribe(data =>{
          this.category = data.category;
          this.productService.getRelated(this.category)
            .subscribe(res => {
              this.related = res;
              // alert(this.category)
        })
      });

    this.loginSrv.getOne(0).subscribe(data =>{
      this.login = data ;

      this.commentCreate = new FormGroup({
        name: new FormControl(data.name),
        email: new FormControl(data.email),
        content: new FormControl(),
        date: new FormControl(this.date),
      });

    })

    this.comProSrv.getcomment().subscribe(data =>  {
      this.commentList = data;
      // CART TOTAL
      for (const datum of this.commentList) {
        this.count += 1;
      }
    });

  }


  public onCommand(): void {
    this.submited = true ;

    if ( this.commentCreate.invalid){
      alert("Please continue to travel with information")
      return;

    }else {
      this.comProSrv.create(this.commentCreate.value).subscribe(data =>{
        if (confirm("Add Comment Success")) {
          location.reload();
        }
      });

    }
  }

  public countCategory (categoryData : string , category : string , count : number): number {
    if (category == categoryData){
      return count;
    }
    return 0;
  }

  public onCreate(id: number ): void {

    this.submited = true;

    this.prodSrv.getOne(this.id).subscribe(data =>{
      this.pro = data ;
      this.quantity = this.cartForm.controls.quantitySold.value;

      this.quantitySold = this.quantity;

      this.cartForm = new FormGroup({
        id: new FormControl(data.id ),
        name : new FormControl(data.name),
        image : new FormControl(data.image),
        category : new FormControl(data.category),
        price : new FormControl(data.price),
        quantitySold : new FormControl(this.quantity),
        total : new FormControl(data.price * this.quantity)
      });

      if (this.cartForm.invalid) {
        return;
      } else {
        this.cartSrv.create(this.cartForm.value).subscribe(data => {
          if (confirm("Add To Cart Success 1")) {

            this.StaticSrc.getOne(2).subscribe(data => {
              this.staticForm = new FormGroup({
                id : new FormControl(2),
                ShoesSandals : new FormControl(data.ShoesSandals + this.countCategory ("ShoesSandals" , this.cartForm.controls.category.value, this.quantity)),
                HighHeels : new FormControl(data.HighHeels + this.countCategory ("HighHeels" , this.cartForm.controls.category.value , this.quantity)),
                Sneakers : new FormControl(data.Sneakers + this.countCategory ("Sneakers" , this.cartForm.controls.category.value, this.quantity)),
                SportShoes : new FormControl(data.SportShoes + this.countCategory ("SportShoes" , this.cartForm.controls.category.value, this.quantity)),
                DollShoes : new FormControl(data.DollShoes + this.countCategory ("DollShoes" , this.cartForm.controls.category.value, this.quantity)),
              });
              this.StaticSrc.setCategory(2, this.staticForm.value).subscribe(data =>{});
            });

            this.route.navigate(['/product-list']);
          }
        });
      }

    })

      this.cartSrv.getOne(id).subscribe(data1 => {
        if (data1.id != null) {
          this.quantity = this.cartForm.controls.quantitySold.value;

          this.cartForm = new FormGroup({
            id: new FormControl(id),
            name: new FormControl(data1.name),
            image: new FormControl(data1.image),
            category : new FormControl(data1.category),
            price: new FormControl(data1.price),
            quantitySold: new FormControl(data1.quantitySold + this.quantity),
            total : new FormControl(data1.price * ( data1.quantitySold + this.quantity))
          });
          this.cartSrv.update(id, this.cartForm.value).subscribe(data => {
            if (confirm("Add To Cart Success 2")) {

              this.StaticSrc.getOne(2).subscribe(data => {
                alert("quantity 2 : " + this.quantity);

                this.staticForm = new FormGroup({
                  id : new FormControl(2),
                  ShoesSandals : new FormControl(data.ShoesSandals + this.countCategory ("ShoesSandals" , this.cartForm.controls.category.value, this.quantity )),
                  HighHeels : new FormControl(data.HighHeels + this.countCategory ("HighHeels" , this.cartForm.controls.category.value , this.quantity )),
                  Sneakers : new FormControl(data.Sneakers + this.countCategory ("Sneakers" , this.cartForm.controls.category.value, this.quantity )),
                  SportShoes : new FormControl(data.SportShoes + this.countCategory ("SportShoes" , this.cartForm.controls.category.value, this.quantity )),
                  DollShoes : new FormControl(data.DollShoes + this.countCategory ("DollShoes" , this.cartForm.controls.category.value, this.quantity )),
                });

                this.StaticSrc.setCategory(2, this.staticForm.value).subscribe(data =>{});
              });

              this.route.navigate(['/product-list']);
            }
          });
        }else {
          return;
        }
      })
  }

  public onClickProduct (id :number): void {
          // this.route.navigate(['/productDetail/' + id]);
          // location.reload();
          location.replace('/productDetail/' + id);
  }
  public onClickQuantity (): void {
     alert(1);
  }

  public onCreateOneQuantity (id :number): void {
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
          if (confirm("Add To Cart Success 3")) {

            this.StaticSrc.getOne(2).subscribe(data => {
              this.staticForm = new FormGroup({
                id : new FormControl(2),
                ShoesSandals : new FormControl(data.ShoesSandals + this.countCategory ("ShoesSandals" , this.cartFormOneQuantity.controls.category.value, 1)),
                HighHeels : new FormControl(data.HighHeels + this.countCategory ("HighHeels" , this.cartFormOneQuantity.controls.category.value , 1)),
                Sneakers : new FormControl(data.Sneakers + this.countCategory ("Sneakers" , this.cartFormOneQuantity.controls.category.value, 1)),
                SportShoes : new FormControl(data.SportShoes + this.countCategory ("SportShoes" , this.cartFormOneQuantity.controls.category.value, 1)),
                DollShoes : new FormControl(data.DollShoes + this.countCategory ("DollShoes" , this.cartFormOneQuantity.controls.category.value, 1)),
              });
               this.StaticSrc.setCategory(2, this.staticForm.value).subscribe(data =>{});
            });

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
          category : new FormControl(data1.category),
          price: new FormControl(data1.price),
          quantitySold: new FormControl(data1.quantitySold + 1),
          total : new FormControl(data1.price * ( data1.quantitySold + 1 ))
        });
        this.cartSrv.update(id , this.cartFormOneQuantity.value).subscribe(data => {
          if (confirm("Add To Cart Success 4")) {

            this.StaticSrc.getOne(2).subscribe(data => {
              this.staticForm = new FormGroup({
                id : new FormControl(2),
                ShoesSandals : new FormControl(data.ShoesSandals + this.countCategory ("ShoesSandals" , this.cartFormOneQuantity.controls.category.value, data1.quantitySold+ 1)),
                HighHeels : new FormControl(data.HighHeels + this.countCategory ("HighHeels" , this.cartFormOneQuantity.controls.category.value , data1.quantitySold + 1)),
                Sneakers : new FormControl(data.Sneakers + this.countCategory ("Sneakers" , this.cartFormOneQuantity.controls.category.value, data1.quantitySold + 1)),
                SportShoes : new FormControl(data.SportShoes + this.countCategory ("SportShoes" , this.cartFormOneQuantity.controls.category.value, data1.quantitySold + 1)),
                DollShoes : new FormControl(data.DollShoes + this.countCategory ("DollShoes" , this.cartFormOneQuantity.controls.category.value, data1.quantitySold + 1)),
              });
               this.StaticSrc.setCategory(2, this.staticForm.value).subscribe(data =>{});
            });

            this.route.navigate(['/product-list']);
          }
        });
      }else {
        return;
      }
    })
  }
}
