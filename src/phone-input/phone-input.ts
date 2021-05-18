/**
 * Mask legend
 * \d - number
 */

type TAttributes = 'pattern' | 'value';

export class PhoneInput extends HTMLElement {
  static get observedAttributes() {
    return [
      'value', // input value
      'pattern', // mask,
      'invalid', // validation
    ];
  }

  get invalid() {
    return !!this.getAttribute('invalid');
  }

  set invalid(value: boolean) {
    if (value) {
      this.setAttribute('invalid', '');
    } else {
      this.removeAttribute('invalid');
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

  get inputValue() {
    return this.inputElement.value;
  }

  set inputValue(value: string) {
    this.inputElement.value = value;
  }

  get pattern() {
    return this.getAttribute('pattern');
  }

  set pattern(value: string) {
    if (this.pattern !== value) {
      this.setAttribute('pattern', value);
    }
  }

  private maskedValue: string;
  private inputElement: HTMLInputElement;

  constructor() {
    super();

    this.innerHTML = '<input type="text" />';
    this.inputElement = this.getElementsByTagName('input')[0];
    this.inputElement.addEventListener('input', this.onInputEvent.bind(this));
  }

  attributeChangedCallback(attrName: TAttributes) {
    switch (attrName) {
      case 'value':
      case 'pattern':
        this.onInputEvent();
        break;
    }
  }

  onInputEvent() {
    this.processInputValue();
    this.generateMaskedValue();

    const valid = this.isValid();

    if (valid) {
      this.value = this.inputValue;
      this.inputValue = this.maskedValue;
    } else {
      this.invalid = this.invalid;
      this.value = '';
      this.inputValue = this.cleanValue(this.inputValue);
    }
  }

  processInputValue() {
    this.inputValue = this.cleanValue(this.inputValue);
  }

  isValid(): boolean {
    if (!this.pattern) {
      this.invalid = false;

      return true;
    }

    const invalid = !(new RegExp(`^${this.pattern}$`).test(this.maskedValue));

    this.invalid = invalid;

    return !invalid;
  }

  generateMaskedValue() {
    if (!this.pattern) {
      this.maskedValue = this.inputValue;

      return;
    }

    const inputValue = this.inputValue.split('');
    const entries = this.pattern.match(/([d])/g);

    this.maskedValue = this.pattern;

    for (const num of inputValue) {
      if (entries.length === 0) {
        this.maskedValue += num;
      } else {
        this.maskedValue = this.maskedValue.replace(`\\${entries.shift()}`, num);
      }

    }

    this.maskedValue = this.maskedValue.replace(/\\/g, '');
  }

  cleanValue(value?: string): string {
    return !value ? '' : value.match(/([\d])/g)?.join('') || '';
  }
}

customElements.define('phone-input', PhoneInput);
