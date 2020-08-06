import { LitElement, html, css } from "lit-element";
import { gray300 } from "../styles/colors";
import { store } from "../stores";
import { gapiInitialize } from "../stores/requesting/requesting.action-creators";

/**
 * Outer shell for the app. It determines the main layout of the application
 */
class AppLayout extends LitElement {
  static styles = css`
    :host {
      /* --app-sidebar-width: 280px;
      --app-navbar-height: 64px; */
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

  connectedCallback() {
    super.connectedCallback();
    console.log("i am connected");
    store.dispatch(gapiInitialize());
  }

  firstUpdated() {
    console.log("i am first updated");
  }

  render() {
    return html`
      <div class="navbar">
        <slot name="header"></slot>
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
