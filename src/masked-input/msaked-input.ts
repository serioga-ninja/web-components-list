/**
 * Mask legend
 * \d - number
 * \w - string
 */

type TAttributes = 'pattern' | 'value';

customElements.define('masked-input', class extends HTMLElement {
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

  isValid(): boolean {
    this.generateMaskedValue();

    if (!this.pattern) {
      this.invalid = false;

      return true;
    }

    const invalid = !(new RegExp(this.pattern).test(this.maskedValue));

    this.invalid = invalid;

    return !invalid;
  }

  generateMaskedValue() {
    if (!this.pattern) {
      this.maskedValue = this.inputValue;

      return;
    }

    const inputValue = this.inputValue.split('');
    const entries = this.pattern.match(/([d|w])/g);

    this.maskedValue = this.pattern;

    for (const c of entries) {
      if (inputValue.length === 0) break;

      this.maskedValue = this.maskedValue.replace(`\\${c}`, inputValue.shift());
    }

    this.maskedValue = this.maskedValue.replace(/\\/g, '');
  }

  cleanValue(value?: string): string {
    return !value ? '' : value.match(/([\d|\w])/g).join('');
  }
});
