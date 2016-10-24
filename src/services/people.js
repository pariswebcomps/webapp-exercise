import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();
httpClient.configure(config => {
  config.withBaseUrl('http://localhost:3001/api/');
});

export class PeopleService {
  list() {
    return httpClient
      .fetch('peoples')
      .then(response => response.json());
  }

  get(id) {
    return httpClient
      .fetch(`peoples/${id}`)
      .then(response => response.json());
  }

  update(dirtyData) {
    return httpClient
      .fetch(`peoples/${dirtyData.id}`, {
        method: 'put',
        body: json(dirtyData)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }
}
