import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HistoryComponents} from "./history.component";

const routes: Routes = [
  {path: 'history', component: HistoryComponents},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }

