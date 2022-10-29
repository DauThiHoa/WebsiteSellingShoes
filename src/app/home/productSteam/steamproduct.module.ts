import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductService} from "../../services/product.service";
import {SteamProductComponents} from "./steamproduct.component";
import {SteamProductRoutingModule} from "./steamproduct-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
   SteamProductComponents
  ],
  imports: [
    CommonModule,
    SteamProductRoutingModule,
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
export class SteamProductModule { }
