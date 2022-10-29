
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BlogDetailsComponent} from "./blogdetails.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: 'blogDetails/:id', component: BlogDetailsComponent},
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
export class BlogDetailsRoutingModule { }

