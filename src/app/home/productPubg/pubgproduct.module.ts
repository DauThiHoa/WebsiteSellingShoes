import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductService} from "../../services/product.service";
import {PubgProductComponents} from "./pubgproduct.component";
import {PubgProductRoutingModule} from "./pubgproduct-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
   PubgProductComponents
  ],
  imports: [
    CommonModule,
    PubgProductRoutingModule,
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
export class PubgProductModule { }
