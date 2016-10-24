import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/mergeMap';

import { PeopleService } from '../service/people.service';

@Component({
  selector: 'pwc-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  person = {};

  constructor(
    private routes: ActivatedRoute,
    private router: Router,
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

  redirect() {
    this.router.navigate(['/people']);
  }

  save(person) {
    this.service.update(person).subscribe(
      _ => this.router.navigate(['/people/detail', person.id])
    );
  }

}
