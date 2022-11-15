import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfileComponents} from "./profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import {ProductService} from "../../services/product.service";


@NgModule({
  declarations: [
    ProfileComponents
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
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
export class ProfileModule { }
