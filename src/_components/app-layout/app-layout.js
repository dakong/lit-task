import { LitElement, html, css } from 'lit-element';
import { gray300 } from '../../styles/colors';

class AppLayout extends LitElement {
  static styles = css`
    :host {
      --app-sidebar-width: 280px;
      --app-navbar-height: 64px;
    }

    .navbar {
      background-color: white;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: var(--app-navbar-height);
      border-bottom: solid 1px ${gray300};
      z-index: 99999;
    }

    main {
      position: relative;
      padding-top: 1.0rem;
      margin-top: var(--app-navbar-height);
    }

    .sidebar {
      position: fixed;
      top: var(--app-navbar-height);
      left: 0;
      height: calc(100vh - var(--app-navbar-height));
      width: var(--app-sidebar-width);
      padding-top: 1.0rem;
    }

    .content {
      box-sizing: border-box;
      padding-top: 0;
      padding-right: 1.2rem;
      padding-bottom: 0;
      padding-left: 1.2rem;
      max-width: 668px;
      min-width: 375px;
      margin-left: var(--app-sidebar-width);
    }
  `;
  render() {
    return html`
      <div class="navbar">
        <slot name="logo"></slot>
        <slot name="searchbar"></slot>
      </div>
      <main>
        <div class="sidebar">
          <slot name="sidebar"></slot>
        </div>
        <div class="content">
          <slot name="content"></slot>
        </div>
      </main>
    `;
  }
}

customElements.define('app-layout', AppLayout);
