import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';
import { People } from './mock.class';

import 'rxjs/add/observable/fromPromise';

@Injectable()
export class FirebaseService {

  items;

  constructor(
    private af: AngularFire
  ) {
    this.items = af.database.list('https://pwc-people.firebaseio.com/pwc-people');
  }

  resetDatabase() {
    this.items.remove();
    People.forEach( person => this.items.push(person) );
  }

  fetch() {
    return this.items.map( people => people.map(this.mapId) );
  }

  fetchOne(id) {
    return this.af.database.object(`pwc-people/${id}`).map( this.mapId );
  }

  delete(id) {
    return this.items.remove(id);
  }

  update(person) {
    delete person.$exists;
    delete person.$key;
    return Observable.fromPromise(
      <Promise<any>>(this.af.database.object(`pwc-people/${person.id}`).update(person))
    );
  }

  private mapId(person) {
    person.id = person.$key;
    return person;
  }

}
