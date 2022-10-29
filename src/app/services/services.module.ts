import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductService} from "./product.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    // ProductService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    // ProductService
  ]
})
export class ServicesModule {
}
