import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PubgProductComponents} from "./pubgproduct.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: 'pubgproduct', component: PubgProductComponents},
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
export class PubgProductRoutingModule { }

