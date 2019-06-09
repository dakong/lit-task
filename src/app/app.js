import { LitElement, html } from 'lit-element';
import '../_components/main-panel';
import '../_components/sidebar-panel';
import '../_components/app-layout';

class MainApp extends LitElement {
  render() {
    return html`
      <app-layout>
        <!-- <sidebar-panel slot="sidebar"></sidebar-panel> -->
        <main-panel slot="content"></main-panel>
      </app-layout>
    `;
  }
}

customElements.define('main-app', MainApp);
