import { LitElement, html, property, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../../store';

class SidebarPanel extends connect(store)(LitElement) {
  render() {
    return html`
      <div>

      </div>
    `;
  }
}

customElements.define('sidebar-panel', SidebarPanel);
