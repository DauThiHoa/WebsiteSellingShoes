import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../models/product";
import {CartService} from "../../services/cart.service";
import {Cart} from "../../models/cart";

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
  relatedProduct: Array<Product> = new Array<Product>();
  related: Array<Product> = new Array<Product>();

  quantity : number = 0 ;
  quantitySold : number = 0 ;

  constructor(private prodSrv: ProductService,
              private cartSrv: CartService,
              private _route: ActivatedRoute,
              private productService: ProductService,
              private route: Router) {
  }

  today = new Date();

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
        price : new FormControl(data.price),
        quantitySold : new FormControl(),
        total : new FormControl(data.price * this.quantity)
      });

    })

      if (this.cartForm.invalid) {
        return;
      } else {
        this.cartSrv.create(this.cartForm.value).subscribe(data => {
          if (confirm("Add To Cart Success")) {
            this.route.navigate(['/product-list']);
          }
        });
      }

      this.cartSrv.getOne(id).subscribe(data1 => {
        if (data1.id != null) {
          this.quantity = this.cartForm.controls.quantitySold.value;

          this.cartForm = new FormGroup({
            id: new FormControl(id),
            name: new FormControl(data1.name),
            image: new FormControl(data1.image),
            price: new FormControl(data1.price),
            quantitySold: new FormControl(data1.quantitySold + this.quantitySold),
            total : new FormControl(data1.price * ( data1.quantitySold + this.quantitySold))
          });
          this.cartSrv.update(id, this.cartForm.value).subscribe(data => {
            if (confirm("Add To Cart Success")) {
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

  // public onCreateOneQuantity (id :number): void {
  //   this.prodSrv.getOne(id).subscribe(data => {
  //
  //     // alert(id)
  //     this.cartFormOneQuantity = new FormGroup({
  //       id: new FormControl(id),
  //       name: new FormControl(data.name),
  //       image: new FormControl(data.image),
  //       price: new FormControl(data.price),
  //       quantitySold: new FormControl(1),
  //       total : new FormControl(data.price * 1 )
  //     });
  //
  //     this.cartSrv.getOne(id).subscribe(data1 => {
  //       if (data1.id != null) {
  //         this.cartFormOneQuantity = new FormGroup({
  //           id: new FormControl(id),
  //           name: new FormControl(data.name),
  //           image: new FormControl(data.image),
  //           price: new FormControl(data.price),
  //           quantitySold: new FormControl(data1.quantitySold + 1),
  //           total : new FormControl(data1.price * ( data1.quantitySold + 1 ))
  //         });
  //         this.cartSrv.update(id , this.cartFormOneQuantity.value).subscribe(data => {
  //           if (confirm("Add To Cart Success")) {
  //             this.route.navigate(['/product-list']);
  //           }
  //         });
  //       }else {
  //         return;
  //       }
  //     })
  //     this.submited = true;
  //
  //     if (this.cartFormOneQuantity.invalid) {
  //       return;
  //     } else {
  //       this.cartSrv.create(this.cartFormOneQuantity.value).subscribe(data => {
  //         if (confirm("Add To Cart Success")) {
  //           this.route.navigate(['/product-list']);
  //         }
  //       });
  //     }
  //   })
  // }

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
