import {ValidationRules} from 'aurelia-validation';

export class Contact {
  id = '';
  firstname = '';
  lastname = '';
  email = '';
  phone = '';

  constructor(contact) {
    this.id = contact.id;
    this.firstname = contact.firstname;
    this.lastname = contact.lastname;
    this.email = contact.email;
    this.phone = contact.phone;
  }
}

ValidationRules
  .ensure((contact) => contact.firstname).required()
  .ensure((contact) => contact.lastname).required()
  .ensure((contact) => contact.email).required().email()
  .on(Contact);
