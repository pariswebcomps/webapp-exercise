import {valueConverter} from 'aurelia-framework';

@valueConverter('capitalize')
export class CapitalizeValueConverter {
  toView(value) {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
  }
}
