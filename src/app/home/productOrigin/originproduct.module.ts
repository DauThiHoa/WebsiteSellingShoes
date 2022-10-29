import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductService} from "../../services/product.service";
import {OriginProductComponents} from "./originproduct.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OriginProductRoutingModule} from "./originproduct-routing.module";

@NgModule({
  declarations: [
   OriginProductComponents
  ],
  imports: [
    CommonModule,
    OriginProductRoutingModule,
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
export class OriginProductModule { }
