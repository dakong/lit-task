import { html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { PanelViewElement } from '../panel-view-element';

import TodoDB from '../../indexed-db/todo-db';

import { gray50 } from '../../styles/colors';
import '../ui/icon';

import { store } from '../../store';
import { openMainPanel } from '../../app/action-creators';

import { deleteTodo } from '../todos/action-creators';
import '../ui/underline';

class EditPanel extends connect(store)(PanelViewElement) {
  static get styles() {
    return css`
      :host {
        width: 375px;
        height: auto;
        display: block;
        margin: 32px auto;

        /*specific styling */
        padding: .2rem .2rem .2rem 1.6rem;

      }

      textarea {
        display: block;
        width: 100%;
        box-sizing: border-box;
        border-radius: 3px;
        font-size: 0.8rem;
        padding: 0.8rem 0.8rem;
        text-decoration: none;
        border-width: 0;
        background-color: ${gray50};
        margin: 0.8rem auto;
        resize: none;
        outline: none;
      }

      textarea[name=details] {
        min-height: 60px;
      }

      textarea[name=title] {
        min-height: 20px;
      }

      icon-component {
        display: inline-flex;
        flex-direction: column;
      }

      icon-component[name=trash] {
        float: right;
      }

      .edit-header {
        height: 32px;
      }

      todo-underline {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: none;
      }

      textarea[name=title]:focus-within + todo-underline,
      textarea[name=details]:focus-within + todo-underline {
        display: block;
      }

      .textarea-wrapper {
        position: relative;
      }
    `;
  };

  onBackButton() {
    store.dispatch(openMainPanel());
  }

  deleteTodoItem(id) {
    TodoDB.delete(id)
      .then((data) => {
        store.dispatch(deleteTodo(id));
        store.dispatch(openMainPanel());
      })
      .catch((e) => console.log('error while deleting too: ', e));
  }

  onDelete() {
    this.deleteTodoItem(this._uuid);
  }

  render() {
    return html`
      <div class="edit-panel">
        <div class="edit-header">
          <icon-component @click="${this.onBackButton}" name="left-arrow"></icon-component>
          <icon-component @click="${this.onDelete}" name="trash"></icon-component>
        </div>

        <div class="textarea-wrapper">
          <textarea name="title" placeholder="Enter title">${this._title}</textarea>
          <todo-underline></todo-underline>
        </div>

        <div class="textarea-wrapper">
          <textarea name="details" placeholder="Add details">${this._comment}</textarea>
          <todo-underline></todo-underline>
        </div>
      </div>
    `;
  }

  updated() {
    if (this.active) {
      const textAreaTitle = this.shadowRoot.querySelector('textarea[name=title]');
      textAreaTitle.focus();
    }
  }

  stateChanged(state) {
    const currentItem = state.app.currentEditable;

    this._uuid = currentItem.uuid;
    this._title = currentItem.value;
    this._comment = currentItem.comment;
  }
}

customElements.define('edit-panel', EditPanel);
