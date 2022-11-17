import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HistoryComponents} from "./history.component";
import {HistoryRoutingModule} from "./history-routing.module";
import {ProductService} from "../../services/product.service";


@NgModule({
  declarations: [
    HistoryComponents
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
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
export class HistoryModule { }
