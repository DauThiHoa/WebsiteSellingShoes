import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CheckOutComponent} from "./checkout.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: 'checkout', component: CheckOutComponent},
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
export class CheckOutRoutingModule { }

