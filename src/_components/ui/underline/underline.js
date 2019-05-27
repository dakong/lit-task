import { html, LitElement, css } from 'lit-element';
import { blueA200 } from '../../../styles/colors';

class TodoUnderline extends LitElement {
  static get styles() {
    return css`
      .container {
        display: flex;
        flex-direction: row;
      }

      .flex-element {
        flex-grow: 1;
      }
      .rectangle {
        width: 0px;
        height: 2px;
        background-color: ${blueA200};
        display: block;
        flex-grow: 1;
        animation-name: example;
        animation-duration: 0.25s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
      }

      .left {
        float: right;
      }

      @keyframes example{
        from {width: 0px;}
        to {width: 100%;}
      }
    `;
  };

  render() {
    return html`
      <div class="container">
        <div class="flex-element">
          <div class="rectangle left">
          </div>
        </div>
        <div class="flex-element">
          <div class="rectangle">
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('todo-underline', TodoUnderline);
