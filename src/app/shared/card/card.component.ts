import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pwc-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() person = {};
  @Input() expand = false;
  @Input() detailUrl = '';
  @Input() editUrl = '';
  @Input() mapUrl = '';

  @Output() delete;

  constructor() {
    this.delete = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  onDelete(person) {
    this.delete.emit(person);
  }

}
