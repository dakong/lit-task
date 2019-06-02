import { LitElement, html, property, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../../store';
import todos from '../todos';

import { initializeItems } from './action-creators';
import '../ui/loader';
import '../ui/loader/bar-loader';

import '../ui/icon';

todos.componentLoader.addButton();
todos.componentLoader.list();
todos.componentLoader.item();

class TodoPanel extends connect(store)(LitElement) {
  static styles = css`
    :host {
      display: block;
      position: relative;
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
      width: 100%;
      user-select: none;
    }

    todo-list.completed div[slot=header] {
      cursor: pointer;
    }
  `

  @property({ type: String }) listID = '';
  @property({ type: Array }) todoList = [];
  @property({ type: Boolean }) isLoading = false;
  @property({ type: Boolean }) showCompleted = true;

  firstUpdated() {
    store.dispatch(initializeItems());
  }

  toggleCompletedList(e) {
    this.showCompleted = !this.showCompleted;
  }

  renderLoadingState() {
    return html`<lit-bar-loader title="Loading your todos"></lit-bar-loader>`;
  }

  renderTodoList(todoList) {
    const completedTodos = todoList.filter(item => item.done);
    const todos = todoList.filter(item => !item.done);

    const completedList = completedTodos.map((item) => {
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

    const inProgressList = todos.map((item) => (
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
      <todo-list class="todos">
        <div slot="header">
          <todo-add></todo-add>
          <icon-component name="elipsis-vertical"></icon-component>
        </div>
        ${inProgressList}
      </todo-list>

      <todo-list class="completed">
        <div slot="header" @click=${this.toggleCompletedList}>
          <h1>Completed (${completedList.length})</h1>
          <icon-component name="${this.showCompleted ? 'chevron-up' : 'chevron-down'}"></icon-component>
        </div>
        ${this.showCompleted ? completedList : null}
      </todo-list>`;
  }

  renderTodoPanel(todoList, isLoading) {
    return !isLoading ? this.renderTodoList(todoList) : this.renderLoadingState();
  }

  render() {
    return html`
      <div>
        ${this.renderTodoPanel(this.todoList, this.isLoading)}
      </div>
    `;
  }

  stateChanged(state) {
    this.todoList = state.todos;
    this.isLoading = state.todoPanel.isLoadingTodos;
  }
}

customElements.define('todo-panel', TodoPanel);
