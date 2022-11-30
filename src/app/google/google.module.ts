import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GoogleRoutingModule } from './google-routing.module';
import { GoogleComponent } from './google.component';

@NgModule({
  declarations: [
    GoogleComponent
  ],
  imports: [
    BrowserModule,
    GoogleRoutingModule
  ],
  providers: [],
  bootstrap: [GoogleComponent]
})
export class GoogleModule { }
