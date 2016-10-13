import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const BASE_URL = 'http://localhost:3001';

@Injectable()
export class PeopleService {

  constructor(private http: Http) {}

  resetDatabase() {
    console.log('resetting database...');
  }

  fetch() {
    return this.http.get(`${BASE_URL}/api/peoples`)
      .map( res => res.json() );
  }

  fetchOne(id) {
    return this.http.get(`${BASE_URL}/api/peoples/${id}`)
      .map( res => res.json() );
  }

  delete(id) {
    return this.http.delete(`${BASE_URL}/api/peoples/${id}`)
      .map( res => res.json() );
  }

  update(person) {
    return this.http.put(`${BASE_URL}/api/peoples/${person.id}`, person)
      .map( res => res.json() );
  }

}
