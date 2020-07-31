import { html, css, LitElement, property } from "lit-element";

import { ENTER_KEY_CODE } from "../../../constants/key-codes";
import "../../ui/icon";

import { openEditPanel } from "../../../stores/navigation/navigation.action-creators";
import {
  addTodo,
  deleteTodoEffect,
  updateTodoEffect,
} from "../../../stores/todos/todos.action-creators";

import "../../ui/underline";

import {
  gray50,
  gray300,
  secondaryText,
  primaryText,
} from "../../../styles/colors";

import { store } from "../../../stores";

class TodoItem extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
        line-height: 0;
        color: #273444;
        width: 100%;
        position: relative;
        font-family: "system-ui";
        color: ${primaryText};
      }

      :host([hidden]) {
        display: none;
      }

      .todo-item {
        border-width: 0 0 1px;
        border-style: solid;
        border-color: ${gray300};
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
      }

      .todo-item:focus {
        outline: none;
      }

      .todo-item:focus-within {
        background-color: ${gray50};
      }

      .todo-input {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
        width: 100%;
        box-sizing: border-box;
        padding: 1rem 0.4rem 1rem 1.8rem;
      }

      :host([checked]) input {
        text-decoration: line-through;
      }

      input {
        font-size: 0.8rem;
        width: 100%;
        background-color: inherit;
        box-sizing: border-box;
        border-style: solid;
        border-color: #273444;
        border-width: 0;
        cursor: default;
      }

      input:focus {
        outline: 0;
        cursor: text;
      }

      .comment {
        font-size: 0.8rem;
        line-height: 1rem;
        letter-spacing: 0.26px;
        max-height: 32px;
        overflow: hidden;
        overflow-wrap: break-word;
        word-wrap: break-word;
        color: ${secondaryText};
        margin: 0.2rem 0;
        cursor: default;updateTodoEffect({
          uuid: this.id,
          value: this.value,
          column: "value",
        })
        user-select: none;
      }

      .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .todo-checkbox-icon {
        padding-left: 0.8rem;
      }

      .todo-edit-icon {
        padding-right: 0.8rem;
      }

      .todo-edit-icon icon-component {
        visibility: hidden;
      }

      .todo-item:hover .todo-edit-icon > icon-component,
      .todo-item:focus-within .todo-edit-icon > icon-component,
      :host([focused]) .todo-edit-icon > icon-component {
        visibility: visible;
      }

      todo-underline {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: none;
      }

      :host([focused]) todo-underline {
        display: block;
      }
    `;
  }

  @property({ type: String }) id = "";
  @property({ type: String, reflect: true }) value = "";
  @property({ type: String, reflect: false }) comment = "";
  @property({ type: Boolean, reflect: true }) checked;
  @property({ type: Boolean, reflect: true }) focused = false;

  // Handle when todo item is checked.
  onChecked(e) {
    this.checked = !this.checked;
    store.dispatch(
      updateTodoEffect({
        uuid: this.id,
        value: this.value,
        column: "done",
      })
    );
    e.stopPropagation();
  }

  // Handle when a todo item text is updated.
  onInputChange(e) {
    const { value } = e.target;
    this.value = value;
    if (e.code === ENTER_KEY_CODE) {
      store.dispatch(addTodo());
    } else {
      // updateTodoItemValue(this.id, this.value);
      store.dispatch(
        updateTodoEffect({
          uuid: this.id,
          value: this.value,
          column: "value",
        })
      );
    }
  }

  // Handle when a todo item is deleted.
  onDelete(e) {
    store.dispatch(deleteTodoEffect(this.id));
    e.stopPropagation();
  }

  onFullEdit(e) {
    store.dispatch(
      openEditPanel({
        uuid: this.id,
        value: this.value,
        comment: this.comment,
      })
    );
    e.stopPropagation();
  }

  // Add ability to check a todo item using the enter key.
  onCheckedKeydown(e) {
    if (e.code === ENTER_KEY_CODE) {
      this.onChecked(e);
    }
  }

  onDeleteKeyDown(e) {
    if (e.code === ENTER_KEY_CODE) {
      this.onDelete(e);
    }
  }

  onEditKeydown(e) {
    if (e.code === ENTER_KEY_CODE) {
      this.onFullEdit(e);
    }
  }

  onTodoItemClick(e) {
    if (!this.checked) {
      const inputEl = this.shadowRoot.querySelector("input");
      inputEl.focus();
      this.focused = true;
    }
  }

  firstUpdated(changedProperties) {
    const inputEl = this.shadowRoot.querySelector("input");
    this.addEventListener("blur", (e) => {
      this.focused = false;
      inputEl.blur();
    });
  }

  render() {
    const iconName = this.checked ? "done" : "circle";
    const isDisabled = !!this.checked;

    const editIcon = html`
      <div aria-label="edit todo item" class="todo-edit-icon icon-wrapper">
        <icon-component
          @click="${this.onFullEdit}"
          @keydown="${this.onEditKeydown}"
          name="edit"
        >
        </icon-component>
      </div>
    `;

    const deleteIcon = html`
      <div aria-label="delete todo item" class="todo-edit-icon icon-wrapper">
        <icon-component
          @click="${this.onDelete}"
          @keydown="${this.onEditKeydown}"
          name="trash"
        >
        </icon-component>
      </div>
    `;

    const actionIcon = this.checked ? deleteIcon : editIcon;

    return html`
      <div @click="${this.onTodoItemClick}" class="todo-item" tabindex="0">
        <div
          aria-label="todo item checkbox"
          class="todo-checkbox-icon icon-wrapper"
        >
          <icon-component
            @click="${this.onChecked}"
            @keydown="${this.onCheckedKeydown}"
            name="${iconName}"
          >
          </icon-component>
        </div>
        <div class="todo-input">
          <input
            @keyup="${this.onInputChange}"
            value="${this.value}"
            ?disabled="${isDisabled}"
          />
          ${this.comment
            ? html`<div class="comment">${this.comment}</div>`
            : ""}
        </div>
        ${actionIcon}
        <todo-underline></todo-underline>
      </div>
    `;
  }
}

customElements.define("todo-item", TodoItem);
