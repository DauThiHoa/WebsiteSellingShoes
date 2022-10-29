import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WalletProductComponents} from "./walletproduct.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: 'pubgproduct', component: WalletProductComponents},
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
export class WalletProductRoutingModule { }

