import { html, css, LitElement, property } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../store';

import '../_components/main-panel';
import '../_components/edit-panel';

class MainApp extends connect(store)(LitElement) {
  static styles = css`
    .panel {
      display: none;
    }

    .panel[active] {
      display: block;
    }
  `;

  @property({type: String}) _panel = 'main_panel';

  render() {
    return html`
      <div>
        <main-panel class="panel" ?active="${this._panel === 'main_panel'}"></main-panel>

        <edit-panel class="panel" ?active="${this._panel === 'edit_panel'}"></edit-panel>
      </div>
    `;
  }

  stateChanged(state) {
    console.log(state);
    this._panel = state.app.panel;
  }
}

customElements.define('main-app', MainApp);