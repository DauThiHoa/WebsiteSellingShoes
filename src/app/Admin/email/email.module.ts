import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EmailComponents} from "./email.component";
import {EmailRoutingModule} from "./email-routing.module";
import {ProductService} from "../../services/product.service";


@NgModule({
  declarations: [
    EmailComponents
  ],
  imports: [
    CommonModule,
    EmailRoutingModule,
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
export class EmailModule { }
