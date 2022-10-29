import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductService} from "../../services/product.service";
import {ProductEditRoutingModule} from "./product-edit-routing.module";
import {ProductEditComponent} from "./product-edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProductEditComponent
  ],
  imports: [
    CommonModule,
    ProductEditRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    ],
  providers: [
    ProductService
  ],

})
export class ProductEditModule { }
