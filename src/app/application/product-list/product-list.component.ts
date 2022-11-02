import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {FormControl, FormGroup} from "@angular/forms";
import {Cart} from "../../models/cart";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {

  productList: Array<Product> = [];
  cartList: Array<Cart> = [];
  totalMoney : number = 0 ;
  cart : Cart = new Cart();
  submited: boolean = false;

  constructor(private proSrv : ProductService,
              private cartSrv : CartService,
              private route: Router) { }

  public searchForm = new FormGroup({
    name : new FormControl(''),
    price : new FormControl(''),
    sale_price : new FormControl(''),
  });

  cartForm = new FormGroup({
    id: new FormControl( ),
    name : new FormControl(),
    image : new FormControl(),
    price : new FormControl(),
    quantitySold : new FormControl(),
  });

  ngOnInit(): void {
    this.proSrv.getList(3).subscribe(data =>  {
      this.productList = data;
    });

    this.cartSrv.getCart().subscribe(data =>  {

      this.cartList = data;

      // CART TOTAL
      for (const datum of this.cartList) {
        this.totalMoney += datum.price * datum.quantitySold
      }
    })
  }

  onDelete(id:number){
    if (confirm("Do you want to delete the product?")){
      this.cartSrv.delete(id).subscribe(data =>{
        // Load data
        // Sửa đổi mặc định trong _limit = 4 => _limit = 10
        this.cartSrv.getList().subscribe(data =>  {
          this.cartList = data;
        })
      })
    }
  }

  onEdit(id : number){
    this.submited = true;
    this.cartSrv.getOne(id).subscribe(data1 => {

        this.cartForm = new FormGroup({
          id: new FormControl(id),
          name: new FormControl(data1.name),
          image: new FormControl(data1.image),
          price: new FormControl(data1.price),
          quantitySold: new FormControl(this.cartForm.controls.quantitySold.value),
          total : new FormControl(data1.price * this.cartForm.controls.quantitySold.value)
        });

        this.cartSrv.update(id, this.cartForm.value).subscribe(data => {
        });
      if (confirm("You have successfully edited the product in your shopping cart !")) {

        this.cartSrv.getList().subscribe(data =>  {
          this.cartList = data;

          for (const datum of this.cartList) {
            this.totalMoney += ( datum.price * datum.quantitySold ) ;
          }
          // this.totalMoney = this.totalMoney - (data1.price * this.cartForm.controls.quantitySold.value);
        })
      }
      // this.route.navigate(['/product-list']);
      location.reload();
    })

  }

  onEditQuantity (id : number){
    this.submited = true;
    this.cartSrv.getOne(id).subscribe(data1 => {

      this.cartForm = new FormGroup({
        id: new FormControl(id),
        name: new FormControl(data1.name),
        image: new FormControl(data1.image),
        price: new FormControl(data1.price),
        quantitySold: new FormControl(this.cartForm.controls.quantitySold.value),
        total : new FormControl(data1.price * this.cartForm.controls.quantitySold.value)
      });

      this.cartSrv.update(id, this.cartForm.value).subscribe(data => {
      });
      if (confirm("You have successfully edited the product in your shopping cart !")) {

        this.cartSrv.getList().subscribe(data =>  {
          this.cartList = data;

          for (const datum of this.cartList) {
            this.totalMoney += ( datum.price * datum.quantitySold ) ;
          }
          // this.totalMoney = this.totalMoney - (data1.price * this.cartForm.controls.quantitySold.value);
        })
      }
      // this.route.navigate(['/product-list']);
      location.reload();
    })

  }

  onSearch(){
    alert(this.searchForm.value.name);

    this.proSrv.getSearchName( this.searchForm.value.name).subscribe(data =>  {
      this.productList = data;
      alert(data)
    })

  }
  updateCart(){
    location.reload();
  }

}
