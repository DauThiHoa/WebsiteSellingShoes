import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ForgetPasswordComponent} from "./forgetPassword.component";

const routes: Routes = [
  {path: 'forgetPassword', component: ForgetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetPasswordRoutingModule { }

