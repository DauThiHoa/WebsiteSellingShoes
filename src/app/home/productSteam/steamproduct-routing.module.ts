import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SteamProductComponents} from "./steamproduct.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: 'steamproduct', component: SteamProductComponents},
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
export class SteamProductRoutingModule { }

