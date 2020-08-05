import { LitElement, html, css } from "lit-element";
import "../components/main-panel";
import "../components/sidebar";
import "../components/app-layout";

class MainApp extends LitElement {
  static styles = css`
    :host {
      /* --app-sidebar-width: 280px; */
      --app-sidebar-width: 0;

      --app-navbar-height: 64px;
    }
  `;
  render() {
    return html`
      <app-layout>
        <!-- <sidebar-panel slot="sidebar"></sidebar-panel> -->
        <main-panel slot="content"></main-panel>
      </app-layout>
    `;
  }
}

customElements.define("main-app", MainApp);
