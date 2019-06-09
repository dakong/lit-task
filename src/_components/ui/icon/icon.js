import { html, LitElement, property, css } from 'lit-element';
import { gray200 } from '../../../styles/colors';

import editIcon from './svg/edit';
import circleIcon from './svg/circle';
import doneIcon from './svg/done';
import addIcon from './svg/add';
import trashIcon from './svg/trash';
import leftArrowIcon from './svg/left-arrow';
import elipsisVertical from './svg/ellipsis-v';
import chevronUp from './svg/chevron-up';
import chevronDown from './svg/chevron-down';

class Icon extends LitElement {
  static styles = css`
    #icon {
      height: 2.4rem;
      width: 2.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1000;
      border-radius: 50%;
      background-color: transparent;
      transition: background-color 0.15s;
    }

    #icon:hover {
      background-color: ${gray200};
    }

    #icon:focus {
      outline: 0;
      background-color: ${gray200};
    }
`;

  @property({ type: String }) id = '';
  @property({ type: String, reflect: true }) value = '';
  @property({ type: Boolean, reflect: true }) checked;
  @property({ type: Boolean }) hover = false;
  @property({ type: String }) name = '';
  @property({ type: Number, attribute: 'tab-index' }) tabIndex = 0;

  onIconHover(e) {
    this.hover = true;
  }

  renderIcon() {
    switch (this.name) {
      case 'circle':
        return html`${circleIcon}`;
      case 'edit':
        return html`${editIcon}`;
      case 'done':
        return html`${doneIcon}`;
      case 'add':
        return html`${addIcon}`;
      case 'trash':
        return html`${trashIcon}`;
      case 'left-arrow':
        return html`${leftArrowIcon}`;
      case 'elipsis-vertical':
        return html`${elipsisVertical}`;
      case 'chevron-up':
        return html`${chevronUp}`;
      case 'chevron-down':
        return html`${chevronDown}`;
    }
  }

  render() {
    return html`
      <div id="icon" @onhover="${this.onIconHover}" tabindex="${this.tabIndex}">
        ${this.renderIcon()}
      </div>
    `;
  }
}

customElements.define('icon-component', Icon);
