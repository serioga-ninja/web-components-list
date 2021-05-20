import './country-phone-select.less';
import { countryInfoByISO } from '../countries-info';
import { CountrySelector } from '../country-selector/country-selector';
import { HtmlElementBase } from '../html-element-base';
import { PhoneInput } from '../phone-input/phone-input';

customElements.define('country-phone-select', class extends HtmlElementBase {
  static get observedAttributes() {
    return ['value', 'country-code', 'country-phone-code', 'disabled', 'required'];
  }

  get countryCode() {
    return this.getAttribute('country-code') || 'US';
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
  countryObserver: MutationObserver;
  phoneObserver: MutationObserver;

  constructor() {
    super();

    this.countryObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          this.onCountryChange(mutation.target as CountrySelector);
        }
      });
    });
    this.phoneObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          this.onPhoneChange(mutation.target as PhoneInput);
        }
      });
    });
  }

  render() {
    const { phoneMask } = countryInfoByISO(this.countryCode);

    this.innerHTML = String.raw`
      <countries-select
        country-phone-code="${this.countryPhoneCode}"
        country-code="${this.countryCode}" 
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
          this.setDisabledForChild();
        } else {
          this.removeDisabledForChild();
        }
        break;
    }
  }

  connectedCallback() {
    this.render();

    this.phoneInput = this.getElementsByTagName('phone-input')[0] as PhoneInput;
    this.countrySelector = this.getElementsByTagName('countries-select')[0] as CountrySelector;

    if (this.disabled) {
      this.setDisabledForChild();
    }

    this.countryObserver.observe(this.getElementsByTagName('countries-select')[0], {
      attributes: true
    });

    this.phoneObserver.observe(this.phoneInput, {
      attributes: true
    });
  }

  setDisabledForChild() {
    this.phoneInput.setAttribute('disabled', '');
    this.countrySelector.setAttribute('disabled', '');
  }

  removeDisabledForChild() {
    this.phoneInput.removeAttribute('disabled');
    this.countrySelector.removeAttribute('disabled');
  }

  onPhoneChange(elem: PhoneInput) {
    this.value = elem.value;
    this.invalid = elem.invalid;
  }

  onCountryChange(elem: CountrySelector) {
    const { phoneMask, phoneCode, ISO2 } = countryInfoByISO(elem.countryCode);

    this.countryCode = ISO2;
    this.countryPhoneCode = phoneCode.toString();

    this.phoneInput.pattern = phoneMask;
  }

});
