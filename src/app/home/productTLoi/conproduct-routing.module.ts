import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConProductComponents} from "./conproduct.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: 'conproduct', component: ConProductComponents},
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
export class ConProductRoutingModule { }

