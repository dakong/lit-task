import { LitElement, html, css, property } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../../store';
import { gray200 } from '../../styles/colors';
class SidebarPanel extends connect(store)(LitElement) {
  static styles = css`
    :host {
      display: block;
      height: 100%;
      font-family: 'system-ui';
      font-size: 1.0rem;
      cursor: default;
    }

    ul {
      margin-top: 0.8rem;
      margin-bottom: 0.8rem;
      list-style: none;
      padding-left: 0;
    }

    li {
      padding-top: 0.8rem;
      padding-bottom: 0.8rem;
      padding-left: 4.0rem;
      border-top-right-radius: 1.5rem;
      border-bottom-right-radius: 1.5rem;
      cursor: pointer;
    }

    li:hover {
      background-color: ${gray200}
    }

    span.section-header {
      text-transform: uppercase;
      font-size: 0.8rem;
      padding-left: 1.5rem;
    }

    a:focus {
      outline: 0;
      padding-bottom: 1px;
      border-bottom: solid 1px black;
    }

  `;

  @property({ type: Array }) list = [
    'Desk setup',
    'Grocery list',
    'Work',
    'Personal',
    'Errands',
  ];

  renderSidebarItem(text) {
    return html`
      <li>
        <a tabindex="0">
          <span>${text}</span>
        </a>
      </li>
    `;
  }

  render() {
    return html`
      <aside>
        <span class="section-header">Labels</span>
        <ul>
          ${this.list.map((item) => this.renderSidebarItem(item))}
        </ul>
      </aside>
    `;
  }
}

customElements.define('sidebar-panel', SidebarPanel);
