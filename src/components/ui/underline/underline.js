import { html, LitElement, css } from "lit-element";
import { blueA200 } from "../../../styles/colors";

class TodoUnderline extends LitElement {
  static get styles() {
    return css`
      .underline {
        position: relative;
        display: block;
        width: 100%;
      }

      .underline:after,
      .underline:before {
        content: "";
        height: 2px;
        width: 0;
        bottom: 0;
        position: absolute;
        background: ${blueA200};
        transition: 0.25s ease all;
      }

      .underline:before {
        left: 50%;
        animation-name: expand-width;
        animation-duration: 0.25s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
      }

      .underline:after {
        right: 50%;
        animation-name: expand-width;
        animation-duration: 0.25s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
      }

      @keyframes expand-width {
        from {
          width: 0px;
        }
        to {
          width: 50%;
        }
      }
    `;
  }

  render() {
    return html` <span class="underline"></span> `;
  }
}

customElements.define("todo-underline", TodoUnderline);
