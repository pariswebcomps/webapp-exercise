import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';

import { MdModule } from '../core/';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';


@NgModule({
  imports: [
    MdModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    CardComponent,
    HomeComponent,
    FormComponent
  ],
  exports: [
    CardComponent,
    HomeComponent,
    FormComponent
  ]
})
export class SharedModule { }
