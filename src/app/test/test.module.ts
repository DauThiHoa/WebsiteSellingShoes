import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TestRoutingModule} from "./test-routing.module";
import { TestComponent } from './test/test.component';
import {ProductService} from "../services/product.service";


@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule
  ],
    exports: [
        TestComponent
    ],
  providers: [
    ProductService
  ],

})
export class TestModule { }
