import { html, css, LitElement, property } from "lit-element";
import { connect } from "pwa-helpers/connect-mixin.js";

import { store } from "../stores";

import "./ui/loader";
import "./todo-panel";
import "./edit-panel";

class MainPanel extends connect(store)(LitElement) {
  static styles = css`
    :host {
      width: 100%;
      height: auto;
      display: block;
      margin: auto;
      overflow: hidden;
    }

    div {
      position: relative;
    }
  `;

  @property({ type: String }) _panel = "todo_panel";

  render() {
    return html`
      <div>
        <todo-panel
          class="panel"
          ?active="${this.panel === "todo_panel"}"
        ></todo-panel>
        <edit-panel
          class="panel"
          ?active="${this._panel === "edit_panel"}"
        ></edit-panel>
      </div>
    `;
  }

  stateChanged(state) {
    this._panel = state.navigation.panel;
  }
}

customElements.define("main-panel", MainPanel);
