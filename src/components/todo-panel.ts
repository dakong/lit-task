import { LitElement, html, property, css, customElement } from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import { connect } from "pwa-helpers/connect-mixin.js";

import { store } from "../stores";
import todos from "./todos";
import { insertTodoEffect } from "../stores/todos/todos.action-creators";

import "./ui/loader";
import "./ui/loader/bar-loader";

import "./ui/icon";
import logger from "../utils/logger";
import { GoogleTask } from "../interfaces/google-task";

todos.componentLoader.addButton();
todos.componentLoader.list();
todos.componentLoader.item();

@customElement("todo-panel")
class TodoPanel extends connect(store)(LitElement) {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    div[slot="header"] {
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
      margin-top: 1rem;
    }

    h1 {
      padding-left: 1.2rem;
      font-size: 1rem;
      font-family: "system-ui";
      font-weight: 400;
      width: 100%;
      user-select: none;
    }

    todo-list.completed div[slot="header"] {
      cursor: pointer;
    }
  `;
  @property({ type: Boolean }) active = false;

  @property({ type: String }) listID = "";

  @property({ type: Array }) todoList = [];

  @property({ type: Boolean }) isLoading = false;

  @property({ type: Boolean }) showCompleted = true;

  @property({ type: String }) tasklistID = "";

  stateChanged(state) {
    const { tasks, selectedTasklist } = state.todos;

    this.todoList = tasks.hasOwnProperty(selectedTasklist)
      ? tasks[selectedTasklist]
      : [];
    this.tasklistID = selectedTasklist;
    logger.Info(tasks, selectedTasklist);
    this.isLoading = state.requesting.isLoadingTodos;
  }

  toggleCompletedList() {
    this.showCompleted = !this.showCompleted;
  }

  renderLoadingState() {
    return html`<lit-bar-loader title="Loading your todos"></lit-bar-loader>`;
  }

  addNewTodo() {
    store.dispatch(insertTodoEffect(this.tasklistID));
  }

  renderTodoItem(todo) {
    console.log("render todo item");
    console.log(this.tasklistID);
    return html`
      <todo-item
        slot="item"
        ?checked="${todo.status === "completed"}"
        .id="${todo.id}"
        .value="${todo.title}"
        .comment="${todo.notes}"
        tasklistID="${this.tasklistID}"
      >
      </todo-item>
    `;
  }

  renderTodoList(todos) {
    return html`
      <todo-list class="todos">
        <div slot="header">
          <todo-add @click="${this.addNewTodo}></todo-add>
          <icon-component name="elipsis-vertical"></icon-component>
        </div>
        ${repeat(
          todos,
          (todos: GoogleTask) => todos.id,
          this.renderTodoItem.bind(this)
        )}
      </todo-list>
    `;
  }

  renderCompletedList(completed) {
    const completedTodosToDisplay = this.showCompleted ? completed : [];
    return html`
      <todo-list class="completed">
        <div slot="header" @click=${this.toggleCompletedList}>
          <h1>Completed (${completed.length})</h1>
          <icon-component
            name="${this.showCompleted ? "chevron-up" : "chevron-down"}"
          ></icon-component>
        </div>
        ${repeat(
          completedTodosToDisplay,
          (todos) => todos.uuid,
          this.renderTodoItem
        )}
      </todo-list>
    `;
  }

  renderList(todoList) {
    const completedTodos = todoList.filter((item) => item.done);
    const todos = todoList.filter((item) => !item.done);

    return html`
      ${this.renderTodoList(todos)} ${this.renderCompletedList(completedTodos)}
    `;
  }

  renderTodoPanel(todoList, isLoading) {
    return !isLoading ? this.renderList(todoList) : "";
  }

  render() {
    return !this.isLoading
      ? this.renderList(this.todoList)
      : this.renderLoadingState();
  }
}

// customElements.define("todo-panel", TodoPanel);
declare global {
  interface HTMLElementTagNameMap {
    "todo-panel": TodoPanel;
  }
}
