export abstract class HtmlElementBase extends HTMLElement {
  protected _ready: boolean;

  get invalid() {
    return this.hasAttribute('invalid');
  }

  set invalid(value: boolean) {
    if (value) {
      this.setAttribute('invalid', '');
    } else {
      this.removeAttribute('invalid');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get required() {
    return this.hasAttribute('required');
  }

  set required(value: boolean) {
    if (value) {
      this.setAttribute('required', '');
    } else {
      this.removeAttribute('required');
    }
  }

  get value() {
    return this.getAttribute('value');
  }

  set value(value: string) {
    if (value !== this.value) {
      this.setAttribute('value', value);
    }
  }

  constructor() {
    super();

    this._ready = false;
  }

  connectedCallback() {
    this._ready = true;
  }
}
