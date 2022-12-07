import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChangePasswordComponent} from "./changePassword.component";

const routes: Routes = [
  {path: 'changePassword', component: ChangePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordRoutingModule { }

