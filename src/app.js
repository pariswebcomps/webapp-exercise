import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Peoples';
    config.map([
      {route: ['', 'people'],    moduleId: 'people-list'},
      {route: 'people/new',      moduleId: 'people-new'},
      {route: 'people/:id',      moduleId: 'people-show'},
      {route: 'people/:id/edit', moduleId: 'people-edit'}
    ]);

    this.router = router;
  }
}
