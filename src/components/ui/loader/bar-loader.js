import { LitElement, html, css, property } from "lit-element";

import { blueA200 } from "../../../styles/colors";
class BarLoader extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .bar {
      background-color: ${blueA200};
      height: 3px;
      animation: expand 1.25s ease infinite;
    }

    span {
      text-align: center;
      margin-top: 0.5rem;
      margin-right: auto;
      margin-left: auto;
      margin-bottom: 0.5rem;
    }

    @keyframes expand {
      from {
        width: 0%;
      }
      to {
        width: 100%;
      }
    }
  `;

  @property({ type: String }) title = "";

  render() {
    return html` <div class="bar"></div> `;
  }
}

customElements.define("lit-bar-loader", BarLoader);
