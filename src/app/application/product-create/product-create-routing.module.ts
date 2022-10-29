import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductCreateComponent} from "./product-create.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: 'product-create', component: ProductCreateComponent},
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
export class ProductCreateRoutingModule { }

