import { LitElement, html, css } from "lit-element";
import { gray300 } from "../styles/colors";

/**
 * Outer shell for the app. It determines the main layout of the application
 */
class AppLayout extends LitElement {
  static styles = css`
    :host {
      /* --app-sidebar-width: 280px;
      --app-navbar-height: 64px; */
    }

    .navbar {
      background-color: white;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: var(--app-navbar-height, 64px);
      border-bottom: solid 1px ${gray300};
      z-index: 99999;
    }

    main {
      position: relative;
      padding-top: 1rem;
      margin-top: var(--app-navbar-height, 64px);
    }

    .sidebar {
      position: fixed;
      top: var(--app-navbar-height, 64px);
      left: 0;
      height: calc(100vh - var(--app-navbar-height, 64px));
      width: var(--app-sidebar-width, 280px);
      padding-top: 1rem;
    }

    .content {
      box-sizing: border-box;
      margin-left: var(--app-sidebar-width, 280px);
    }

    .content-container {
      margin-top: 0;
      margin-right: 1.5rem;
      margin-bottom: 1.5rem;
      margin-left: 4.5rem;
      max-width: 668px;
      min-width: 375px;
    }
  `;

  render() {
    return html`
      <div class="navbar">
        <slot name="navbar"></slot>
      </div>
      <main>
        <div class="sidebar">
          <slot name="sidebar"></slot>
        </div>
        <div class="content">
          <div class="content-container">
            <slot name="content"></slot>
          </div>
        </div>
      </main>
    `;
  }
}

customElements.define("app-layout", AppLayout);
