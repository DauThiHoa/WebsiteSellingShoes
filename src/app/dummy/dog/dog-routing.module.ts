import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DogComponent} from "../dog/dog.component";

const routes: Routes = [
  {path: 'dog', component: DogComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DogRoutingModule { }

