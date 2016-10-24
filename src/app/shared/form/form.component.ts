import { Component, OnInit, OnChanges, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'pwc-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {

  private isUpdateMode: boolean;
  @Input() person: any = {};
  @Output() onSubmit: EventEmitter<any>;
  @Output() onCancel: EventEmitter<any>;

  form: FormGroup;

  constructor() {
    this.onSubmit = new EventEmitter<any>();
    this.onCancel = new EventEmitter<any>();
    this.form = this._buildForm();
  }

  ngOnInit() {
    this.isUpdateMode = !this.person;
  }

  ngOnChanges(record) {
    if (record.person && record.person.currentValue) {
      this.person = record.person.currentValue;
      this.form.patchValue(this.person);
    }
  }

  submit() {
    this.onSubmit.emit(this._patchModel(this.person, this.form.value));
    this._reset();
  }

  cancel() {
    this.onCancel.emit();
    this._reset();
  }

  private _reset() {
    this.form = this._buildForm();
  }

  private _buildForm() {
    return new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      photo: new FormControl('https://randomuser.me/api/portraits/lego/6.jpg'),
      phone: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('0[0-9]{9}')
      ]))
    });
  }

  private _patchModel(person: any, form: any) {
    for (let prop in form) {
      if (form.hasOwnProperty(prop)) {
        person[prop] = form[prop];
      }
    }
    return person;
  }

}
