import {valueConverter} from 'aurelia-framework';

@valueConverter('uppercase')
export class UppercaseValueConverter {
  toView(value) {
    return value ? value.toUpperCase() : '';
  }
}
