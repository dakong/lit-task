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

class MainPanel extends connect(store)(LitElement) {
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

    todo-list.completed {
      margin-top: 1.0rem;
    }

    h1 {
      padding-left: 1.2rem;
      font-size: 1.0rem;
      font-family: 'system-ui';
      font-weight: 400;
    }
  `

  @property({ type: String }) listID = '';
  @property({ type: Array }) todoList = [];

  firstUpdated() {
    store.dispatch(initializeItems());
  }

  render() {
    console.log(this.todoList);
    const completedTodos = this.todoList.filter(item => item.done);
    const todos = this.todoList.filter(item => !item.done);

    const completedList = completedTodos.map((item) => {
      console.log(item.done);
      return html`
        <todo-item
          slot="item"
          ?checked="${item.done}"
          .id="${item.uuid}"
          .value="${item.value}"
          .comment="${item.comment}"
        >
        </todo-item>
      `;
    });

    const todoList = todos.map((item) => (
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
      <div>
        <todo-list class="todos">
          <div slot="header">
            <todo-add></todo-add>
            <icon-component name="elipsis-vertical"></icon-component>
          </div>
          ${todoList}
        </todo-list>

        <todo-list class="completed">
          <div slot="header">
            <h1>Completed (${completedList.length})</h1>
          </div>
          ${completedList}
        </todo-list>
      </div>
    `;
  }

  stateChanged(state) {
    this.todoList = state.todos;
  }
}

customElements.define('main-panel', MainPanel);
