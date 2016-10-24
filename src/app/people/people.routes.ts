import { RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { MapsComponent } from './maps/maps.component';

const routes = [
  { path: 'people', component: ListComponent },
  { path: 'people/edit/:id', component: EditComponent },
  { path: 'people/detail/:id', component: DetailComponent },
  { path: 'people/map/:id', component: MapsComponent }
];

export const PeopleRoutes = RouterModule.forChild(routes);
