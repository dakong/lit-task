import { html, LitElement, css } from 'lit-element';

class TodoList extends LitElement {
  static styles = css`
    .header {
    }
  `;

  render() {
    return html`
      <div class="header">
        <slot name="header"></slot>
      </div>
      <slot name="item"></slot>
    `;
  }
}

customElements.define('todo-list', TodoList);
