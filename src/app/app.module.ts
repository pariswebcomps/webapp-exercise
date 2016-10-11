import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CoreModule } from './core/';
import { PeopleModule } from './people/';
import { SharedModule } from './shared/';

import { AppRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    PeopleModule,
    SharedModule,
    AppRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
