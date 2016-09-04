import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Peoples';
    config.map([
      {route: ['', 'people'],       moduleId: 'people-list', name: 'people-list'},
      {route: 'people/new',         moduleId: 'people-new',  name: 'people-new'},
      {route: 'people/:email',      moduleId: 'people-show', name: 'people-show'},
      {route: 'people/:email/edit', moduleId: 'people-edit', name: 'people-edit'}
    ]);

    this.router = router;
  }
}
