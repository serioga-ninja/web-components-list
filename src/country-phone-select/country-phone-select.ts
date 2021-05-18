import './country-phone-select.less';
import { countryInfoByISO } from '../countries-info';
import { CountrySelector } from '../country-selector/country-selector';
import { PhoneInput } from '../phone-input/phone-input';

customElements.define('country-phone-select', class extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'country-code', 'country-phone-code'];
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

  get invalid() {
    return this.phoneInput.invalid;
  }

  get value() {
    return this.phoneInput.value;
  }

  set value(value: string) {
    this.phoneInput.value = value;
  }

  phoneInput: PhoneInput;
  countryObserver: MutationObserver;
  phoneObserver: MutationObserver;

  constructor() {
    super();

    this.countryObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'country-code') {
          this.onCountryChange(mutation.target as CountrySelector);
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
        pattern="${phoneMask || ''}"
      ></phone-input>
    `;
  }

  connectedCallback() {
    this.render();

    this.countryObserver.observe(this.getElementsByTagName('countries-select')[0], {
      attributes: true
    });

    this.phoneInput = this.getElementsByTagName('phone-input')[0] as PhoneInput;
  }

  onCountryChange(elem: CountrySelector) {
    const { phoneMask, phoneCode, ISO2 } = countryInfoByISO(elem.countryCode);

    this.countryCode = ISO2;
    this.countryPhoneCode = phoneCode.toString();

    this.phoneInput.pattern = phoneMask;
  }

});
