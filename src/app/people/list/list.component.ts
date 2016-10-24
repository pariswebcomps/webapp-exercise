import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../service/people.service';

@Component({
  selector: 'pwc-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  people;

  constructor(
    private service: PeopleService
  ) { }

  ngOnInit() {
    this.service.fetch().subscribe(
      people => this.people = people
    );
  }

  onDeletePerson(person) {
    this.service.delete(person.id).subscribe(
      people => this.people = people
    );
  }

  onReset() {
    this.service.resetDatabase();
  }

}
