import environment from './environment';
import {
  inject,
  LogManager
} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {PeopleService} from 'services/people';

let logger = LogManager.getLogger('people-edit');

@inject(
  PeopleService,
  Router
)
export class PeopleEdit {
  constructor(peopleService, router) {
    this.peopleService = peopleService;
    this.router = router;
  }

  initialConcact = {};
  dirtyContact = {};

  activate(params, routeConfig, navigationInstruction) {
    if (environment.debug) logger.info(`edit contact ${params.id}`);

    return this.peopleService.get(params.id)
      .then(contact => {
        this.initialConcact = contact;
        this.dirtyContact = contact;
      });
  }

  save() {
    return this.peopleService.update(this.dirtyContact).then(contact => {
      this.router.navigateToRoute('people-show', {id: this.dirtyContact.id});
    });
  }

  cancel() {
    this.router.navigateToRoute('people-show', {id: this.initialConcact.id});
  }
}
