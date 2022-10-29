import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from './product.component';
import {DetailComponent} from './detail/detail.component';

const routes: Routes = [
  {path: 'products', component: ProductComponent},
  {path: 'product-detail/:id', component: DetailComponent},
  {path: 'product-test', component: DetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

