import { html, css, property } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import TodoDB from '../../indexed-db/todo-db';
import { COLUMN_VALUE, COLUMN_COMMENT } from '../../indexed-db/constants';
import { store } from '../../store';
import { openTodoPanel } from '../main-panel/action-creators';
import '../ui/form-fields/lit-textarea';
import { PanelViewElement } from '../panel-view-element';
import todos from '../todos';

import '../ui/icon';
import '../ui/underline';

const { deleteTodo, updateTodo } = todos.actionCreators;

class EditPanel extends connect(store)(PanelViewElement) {
  static get styles() {
    return css`
      icon-component {
        display: inline-flex;
        flex-direction: column;
      }

      icon-component[name=trash] {
        float: right;
      }

      .edit-panel {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        box-sizing: border-box;
        width: var(--app-drawer-width, 100%);
        transition-property: -webkit-transform;
        transition-property: transform;
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
        transition: 0.25s ease all;
        background-color: white;
      }

      :host([active]) .edit-panel {
        transform: translate3d(0, 0, 0);
      }

      .textarea {
        position: relative;
        margin: 0.8rem auto;
      }
    `;
  };

  @property({ type: Boolean }) active;
  @property({ type: String }) _uuid;
  @property({ type: String }) _title;
  @property({ type: String }) _comment;

  onBackButton() {
    store.dispatch(openTodoPanel());
  }

  deleteTodoItem(id) {
    TodoDB.delete(id)
      .then((data) => {
        store.dispatch(deleteTodo(id));
        store.dispatch(openTodoPanel());
      })
      .catch((e) => console.log('error while deleting too: ', e));
  }

  onDelete() {
    this.deleteTodoItem(this._uuid);
  }

  updateTodoItem(uuid, value, column) {
    const payload = {
      uuid,
      value,
      column,
    };

    TodoDB.update(payload).then((data) => store.dispatch(updateTodo(data)))
      .catch((e) => console.log('error while updating todo: ', e));
  }

  onTitleChange(e) {
    const { value } = e.detail;
    this._title = value;
    this.updateTodoItem(this._uuid, this._title, COLUMN_VALUE);
  }

  onCommentChange(e) {
    const { value } = e.detail;
    this._comment = value;
    this.updateTodoItem(this._uuid, this._comment, COLUMN_COMMENT);
  }

  constructor() {
    super();
    this.addEventListener('transitionend', () => {
      const textAreaTitle = this.shadowRoot.querySelector('lit-textarea[name=title]');
      if (!textAreaTitle || this.active === undefined) return;
      if (this.active) {
        textAreaTitle.focus = true;
      } else if (!this.active) {
        textAreaTitle.focus = false;
      }
    });
  }

  setFocusTextAreaTitle() {
    const textAreaTitle = this.shadowRoot.querySelector('lit-textarea[name=title]');
    if (this.active) {
      textAreaTitle.focus = true;
    } else if (!this.active) {
      textAreaTitle.focus = false;
    }
  }

  render() {
    return html`
      <div class="edit-panel">
        <div class="edit-header">
          <icon-component @click="${this.onBackButton}" name="left-arrow"></icon-component>
          <icon-component @click="${this.onDelete}" name="trash"></icon-component>
        </div>

        <div class="textarea">
          <lit-textarea @textarea-change="${this.onTitleChange}" name="title" placeholder="Enter title" value="${this._title}"></lit-textarea>
        </div>

        <div class="textarea">
          <lit-textarea @textarea-change="${this.onCommentChange}" name="title" placeholder="Enter details" value="${this._comment}"></lit-textarea>
        </div>
      </div>
    `;
  }

  stateChanged(state) {
    const currentItem = state.app.currentEditable;

    this._uuid = currentItem.uuid;
    this._title = currentItem.value;
    this._comment = currentItem.comment;
  }
}

customElements.define('edit-panel', EditPanel);
