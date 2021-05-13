import { countriesInfo } from './countries-info';
import './country-selector.less';

const htmlRows = countriesInfo
  .map(row => {
    return `<li class="list-row" data-code="${row.phoneCode}" data-name="${row.countryName}" data-iso2="${row.ISO2}"">
                <i class="flag flag-${row.ISO2.toLowerCase()}"></i>
                ${row.countryName} (+${row.phoneCode})
            </li>`
  })

const tmpl = document.createElement('template');
tmpl.innerHTML = `
    <select id="thisss">
    <option value="qwert">qwesq</option>
</select>
  <div class="select country-result"></div>
  <div class="dropdown">
    <ul class="countries-list">${htmlRows.join('')}</ul>
  </div>
`;

customElements.define('countries-select', class extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'country-code', 'country-phone-code'];
  }

  result: Element;
  selectedValue: string;

  constructor() {
    super();

    this.innerHTML = tmpl.innerHTML;

    this.result = this.getElementsByClassName('country-result')[0];

    Array
      .from(this.getElementsByClassName('list-row'))
      .forEach((elem: HTMLElement) => {
        elem.addEventListener('click', () => this.select(elem));
      })
  }

  select(element: HTMLElement) {
    const { code, name, iso2 } = element.dataset;
    console.log(code, name, iso2);

    this.result.innerHTML = `<i class="flag flag-${iso2.toLowerCase()}"></i>`;

  }
});
