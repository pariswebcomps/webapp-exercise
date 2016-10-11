import { RouterModule } from '@angular/router';

import { HomeComponent } from './shared/';

const routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'people', loadChildren: 'app/people/people.module#PeopleModule' }
];

export const AppRoutes = RouterModule.forRoot(routes, {useHash: true});
