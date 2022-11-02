import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShopComponents} from "./shop.component";
import {ShopRoutingModule} from "./shop-routing.module";
import {ProductService} from "../../services/product.service";


@NgModule({
  declarations: [
    ShopComponents
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    ],
  providers: [
    ProductService
  ],

})
export class ShopModule { }
