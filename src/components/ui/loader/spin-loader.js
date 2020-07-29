import { LitElement, html, css, property } from "lit-element";

import { gray50, blueA200 } from "../../../styles/colors";
class Loader extends LitElement {
  static styles = css`
    :host {
      font-family: "system-ui";
      display: flex;
      flex-direction: column;
      padding: 0.5rem;
    }

    .spinner {
      border: 4px solid ${gray50};
      border-radius: 50%;
      border-top: 4px solid ${blueA200};
      width: 16px;
      height: 16px;
      animation: spin 1s linear infinite;
      margin: 0;
      align-self: center;
    }

    span {
      text-align: center;
      margin-top: 0.5rem;
      margin-right: auto;
      margin-left: auto;
      margin-bottom: 0.5rem;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;

  @property({ type: String }) title = "";

  render() {
    return html`
      <div class="spinner"></div>
      ${this.title && html`<span>${this.title}</span>`}
    `;
  }
}

customElements.define("lit-loader", Loader);
