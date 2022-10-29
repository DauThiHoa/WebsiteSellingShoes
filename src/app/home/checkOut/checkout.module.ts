import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductService} from "../../services/product.service";
import {CheckOutComponent} from "./checkout.component";
import {CheckOutRoutingModule} from "./checkout-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CheckOutComponent
  ],
  imports: [
    CommonModule,
    CheckOutRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule
    ],
  providers: [
    ProductService
  ],

})
export class CheckoutModule { }
