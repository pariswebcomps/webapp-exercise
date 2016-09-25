import {
  inject,
  computedFrom
} from 'aurelia-framework';
import {PeopleService} from 'services/people';

@inject(PeopleService)
export class PeopleList {
  constructor(peopleService) {
    this.peopleService = peopleService;
  }

  searchQuery = '';
  people = [];

  @computedFrom('people', 'searchQuery')
  get filteredPeople() {
    return this.people.filter(contact => {
      return `${contact.firstname} ${contact.lastname}`.includes(this.searchQuery);
    });
  }

  activate() {
    this.searchQuery = '';
    return this.peopleService.list()
      .then(people => this.people = people);
  }
}
