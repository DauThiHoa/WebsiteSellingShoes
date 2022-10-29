import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {DogRoutingModule} from "./dog-routing.module";
import {DogComponent} from "./dog.component";


@NgModule({
  declarations: [
    DogComponent
  ],
  imports: [
    CommonModule,
    DogRoutingModule,
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
export class DogModule { }
