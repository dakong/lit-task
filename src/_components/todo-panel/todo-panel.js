import { LitElement, html, property, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../../store';
import { PanelViewElement } from '../panel-view-element';
import todos from '../todos';

import { initializeItems } from './action-creators';
import '../ui/icon';

todos.componentLoader.addButton();
todos.componentLoader.list();
todos.componentLoader.item();

class TodoPanel extends connect(store)(PanelViewElement) {
  static styles = css`
    :host {
      display: block;
    }

    div[slot=header] {
      display: flex;
      align-items: center;
    }

    todo-add {
      flex-basis: 100%;
    }

    icon-component {
      align-self: flex-end;
      padding-right: 0.8rem;
    }
  `

  @property({ type: String }) listID = '';
  @property({ type: Array }) todoList = [];

  firstUpdated() {
    store.dispatch(initializeItems());
  }

  render() {
    console.log('rendering');
    const todoList = this.todoList.map(item => (
      html`
        <todo-item
          slot="item"
          ?checked="${item.done}"
          .id="${item.uuid}"
          .value="${item.value}"
          .comment="${item.comment}"
        >
        </todo-item>
      `
    ));

    return html`
      <todo-list>
        <div slot="header">
          <todo-add></todo-add>
          <icon-component name="edit"></icon-component>
        </div>
        ${todoList}
      </todo-list>
    `;
  }

  stateChanged(state) {
    console.log('state changed');
    console.log(state.todos);
    this.todoList = state.todos;
  }
}

customElements.define('todo-panel', TodoPanel);
