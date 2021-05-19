import { HtmlElementBase } from '../html-element-base';

type TAttributes = 'pattern' | 'value' | 'disabled';

/**
 * Mask legend
 * \d - number
 */

export class PhoneInput extends HtmlElementBase {
  static get observedAttributes() {
    return [
      'value', // input value
      'pattern', // mask,
      'invalid', // validation
      'disabled',
    ];
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

  attributeChangedCallback(attrName: TAttributes, oldValue, newValue) {
    switch (attrName) {
      case 'value':
      case 'pattern':
        this.onInputEvent();
        break;
      case 'disabled':
        if (newValue) {
          this.inputElement.setAttribute('disabled', 'disabled');
        } else {
          this.inputElement.removeAttribute('disabled');
        }
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
