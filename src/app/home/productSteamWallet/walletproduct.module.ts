import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductService} from "../../services/product.service";
import {WalletProductComponents} from "./walletproduct.component";
import {WalletProductRoutingModule} from "./walletproduct-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
   WalletProductComponents
  ],
  imports: [
    CommonModule,
    WalletProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  exports: [
    ReactiveFormsModule,
    FormsModule
    ],
  providers: [
    ProductService
  ],

})
export class WalletProductModule { }
