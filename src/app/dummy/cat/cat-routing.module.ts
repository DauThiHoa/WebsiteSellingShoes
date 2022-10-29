import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CatComponent} from "./cat.component";

const routes: Routes = [
  {path: 'cat', component: CatComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatRoutingModule { }

