import { html, LitElement, property, css } from 'lit-element';

import '../../icon';

class TodoAdd extends LitElement {
  static styles = css`
    :host {
      display: block;
      cursor: pointer;
    }

    .add-button {
      display: flex;
      flex-direction: row;
    }

    icon-component {
      padding-left: 0.8rem;
    }

    p {
      color: #273444;
      font-family: 'system-ui';
      margin: 0;
      padding: 0.8rem 0.2rem 0.8rem 1.8rem;
    }
  `;

  render() {
    return html`
      <div class="add-button">
        <icon-component name="add"></icon-component>
        <p>Add a task</p>
      </div>
    `
  }
}

customElements.define('todo-add', TodoAdd);