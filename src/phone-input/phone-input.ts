import { generateMaskedNumber } from '../countries-info';
import { HtmlElementBase } from '../html-element-base';

type TAttributes = 'pattern' | 'value' | 'disabled';

export enum EPhoneNumberEvents {
  ValueChanged = 'valuechanged'
}


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
    if (this.inputElement.value !== value) {
      // store current positions in variables
      const start = this.inputElement.selectionStart;
      const end = this.inputElement.selectionEnd;
      const last = end === this.inputElement.value.length;
      const oldValue = this.inputElement.value;

      this.inputElement.value = value;

      // restore from variables...
      this.inputElement.setSelectionRange(
        last ? value.length + 1 : start,
        last ? value.length + 1 : end
      );
    }
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

    this.innerHTML = `<input type="text" value="${this.value}" />`;
    this.inputElement = this.getElementsByTagName('input')[0];
    this.inputElement.addEventListener('input', () => this.onInputEvent());

    if (this.disabled) {
      this.inputElement.setAttribute('disabled', '');
    }

    if (this.required) {
      this.inputElement.setAttribute('required', '');
    }
  }

  attributeChangedCallback(attrName: TAttributes, oldValue?: string, newValue?: string) {
    if (!this._ready) return;

    switch (attrName) {
      case 'pattern':
        this.onInputEvent(true);
        break;
      case 'disabled':
        if (newValue !== null && newValue !== undefined) {
          this.inputElement.setAttribute('disabled', 'disabled');
        } else {
          this.inputElement.removeAttribute('disabled');
        }
        break;
    }
  }

  onInputEvent(silent = false) {
    this.processInputValue();
    this.generateMaskedValue();

    const valid = this.isValid();

    if (valid) {
      this.value = this.inputValue;
      this.updateInputValue(this.maskedValue, silent);
    } else {
      this.value = '';
      this.updateInputValue(this.cleanValue(this.inputValue), silent);
    }
  }

  updateInputValue(value: string, silent = false) {
    this.inputValue = value;

    if (!silent) {
      this.dispatchEvent(
        new CustomEvent(EPhoneNumberEvents.ValueChanged, {
          detail: {
            value
          }
        })
      );
    }
  }

  processInputValue() {
    this.updateInputValue(this.cleanValue(this.inputValue), true);
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

    this.maskedValue = generateMaskedNumber(this.inputValue, this.pattern);
  }

  cleanValue(value?: string): string {
    return !value ? '' : value.match(/([\d])/g)?.join('') || '';
  }

  override connectedCallback() {
    super.connectedCallback();

    if (this.value) {
      this.onInputEvent();
    }
  }
}

if (!customElements.get('phone-input')) {
  customElements.define('phone-input', PhoneInput);
}
