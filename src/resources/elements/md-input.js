import {
  inject,
  bindable,
  bindingMode
} from 'aurelia-framework';

@inject(Element)
export class MdInputCustomElement {
  @bindable type = 'text';
  @bindable name;
  @bindable label;
  @bindable({defaultBindingMode: bindingMode.twoWay}) value;

  constructor(element) {
    this.element = element;
  }
}
