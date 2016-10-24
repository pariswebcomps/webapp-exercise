import {inject, NewInstance} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import {ValidationController, validateTrigger} from 'aurelia-validation';
import {MaterializeFormValidationRenderer} from 'aurelia-materialize-bridge';

import {Contact} from 'model/contact';
import {PeopleService} from 'services/people';
import {formalize} from 'decorators/forms';

@formalize
@inject(NewInstance.of(ValidationController), PeopleService, Router)
export class PeopleEdit {
  validationController = null;
  dirtyContact = null;

  constructor(validationController, peopleService, router) {
    this.peopleService = peopleService;
    this.router = router;

    this.validationController = validationController;
    this.validationController.validateTrigger = validateTrigger.change;
    this.validationController.addRenderer(new MaterializeFormValidationRenderer());
  }

  activate(params, routeConfig, navigationInstruction) {
    return this.peopleService.get(params.id)
      .then(contact => {
        this.dirtyContact = new Contact(contact);
        return null;
      });
  }

  submit() {
    this.peopleService.update(this.dirtyContact)
      .then(() => this.navigateContact());
  }

  navigateContact() {
    this.router.navigateToRoute('people-show', {id: this.dirtyContact.id});
  }
}
