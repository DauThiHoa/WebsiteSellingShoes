import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EmailComponents} from "./email.component";
import {EmailRoutingModule} from "./email-routing.module";
import {ProductService} from "../../services/product.service";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    EmailComponents
  ],
  imports: [
    CommonModule,
    EmailRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
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
