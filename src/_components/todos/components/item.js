import { html, css, LitElement, property } from 'lit-element';
import uuidv4 from 'uuid/v4';

import { ENTER_KEY_CODE } from '../../../constants/key-codes';
import '../../ui/icon';

import { deleteTodo, updateTodo, addTodo } from '../action-creators';
import { openEditPanel } from '../../main-panel/action-creators';

import '../../ui/underline';

import {
  gray50,
  gray300,
  secondaryText,
  primaryText,
} from '../../../styles/colors';

import TodoDB from '../../../indexed-db/todo-db';
import { COLUMN_DONE, COLUMN_VALUE } from '../../../indexed-db/constants';

import { store } from '../../../store';

class TodoItem extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
        line-height: 0;
        color: #273444;
        width: 100%;
        position: relative;
        font-family: 'system-ui';
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
        padding: 1.0rem .4rem 1.0rem 1.8rem;
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
        line-height: 1.0rem;
        letter-spacing: .26px;
        max-height: 32px;
        overflow: hidden;
        overflow-wrap: break-word;
        word-wrap: break-word;
        color: ${secondaryText};
        margin: 0.2rem 0;
        cursor: default;
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
      .todo-item:focus-within .todo-edit-icon > icon-component {
        visibility: visible;
      }

      todo-underline {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: none;
      }

      .todo-input:focus-within ~ todo-underline {
        display: block;
      }
    `;
  };

    @property({ type: String }) id = '';
    @property({ type: String, reflect: true }) value = '';
    @property({ type: String, reflect: false }) comment = '';
    @property({ type: Boolean, reflect: true }) checked;

    addNewTodo() {
      const uuid = uuidv4();

      TodoDB.add(uuid)
        .then(todo => store.dispatch(addTodo(todo)))
        .catch(e => console.log('error while checking: ', e));
    }

    updateCheckedValue(uuid, value) {
      const payload = {
        uuid,
        value,
        column: COLUMN_DONE,
      };

      TodoDB.update(payload).then((data) => store.dispatch(updateTodo(data)))
        .catch((e) => console.log('error while checking: ', e));
    }

    updateTodoItemValue(uuid, value) {
      const payload = {
        uuid,
        value,
        column: COLUMN_VALUE,
      };

      TodoDB.update(payload).then((data) => store.dispatch(updateTodo(data)))
        .catch((e) => console.log('error while updating todo: ', e));
    }

    deleteTodoItem(id) {
      TodoDB.delete(id)
        .then((data) => store.dispatch(deleteTodo(id)))
        .catch((e) => console.log('error while deleting too: ', e));
    }

    // Handle when todo item is checked.
    onChecked(e) {
      this.checked = !this.checked;
      this.updateCheckedValue(this.id, this.checked);
      e.stopPropagation();
    }

    // Handle when a todo item text is updated.
    onInputChange(e) {
      const { value } = e.target;
      this.value = value;
      if (e.code === ENTER_KEY_CODE) {
        this.addNewTodo();
      } else {
        this.updateTodoItemValue(this.id, this.value);
      }
    }

    // Handle when a todo item is deleted.
    onDelete(e) {
      this.deleteTodoItem(this.id);
      e.stopPropagation();
    }

    onFullEdit(e) {
      store.dispatch(openEditPanel({
        uuid: this.id,
        value: this.value,
        comment: this.comment,
      }));
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

    onTodoItemClick() {
      this.shadowRoot.querySelector('input').focus();
    }

    render() {
      const iconName = this.checked ? 'done' : 'circle';
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
        <div @click="${this.onTodoItemClick}" class="todo-item">
          <div aria-label="todo item checkbox" class="todo-checkbox-icon icon-wrapper">
            <icon-component
              @click="${this.onChecked}"
              @keydown="${this.onCheckedKeydown}"
              name="${iconName}"
            >
            </icon-component>
          </div>
          <div class="todo-input">
            <input @keyup="${this.onInputChange}" value="${this.value}" ?disabled="${isDisabled}"/>
            <div class="comment">
              ${this.comment}
            </div>
          </div>
          ${actionIcon}
          <todo-underline></todo-underline>
        </div>
      `;
    }
}

customElements.define('todo-item', TodoItem);
