import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {CowRoutingModule} from "./cow-routing.module";
import {CowComponent} from "./cow.component";


@NgModule({
  declarations: [
    CowComponent
  ],
  imports: [
    CommonModule,
    CowRoutingModule,
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
export class CowModule { }
