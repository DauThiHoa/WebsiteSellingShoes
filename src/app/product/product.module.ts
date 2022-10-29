import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponent} from './product.component';
import {ListProductComponent} from './list-product/list-product.component';
import {DetailComponent} from './detail/detail.component';
import {RouterModule} from "@angular/router";
import {ProductRoutingModule} from "./product-routing.module";
import {Data} from "./data";
import {ProductService} from "../services/product.service";


@NgModule({
  declarations: [
    ProductComponent,
    ListProductComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProductRoutingModule,
  ],
  exports: [
    ProductComponent,
    ListProductComponent,
    DetailComponent

  ],
  providers: [
    Data,
    ProductService
  ]
})
export class ProductModule {
}
