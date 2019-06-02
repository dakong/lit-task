import { LitElement, html, css, property } from 'lit-element';

import { blueA200 } from '../../../styles/colors';

class LitInput extends LitElement {
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) name = '';
  @property({ type: String }) value = '';

  static get styles() {
    return css`
      :host([disabled]) input {
        text-decoration: line-through;
      }

      input {
        font-size: 0.8rem;
        padding: 0.8rem 0.2rem;
        width: 100%;
        background-color: inherit;
        box-sizing: border-box;
        border-style: solid;
        border-color: #273444;
        border-width: 0;
        cursor: default;
      }

      input:focus {
        outline: 0;
        cursor: text;
      }

      .underline {
        position: relative;
        display: block;
        width: 100%;
      }

      .underline:after, .underline:before {
        content:'';
        height: 2px;
        width: 0;
        bottom: 1px;
        position: absolute;
        background: ${blueA200};
        transition: 0.25s ease all;
      }

      .underline:before {
        left: 50%;
      }

      .underline:after {
        right: 50%;
      }

      input:focus-within ~ .underline:before,
      input:focus-within ~ .underline:after {
       width: 50%;
      }
    `;
  }

  onInputChange(e) {
    const { value } = e.target;

    let event = new CustomEvent('input-change', {
      detail: {
        value,
      },
    });

    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="input">
        <input @keyup="${this.onInputChange}" name="${this.name}" value="${this.value}"/>
        <span class="underline"></span>
      </div>
    `;
  }
}

customElements.define('lit-input', LitInput);
