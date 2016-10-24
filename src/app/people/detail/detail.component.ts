import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/mergeMap';

import { PeopleService } from '../service/people.service';

@Component({
  selector: 'pwc-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

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
