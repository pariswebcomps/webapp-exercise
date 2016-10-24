import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MdModule } from './md.module';
import { FirebaseModule } from './firebase.module';

@NgModule({
  providers: [],
  exports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    MdModule,
    FirebaseModule
  ]
})
export class CoreModule { }
