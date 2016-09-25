import environment from './environment';
import {
  inject,
  LogManager
} from 'aurelia-framework';
import {PeopleService} from 'services/people';

let logger = LogManager.getLogger('people-show');

@inject(PeopleService)
export class PeopleShow {
  constructor(peopleService) {
    this.peopleService = peopleService;
  }

  contact = {};

  activate(params, routeConfig, navigationInstruction) {
    if (environment.debug) logger.info(`navigate to ${params.id}`);

    return this.peopleService.get(params.id)
      .then(contact => this.contact = contact);
  }
}
