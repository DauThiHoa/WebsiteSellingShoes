import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductService} from "../../services/product.service";
import {BlogDetailsComponent} from "./blogdetails.component";
import {BlogDetailsRoutingModule} from "./blogdetails-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    BlogDetailsComponent
  ],
  imports: [
    CommonModule,
    BlogDetailsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule
    ],
  providers: [
    ProductService
  ],

})
export class BlogDetailsModule { }
