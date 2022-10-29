import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductDetailComponent} from "./product-detail.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  { path: 'productDetail/:id', component: ProductDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ProductDetailRoutingModule { }

