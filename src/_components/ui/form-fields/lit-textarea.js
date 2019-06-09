import { LitElement, html, css, property } from 'lit-element';

import { blueA200, gray50 } from '../../../styles/colors';

class LitTextArea extends LitElement {
  @property({ type: String }) name = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) value = '';
  @property({ type: Boolean }) focus = false;

  static get styles() {
    return css`
      textarea {
        display: block;
        width: 100%;
        box-sizing: border-box;
        border-radius: 3px;
        font-size: 0.8rem;
        padding: 0.8rem 0.8rem;
        text-decoration: none;
        border-width: 0;
        background-color: ${gray50};
        resize: none;
        outline: none;
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

      textarea:focus ~ .underline:before,
      textarea:focus ~ .underline:after {
        width: 50%;
        animation-name: expand-width;
        animation-duration: 0.25s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
      }

      @keyframes expand-width {
        from {width: 0px;}
        to {width: 50%; }
      }
    `;
  }

  onTextareaChange(e) {
    const { value } = e.target;

    let event = new CustomEvent('textarea-change', {
      detail: {
        value,
      },
    });

    this.dispatchEvent(event);
  }

  updated() {
    // const textArea = this.shadowRoot.querySelector('textarea');

    // if (this.focus) {
    //   textArea.focus();
    // } else if (!this.focus) {
    //   textArea.blur();
    // }
  }

  render() {
    return html`
      <div class="textarea">
        <textarea @keyup="${this.onTextareaChange}" name="${this.name}" placeholder="${this.placeholder}">${this.value}</textarea>
        <span class="underline"></span>
      </div>
    `;
  }
}

customElements.define('lit-textarea', LitTextArea);
