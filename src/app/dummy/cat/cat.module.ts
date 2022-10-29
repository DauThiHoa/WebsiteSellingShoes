import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {CatRoutingModule} from "./cat-routing.module";
import {CatComponent} from "./cat.component";


@NgModule({
  declarations: [
    CatComponent
  ],
  imports: [
    CommonModule,
    CatRoutingModule,
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
export class CatModule { }
