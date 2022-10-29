import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CowComponent} from "../cow/cow.component";

const routes: Routes = [
  {path: 'cow', component: CowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CowRoutingModule { }

