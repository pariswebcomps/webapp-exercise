export class App {
  configureRouter(config, router) {
    this.router = router;

    // Set title
    config.title = 'People';

    // Add application's routes
    config.map([
      {route: '',                redirect: 'people' },
      {route: 'people',          moduleId: 'people-list', name: 'people-list', nav: true, title: 'People'},
      {route: 'people/:id',      moduleId: 'people-show', name: 'people-show'},
      {route: 'people/:id/edit', moduleId: 'people-edit', name: 'people-edit'}
    ]);

  }
}
