import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Cart} from "../../models/cart";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";
import {BillingService} from "../../services/billing.service";
import {createFakeEvent} from "@angular/cdk/testing/testbed/fake-events";
import {StatisticalService} from "../../services/statistical.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckOutComponent implements OnInit {

  paymentHandler: any = null;

  success: boolean = false

  failure:boolean = false


  productList: Array<Product> = [];
  cartList: Array<Cart> = [];
  totalMoney : number = 0 ;
  id : number = 0 ;
  submited: boolean = false;

  today = new Date();
  receipt = new Date();
  // date = this.today.getDate()+ '/' + this.today.getMonth() + '/' + this.today.getFullYear();
  // receipt : number = this.today.getDate() + 7 ;
  // dateReceipt = this.receipt + '/' + this.today.getMonth() + '/' + this.today.getFullYear();

  staticForm : FormGroup = new FormGroup({
  });
  staticForm2 : FormGroup = new FormGroup({
  });

  ShoesSandals: number;
  HighHeels: number;
  Sneakers: number;
  SportShoes: number;
  DollShoes: number;

  constructor(private proSrv : ProductService,
              private cartSrv : CartService,
              private billSrv : BillingService,
              private route: Router,
              private StaticSrc: StatisticalService) {

    this.receipt.setDate(this.today.getDate() + 7 );

  }

  billingCreate = new FormGroup({

    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    postCode: new FormControl(''),
    phone: new FormControl(''),
    email : new FormControl("", [ Validators.required, Validators.email ]),
    paymentMethods: new FormControl(''),
    accountNumber : new FormControl(''),
    orderDate: new FormControl(this.today.getFullYear()+ "-" +this.today.getMonth() + "-" + this.today.getDate()),
    receiptDate : new FormControl(this.receipt.getFullYear()+ "-" +this.receipt.getMonth() + "-" + this.receipt.getDate()),
    status : new FormControl("Ordered"),
    totalMoney : new FormControl(this.totalMoney),
  });

  productFormCreate = new FormGroup({
    name : new FormControl(''),
    price : new FormControl(''),
    sale_price : new FormControl(''),
    image : new FormControl(''),
  });

  ngOnInit(): void {

    // PAYMENT
    this.invokeStripe();



    this.proSrv.getList(3).subscribe(data =>  {
      this.productList = data;
    });

    this.cartSrv.getCart().subscribe(data =>  {

      this.cartList = data;

      for (const datum of this.cartList) {
        this.totalMoney += datum.price * datum.quantitySold      // CART TOTAL

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
          orderDate: new FormControl(this.today.getFullYear()+ "-" +this.today.getMonth() + "-" + this.today.getDate()),
          receiptDate : new FormControl(this.receipt.getFullYear()+ "-" +this.receipt.getMonth() + "-" + this.receipt.getDate()),
          status : new FormControl("Ordered"),
          totalMoney : new FormControl(this.totalMoney),

        });

        this.billSrv.create(this.billingCreate.value).subscribe(data =>{
          if (confirm("Add Order Success")) {

            this.StaticSrc.getOne(2).subscribe(data => {

                this.ShoesSandals = data.ShoesSandals;
                this.HighHeels = data.HighHeels;
                this.Sneakers = data.Sneakers;
                this.SportShoes = data.SportShoes;
                this.DollShoes = data.DollShoes;

            });

              this.StaticSrc.getOne(1).subscribe(data => {

                this.staticForm = new FormGroup({
                  id: new FormControl(1),
                  ShoesSandals: new FormControl(data.ShoesSandals + this.ShoesSandals),
                  HighHeels: new FormControl(data.HighHeels + this.HighHeels),
                  Sneakers: new FormControl(data.Sneakers + this.Sneakers),
                  SportShoes: new FormControl(data.SportShoes + this.SportShoes),
                  DollShoes: new FormControl(data.DollShoes + this.DollShoes),
                });
                // alert("Sneakers : + " + this.staticForm.controls.ShoesSandals.value);
                this.StaticSrc.setCategory(1, this.staticForm.value).subscribe(data =>{});
              });


            this.staticForm2 = new FormGroup({
              id : new FormControl(2),
              ShoesSandals : new FormControl(0),
              HighHeels : new FormControl(0),
              Sneakers : new FormControl(0),
              SportShoes : new FormControl(0),
              DollShoes : new FormControl(0),
            });
            this.StaticSrc.setCategory(2, this.staticForm2.value).subscribe(data =>{});


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


// THANH TOAN VISA
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51H7bbSE2RcKvfXD4DZhu',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');
      },
    });
    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51H7bbSE2RcKvfXD4DZhu',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
