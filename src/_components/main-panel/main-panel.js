import { html, property, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../../store';

import { PanelViewElement } from '../panel-view-element';

import '../todos/components/add-button';
import '../todos/components/list';
import '../todos/components/item';

import { initializeItems } from './action-creators';

class MainPanel extends connect(store)(PanelViewElement) {
  static styles = css`
    :host {
      width: 375px;
      height: auto;
      display: block;
      margin: 32px auto;
    }
  `;

  @property({ type: String }) listID = '';
  @property({ type: Array }) todoList = [];

  firstUpdated(changedProperties) {
    store.dispatch(initializeItems());
  }

  render() {
    const todoList = this.todoList.map(item => (
      html`
        <todo-item slot="item" .id="${item.uuid}" ?checked="${item.done}" .value="${item.value}">
        </todo-item>
      `
    ));

    return html`
      <todo-list>
        <todo-add slot="header"></todo-add>
        ${todoList}
      </todo-list>
    `;
  }

  stateChanged(state) {
    this.todoList = state.todos;
  }
}

customElements.define('main-panel', MainPanel);
