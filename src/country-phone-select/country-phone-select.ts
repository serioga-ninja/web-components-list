import html from './country-phone-select.html';


customElements.define('country-phone-select', class extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'country-code', 'country-phone-code'];
  }

  constructor() {
    super();

    this.innerHTML = html;
  }

});
