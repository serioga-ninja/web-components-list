import { countriesInfo } from './countries-info';
import './country-selector.less';

type TAttributes = 'country-code' | 'country-phone-code';

const isVisible = (elem: HTMLElement) => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

const htmlRows = countriesInfo
  .map(row => {
    return `<li class="list-row" data-code="${row.phoneCode}" data-name="${row.countryName}" data-iso2="${row.ISO2}"">
                <i class="flag flag-${row.ISO2.toLowerCase()}"></i>
                ${row.countryName} (+${row.phoneCode})
            </li>`
  })

const tmpl = document.createElement('template');
tmpl.innerHTML = `
  <div class="select country-result"></div>
  <div class="dropdown">
    <ul class="countries-list">${htmlRows.join('')}</ul>
  </div>
`;

customElements.define('countries-select', class extends HTMLElement {
  static get observedAttributes() {
    return ['country-code', 'country-phone-code'];
  }

  get countryCode() {
    return this.getAttribute('country-code');
  }

  set countryCode(value: string) {
    if (value !== this.countryCode) {
      this.setAttribute('country-code', value);
    }
  }

  get phoneCode() {
    return this.getAttribute('country-phone-code');
  }

  set phoneCode(value: string) {
    if (this.phoneCode !== value) {
      this.setAttribute('country-phone-code', value);
    }
  }

  result: Element;
  dropdown: Element;

  private dropDownVisible: boolean;

  constructor() {
    super();

    this.innerHTML = tmpl.innerHTML;

    this.result = this.getElementsByClassName('country-result')[0];
    this.dropdown = this.getElementsByClassName('dropdown')[0];

    Array
      .from(this.getElementsByClassName('list-row'))
      .forEach((elem: HTMLElement) => {
        elem.addEventListener('click', (ev) => {
          ev.stopPropagation();

          this.selectByElement(elem);
          this.dropDownVisible = false;
          this.hideDropDown();
        });
      });

    this.result.addEventListener('click', (ev) => {
      ev.stopPropagation();

      this.dropDownVisible = !this.dropDownVisible;

      if (this.dropDownVisible) this.showDropDown();
      else this.hideDropDown();
    });

    document.addEventListener('click', (event) => {
      if (!this.dropdown.contains(event.target as HTMLElement) && isVisible(this.dropdown as HTMLElement)) {
        this.dropDownVisible = false;
        this.hideDropDown();
      }
    });
  }

  attributeChangedCallback(attrName: TAttributes, _oldVal, newVal: string) {
    switch (attrName) {
      case 'country-code':
        this.selectByCountryCode(newVal);
        break;
      case 'country-phone-code':
        this.selectByPhoneCode(newVal);
        break;
    }
  }

  hideDropDown() {
    this.dropdown.className = 'dropdown';
  }

  showDropDown() {
    this.dropdown.className = 'dropdown visible';
  }

  select(code: string | number, iso2: string) {
    this.countryCode = iso2;
    this.phoneCode = code.toString();

    this.result.innerHTML = `<i class="flag flag-${iso2.toLowerCase()}"></i>`;
  }

  selectByCountryCode(countryCode: string) {
    const { phoneCode, ISO2 } = countriesInfo
      .find(info => info.ISO2.toLowerCase() === countryCode.toLowerCase());

    this.select(phoneCode, ISO2);
  }

  selectByPhoneCode(code: string) {
    const { phoneCode, ISO2 } = countriesInfo
      .find(info => info.phoneCode.toString().toLowerCase() === code.toLowerCase());

    this.select(phoneCode, ISO2);
  }

  selectByElement(element: HTMLElement) {
    const { code, iso2 } = element.dataset;

    this.select(code, iso2);
  }
});
