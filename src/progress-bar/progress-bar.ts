import { HtmlElementBase } from '../html-element-base';
import './progress-bar.less';

export class ProgressBar extends HtmlElementBase {
  static get observedAttributes() {
    return ['current-value', 'max-value'];
  }

  barElement: HTMLDivElement;

  get currentValue() {
    return parseFloat(this.getAttribute('current-value'));
  }

  set currentValue(value: number) {
    if (this.currentValue !== value) {
      this.setAttribute('current-value', value.toString());
    }
  }

  get maxValue() {
    return parseInt(this.getAttribute('max-value'));
  }

  set maxValue(value: number) {
    if (this.currentValue !== value) {
      this.setAttribute('max-value', value.toString());
    }
  }

  get percentValue(): number {
    if (isNaN(this.maxValue) || isNaN(this.currentValue)) return 0;
    const one = this.maxValue / 100;
    const percent = Math.ceil(this.currentValue * 100 / one) / 100;

    return Math.min(percent, 100);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
     <div class="pb-border">
      <div class="pb-bar" style="height:24px; width:${this.percentValue}%"></div>
    </div> 
    `;

    this.barElement = this.querySelector('.pb-bar');
  }

  updateBarWidth() {
    if (this.barElement) {
      this.barElement.style.width = `${this.percentValue}%`;
    }
  }


  attributeChangedCallback(attrName: string, _oldVal, newVal) {
    switch (attrName) {
      case 'current-value':
        this.updateBarWidth();
        break;
    }
  }
}

if (!customElements.get('progress-bar')) {
  customElements.define('progress-bar', ProgressBar);
}
