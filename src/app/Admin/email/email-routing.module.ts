import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmailComponents} from "./email.component";

const routes: Routes = [
  {path: 'email', component: EmailComponents},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }

