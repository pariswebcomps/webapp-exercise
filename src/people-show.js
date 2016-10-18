import {inject} from 'aurelia-framework';
import {PeopleService} from 'services/people';

@inject(PeopleService)
export class PeopleShow {
  constructor(peopleService) {
    this.peopleService = peopleService;
  }

  contact = {};

  activate(params, routeConfig, navigationInstruction) {
    return this.peopleService.get(params.id)
      .then(contact => this.contact = contact);
  }
}
