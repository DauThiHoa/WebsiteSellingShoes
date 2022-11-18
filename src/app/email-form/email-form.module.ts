import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {EmailFormComponent} from "./email-form.component";
import {EmailFormRoutingModule} from "./email-form-routing.module";


@NgModule({
  declarations: [
    EmailFormComponent
  ],
  imports: [
    CommonModule,
    EmailFormRoutingModule,
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
export class EmailFormModule { }
