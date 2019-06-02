import { LitElement, html, css } from 'lit-element';
import '../_components/main-panel';

class MainApp extends LitElement {
  static styles = css``;

  render() {
    console.log('render');
    return html`
      <main-panel></main-panel>
    `;
  }
}

customElements.define('main-app', MainApp);
