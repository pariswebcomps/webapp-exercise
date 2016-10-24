export function formalize(viewModelClass) {
  let submitHandler = viewModelClass.prototype.submit;

  if (typeof submitHandler !== 'undefined') {
    viewModelClass.prototype.submit = function(...args) {
      return this.controller.validate().then((errors) => {
        if (errors.length === 0) {
          submitHandler.call(this, ...args);
        }
      });
    };
  }
}
