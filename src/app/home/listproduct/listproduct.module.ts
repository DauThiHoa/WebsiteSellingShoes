import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductService} from "../../services/product.service";
import {ListProductComponents} from "./listproduct.component";
import {ListProductRoutingModule} from "./listproduct-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ListProductComponents
  ],
  imports: [
    CommonModule,
    ListProductRoutingModule,
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
export class ListProductModule { }
