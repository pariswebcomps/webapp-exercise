import {inject} from 'aurelia-framework';
import {PeopleService} from 'services/people';

@inject(PeopleService)
export class PeopleShow {
  contact = {};

  constructor(peopleService) {
    this.peopleService = peopleService;
  }

  activate(params, routeConfig, navigationInstruction) {
    return this.peopleService.get(params.id)
      .then(contact => this.contact = contact);
  }
}
