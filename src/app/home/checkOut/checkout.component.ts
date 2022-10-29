import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Cart} from "../../models/cart";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";
import {BillingService} from "../../services/billing.service";
import {createFakeEvent} from "@angular/cdk/testing/testbed/fake-events";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckOutComponent implements OnInit {

  productList: Array<Product> = [];
  cartList: Array<Cart> = [];
  totalMoney : number = 0 ;
  id : number = 0 ;
  submited: boolean = false;

  constructor(private proSrv : ProductService,
              private cartSrv : CartService,
              private billSrv : BillingService,
              private route: Router) { }

  today = new Date();
  date = this.today.getDate()+ '/' + (this.today.getMonth() + 1 )+ '/' + this.today.getFullYear();
  receipt : number = this.today.getDate() + 7 ;
  dateReceipt = this.receipt + '/' + (this.today.getMonth() + 1 )+ '/' + this.today.getFullYear();

  billingCreate = new FormGroup({

    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    postCode: new FormControl(''),
    phone: new FormControl(''),
    email : new FormControl("", [ Validators.required, Validators.email ]),
    paymentMethods: new FormControl(''),
    accountNumber : new FormControl(''),
    orderDate: new FormControl(this.date),
    receiptDate : new FormControl(this.dateReceipt),
    totalMoney : new FormControl(this.totalMoney),
  });

  productFormCreate = new FormGroup({
    name : new FormControl(''),
    price : new FormControl(''),
    sale_price : new FormControl(''),
    image : new FormControl(''),
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
  get f (){
    return this.productFormCreate.controls;
  }
  public onCreate(): void {
    this.submited = true ;
    if ( this.billingCreate.invalid){
      alert("Please continue to travel with information")
      return;

    }else {

        this.billingCreate = new FormGroup({

          firstName: new FormControl(this.billingCreate.controls.firstName.value),
          lastName: new FormControl(this.billingCreate.controls.lastName.value),
          address: new FormControl(this.billingCreate.controls.address.value),
          postCode: new FormControl(this.billingCreate.controls.postCode.value),
          phone: new FormControl(this.billingCreate.controls.phone.value),
          email : new FormControl(this.billingCreate.controls.email.value),
          paymentMethods: new FormControl(this.billingCreate.controls.paymentMethods.value),
          accountNumber : new FormControl(this.billingCreate.controls.accountNumber.value),
          orderDate: new FormControl(this.date),
          receiptDate : new FormControl(this.dateReceipt),
          totalMoney : new FormControl(this.totalMoney),

        });

        this.billSrv.create(this.billingCreate.value).subscribe(data =>{
          if (confirm("Add Order Success")) {

            this.cartSrv.getCart().subscribe(data1 =>  {
              for (const datum of data1) {
                this.cartSrv.delete(datum.id).subscribe(data2 =>  {
                })
              }
            })
            this.route.navigate(['/home']);
          }
        });

    }
  }
  public onCreateProduct(): void {
    this.submited = true ;
    if ( this.productFormCreate.invalid){
      return;
    }else {
      this.proSrv.create(this.productFormCreate.value).subscribe(data =>{
        if (confirm("Add Product Success")) {
          this.route.navigate(['/product-list']);
        }
      });
    }
  }
}
