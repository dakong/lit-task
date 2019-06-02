import { html, css, LitElement, property } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../store';
import { blueGray50 } from '../styles/colors';

import mainPanel from '../_components/main-panel';
import editPanel from '../_components/edit-panel';

mainPanel.componentLoader.mainPanel();
editPanel.componentLoader.editPanel();

class MainApp extends connect(store)(LitElement) {
  static styles = css`
  :host {
      width: 375px;
      height: auto;
      display: block;
      margin: 32px auto;
      overflow: hidden;
      border: solid 1px ${blueGray50};
      border-radius: 3px;
    }

    div {
      position: relative;
    }
  `;

  @property({ type: String }) _panel = 'main_panel';

  render() {
    return html`
      <div>
        <main-panel class="panel"></main-panel>
        <edit-panel class="panel" ?active="${this._panel === 'edit_panel'}"></edit-panel>
      </div>
    `;
  }

  stateChanged(state) {
    this._panel = state.app.panel;
  }
}

customElements.define('main-app', MainApp);
