declare var require: any
import { NgModule }      from '@angular/core';
import { Firebase }      from 'firebase';
import { BrowserModule } from '@angular/platform-browser';

import { LandingComponent } from './landing.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations:	[ LandingComponent ],
  bootstrap:		[ LandingComponent ]
})

export class LandingModule { }