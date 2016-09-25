import {inject} from 'aurelia-framework';
import {PeopleService} from 'services/people';

@inject(PeopleService)
export class PeopleList {
  constructor(peopleService) {
    this.peopleService = peopleService;
  }

  people = [];

  activate() {
    return this.peopleService.list()
      .then(people => this.people = people);
  }
}
