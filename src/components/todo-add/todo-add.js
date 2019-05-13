import { html, LitElement, property, css } from 'lit-element';

class TodoAdd extends LitElement {
  static styles = css`
    :host {
      cursor: pointer;
    }
  `;

  render() {
    return html`
      <div>
        <p>Add to do</p>
      </div>
    `
  }
}

customElements.define('todo-add', TodoAdd);