import {html, LitElement} from 'lit-element';
import style from './style';

class TodoUnderline extends LitElement {
  static styles = style;

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
