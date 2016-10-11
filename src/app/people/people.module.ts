import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleComponent } from './people.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { PeopleService } from './people.service';

import { SharedModule } from '../shared/';

import { PeopleRoutes } from './people.routes';
import { MapsComponent } from './maps/maps.component';

@NgModule({
  declarations: [
    PeopleComponent,
    DetailComponent,
    EditComponent,
    ListComponent,
    MapsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PeopleRoutes
  ],
  providers: [
    PeopleService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PeopleModule { }
