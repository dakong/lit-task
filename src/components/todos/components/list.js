import { html, LitElement, css } from 'lit-element';

class TodoList extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`
      <div>
        <div class="header">
          <slot name="header"></slot>
        </div>
        <slot name="item"></slot>
      </div>
    `;
  }
}

customElements.define('todo-list', TodoList);
