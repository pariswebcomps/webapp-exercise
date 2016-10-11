import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const BASE_URL = 'http://localhost:3001';

@Injectable()
export class PeopleService {

  constructor(private http: Http) {}

  fetch() {
    return this.http.get(`${BASE_URL}/api/peoples`)
      .map( res => res.json() );
  }

  fetchRandom() {
    return this.http.get(`${BASE_URL}/api/peoples/random`)
      .map( res => res.json() );
  }

  fetchOne(id) {
    return this.http.get(`${BASE_URL}/api/peoples/${id}`)
      .map( res => res.json() );
  }

  fetchBySkill(skill) {
    return this.http.get(`${BASE_URL}/api/peoples/skill/${skill}`)
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

  create(person) {
    return this.http.post(`${BASE_URL}/api/peoples`, JSON.stringify(person))
      .map( res => res.json() );
  }
}
