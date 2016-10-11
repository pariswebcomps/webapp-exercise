import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/mergeMap';

import { PeopleService } from '../people.service';

@Component({
  selector: 'pwc-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  person = {};

  constructor(
    private routes: ActivatedRoute,
    private service: PeopleService
  ) { }

ngOnInit() {
  this.routes.params
  .map(
    args => args['id']
  )
  .mergeMap(
    id => this.service.fetchOne(id)
  ).subscribe(
    person => this.person = person
  );
}

}
