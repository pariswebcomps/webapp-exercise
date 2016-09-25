import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();
httpClient.configure(config => {
  config.withBaseUrl('http://localhost:3001/api/')
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

  update(data) {
    return httpClient
      .fetch(`peoples/${data.id}`, {
        method: 'put',
        body: json(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }
}
