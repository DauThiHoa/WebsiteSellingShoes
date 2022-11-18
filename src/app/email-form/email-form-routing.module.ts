import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmailFormComponent} from "./email-form.component";

const routes: Routes = [
  {path: 'emailForm', component: EmailFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailFormRoutingModule { }

