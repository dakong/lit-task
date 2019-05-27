import { LitElement, property } from 'lit-element';

export class PanelViewElement extends LitElement {
  // Only render this page if it's actually visible.
  shouldUpdate() {
    return this.active;
  }

  @property({type: Boolean}) active = false;
}
