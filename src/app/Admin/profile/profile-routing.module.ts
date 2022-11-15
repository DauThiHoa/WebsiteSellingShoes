import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponents} from "./profile.component";

const routes: Routes = [
  {path: 'profile', component: ProfileComponents},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

