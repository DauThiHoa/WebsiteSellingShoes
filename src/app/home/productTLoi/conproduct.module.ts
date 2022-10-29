import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductService} from "../../services/product.service";
import {ConProductComponents} from "./conproduct.component";
import {ConProductRoutingModule} from "./conproduct-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
  ConProductComponents
  ],
  imports: [
    CommonModule,
    ConProductRoutingModule,
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
export class ConProductModule { }
