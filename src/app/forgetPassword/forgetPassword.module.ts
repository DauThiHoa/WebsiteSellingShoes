import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {ForgetPasswordComponent} from "./forgetPassword.component";
import {ForgetPasswordRoutingModule} from "./forgetPassword-routing.module";


@NgModule({
  declarations: [
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgetPasswordRoutingModule,
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
export class ForgetPasswordModule { }
