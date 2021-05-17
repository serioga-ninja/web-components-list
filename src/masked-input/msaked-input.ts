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

  private inputLength?: number;
  private maskedValue: string;
  private inputElement: HTMLInputElement;

  constructor() {
    super();

    this.innerHTML = '<input type="text" />';
    this.inputElement = this.getElementsByTagName('input')[0];
    this.inputElement.addEventListener('input', this.onInputEvent.bind(this));
  }

  initialize() {
    this.inputLength = this.pattern.match(/([d|w])/g)?.length;

    if (!this.inputLength) {
      console.error(`Bad pattern "${this.pattern}" for masked-input`);
    }
  }

  connectedCallback() {
    this.initialize();
  }

  attributeChangedCallback(attrName: TAttributes, _oldVal: string, newVal: string) {
    switch (attrName) {
      case 'value':
        if (newVal !== this.value) {
          this.initialize();
        }
        break;
    }
  }

  onInputEvent(ev: InputEvent) {
    if (this.inputLength !== this.inputValue.length) {
      this.invalid = true;
      this.inputValue = this.cleanValue(this.inputValue);
      this.value = '';

      return;
    }

    this.generateMaskedValue();
    this.invalid = !(new RegExp(this.pattern).test(this.maskedValue));

    if (!this.invalid) {
      this.value = this.inputValue;
      this.inputValue = this.maskedValue;
    } else {
      this.value = '';
      this.inputValue = this.cleanValue(this.inputValue);
    }
  }

  generateMaskedValue() {
    const inputValue = this.inputValue.split('');
    this.maskedValue = this.pattern;
    const entries = this.pattern.match(/([\\d|\\w])/g);

    for (const c in entries) {
      this.maskedValue = this.maskedValue.replace(`\\d`, inputValue.shift());
    }

    this.maskedValue = this.maskedValue.replace(/\\/g, '');
  }

  cleanValue(value?: string): string {
    return !value ? '' : value.match(/([\d|\w])/g).join('');
  }
});
