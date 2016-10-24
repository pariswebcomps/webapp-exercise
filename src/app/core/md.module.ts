import { NgModule } from '@angular/core';

import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdCardModule } from '@angular2-material/card';
import { MdButtonModule } from '@angular2-material/button';
import { MdIconModule } from '@angular2-material/icon';
import { MdInputModule } from '@angular2-material/input';

const MdModules = [
  MdToolbarModule,
  MdCardModule,
  MdButtonModule,
  MdIconModule,
  MdInputModule
];

@NgModule({
  imports: [
    ...MdModules.map( md => md.forRoot() )
  ],
  exports: [
    ...MdModules
  ]
})
export class MdModule { }
