import './country-phone-select.less';
import { countryInfoByISO, countryInfoByPhoneCode } from '../countries-info';
import { CountrySelector, ECountrySelectorEvents } from '../country-selector/country-selector';
import { HtmlElementBase } from '../html-element-base';
import { EPhoneNumberEvents, PhoneInput } from '../phone-input/phone-input';

export class CountryPhoneSelect extends HtmlElementBase {
  static get observedAttributes() {
    return ['value', 'country-code', 'country-phone-code', 'disabled', 'required', 'name'];
  }

  get countryCode() {
    return this.getAttribute('country-code');
  }

  set countryCode(value: string) {
    if (this.countryCode !== value) {
      this.setAttribute('country-code', value);
    }
  }

  get countryPhoneCode() {
    return this.getAttribute('country-phone-code');
  }

  set countryPhoneCode(value: string) {
    if (this.countryPhoneCode !== value) {
      this.setAttribute('country-phone-code', value);
    }
  }

  phoneInput: PhoneInput;
  countrySelector: CountrySelector;
  parentForm: HTMLFormElement;

  constructor() {
    super();

    this.parentForm = this.closest<HTMLFormElement>('form');
  }

  render() {
    const {
      phoneMask,
      phoneCode,
      ISO2
    } = (() => {
      if (!this.countryCode && !this.countryPhoneCode) return countryInfoByISO('US');

      return this.countryCode ? countryInfoByISO(this.countryCode) : countryInfoByPhoneCode(this.countryPhoneCode);
    })();

    this.innerHTML = String.raw`
      <countries-select
        country-phone-code="${phoneCode}"
        country-code="${ISO2}" 
        phone-number="${this.value}"
      ></countries-select>
      <phone-input
        value="${this.value}"
        pattern="${phoneMask || ''}"
      ></phone-input>
    `;

  }

  attributeChangedCallback(attrName: string, _oldVal, newVal) {
    if (!this.phoneInput) return;

    switch (attrName) {
      case 'disabled':
        if (newVal) {
          this.setAttributeForChild('disabled');
        } else {
          this.removeAttributeForChild('disabled');
        }
        break;
    }
  }

  connectedCallback() {
    this.render();

    this.phoneInput = this.getElementsByTagName('phone-input')[0] as PhoneInput;
    this.countrySelector = this.getElementsByTagName('countries-select')[0] as CountrySelector;

    if (this.disabled) {
      this.setAttributeForChild('disabled');
    }
    if (this.required) {
      this.setAttributeForChild('required');
    }

    this.countrySelector.addEventListener(ECountrySelectorEvents.ValueChanged, (event: CustomEvent<{ newValue: string; oldValue: string; }>) => {
      this.onCountryChange(this.countrySelector);
    });

    this.phoneInput.addEventListener(EPhoneNumberEvents.ValueChanged, (event: CustomEvent<{ newValue: string; oldValue: string; }>) => {
      this.onPhoneChange(this.phoneInput);
    });
  }

  setAttributeForChild(attrName: string) {
    this.phoneInput.setAttribute(attrName, '');
    this.countrySelector.setAttribute(attrName, '');
  }

  removeAttributeForChild(attrName: string) {
    this.phoneInput.removeAttribute(attrName);
    this.countrySelector.removeAttribute(attrName);
  }

  onPhoneChange(elem: PhoneInput) {
    this.value = elem.value;
    this.invalid = elem.invalid;

    this.countrySelector.setAttribute('phone-number', elem.value);
  }

  onCountryChange(elem: CountrySelector) {
    const { phoneMask, phoneCode, ISO2 } = countryInfoByISO(elem.countryCode);

    this.countryCode = ISO2;
    this.countryPhoneCode = phoneCode.toString();

    this.phoneInput.pattern = phoneMask;
  }
}

if (!customElements.get('country-phone-select')) {
  customElements.define('country-phone-select', CountryPhoneSelect);
}
