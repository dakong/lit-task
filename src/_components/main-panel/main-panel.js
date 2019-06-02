import { html, css, LitElement, property } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../../store';

import todoPanel from '../todo-panel';
import editPanel from '../edit-panel';

todoPanel.componentLoader.todoPanel();
editPanel.componentLoader.editPanel();

class MainPanel extends connect(store)(LitElement) {
  static styles = css`
  :host {
      width: 375px;
      height: auto;
      display: block;
      margin: 32px auto;
      overflow: hidden;
    }

    div {
      position: relative;
    }
  `;

  @property({ type: String }) _panel = 'todo_panel';

  render() {
    return html`
      <div>
        <todo-panel class="panel"></todo-panel>
        <edit-panel class="panel" ?active="${this._panel === 'edit_panel'}"></edit-panel>
      </div>
    `;
  }

  stateChanged(state) {
    this._panel = state.app.panel;
  }
}

customElements.define('main-panel', MainPanel);
