import './country-phone-select.less';
import { countriesInfo } from '../countries-info';

customElements.define('country-phone-select', class extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'country-code', 'country-phone-code'];
  }

  get countryCode() {
    return this.getAttribute('country-code');
  }

  set countryCode(value: string) {
    this.setAttribute('country-code', value);
  }

  get countryPhoneCode() {
    return this.getAttribute('country-phone-code');
  }

  set countryPhoneCode(value: string) {
    this.setAttribute('country-phone-code', value);
  }

  get invalid() {
    return (this.getElementsByTagName('phone-number') as any).invalid;
  }

  countryObserver: MutationObserver;
  phoneObserver: MutationObserver;

  constructor() {
    super();

    this.countryObserver = new MutationObserver((mutation) => {

    });
  }

  render() {
    const { phoneMask } = countriesInfo
      .find(row => row.ISO2.toLowerCase() === this.countryCode.toLowerCase())

    this.innerHTML = `
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
  }

});
