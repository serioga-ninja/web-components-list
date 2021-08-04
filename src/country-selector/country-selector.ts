import {
  countriesInfo,
  countryInfoByAreaCode,
  countryInfoByISO, countryInfoByMask,
  countryInfoByPhoneCode, generateMaskedNumber, maskedInputValid,
} from '../countries-info';
import './country-selector.less';
import { HtmlElementBase } from '../html-element-base';

type TAttributes = 'country-code' | 'country-phone-code' | 'phone-number';

export enum ECountrySelectorEvents {
  ValueChanged = 'valuechanged'
}

const isVisible = (elem: HTMLElement) => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

const htmlRows = countriesInfo
  .sort((a, b) => {
    const aSortOrder = a.sortOrder || 1000;
    const bSortOrder = b.sortOrder || 1000;

    if (aSortOrder < bSortOrder) return -1;
    else if (aSortOrder > bSortOrder) return 1;
    else return 1;
  })
  .map(row => {
    return `<li class="list-row" data-code="${row.phoneCode}" data-name="${row.countryName}" data-iso2="${row.ISO2}"">
                <i class="flag flag-${row.ISO2.toLowerCase()}"></i>
                ${row.countryName} (+${row.phoneCode})
            </li>`
  })

export class CountrySelector extends HtmlElementBase {
  static get observedAttributes() {
    return ['country-code', 'country-phone-code', 'phone-number'];
  }

  get countryCode() {
    return this.getAttribute('country-code');
  }

  set countryCode(value: string) {
    if (value !== this.countryCode) {
      this.setAttribute('country-code', value);


      this.dispatchEvent(
        new CustomEvent(ECountrySelectorEvents.ValueChanged, {
          detail: {
            newValue: value
          }
        })
      );
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

    this.innerHTML = String.raw`
      <div class="select country-result"></div>
      <div class="dropdown">
        <ul class="countries-list">${htmlRows.join('')}</ul>
      </div>
    `;

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
      if (this.disabled) return;

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
      case 'phone-number':
        this.updateByPhoneNumber(newVal);
        break;
    }
  }

  override connectedCallback() {
    super.connectedCallback();

    if (this.hasAttribute('country-code')) {
      this.selectByCountryCode(this.getAttribute('country-code'));
    } else if (this.hasAttribute('country-phone-code')) {
      this.selectByCountryPhoneCode(this.getAttribute('country-phone-code'));
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

  selectByCountryPhoneCode(countryPhoneCode: string) {
    const { phoneCode, ISO2 } = countryInfoByPhoneCode(countryPhoneCode);

    this.select(phoneCode, ISO2);
  }

  selectByCountryCode(countryCode: string) {
    const { phoneCode, ISO2 } = countryInfoByISO(countryCode);

    this.select(phoneCode, ISO2);
  }

  selectByElement(element: HTMLElement) {
    const { code, iso2 } = element.dataset;

    this.select(code, iso2);
  }

  updateByPhoneNumber(phoneNumber: string) {
    const phone = countryInfoByAreaCode(phoneNumber);

    if (phone) {
      this.select(phone.phoneCode, phone.ISO2);
    }
  }
}


if (!customElements.get('countries-select')) {
  customElements.define('countries-select', CountrySelector);
}
