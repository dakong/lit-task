import { LitElement, property } from 'lit-element';

export class PanelViewElement extends LitElement {
  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) mounted = false;

  // Only render this page if it's actually visible.
  shouldUpdate() {
    return this.active || !this.mounted;
  }

  firstUpdated() {
    this.mounted = true;
  }
}
