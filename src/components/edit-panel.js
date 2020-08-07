import { LitElement, html, css, property } from "lit-element";
import { connect } from "pwa-helpers/connect-mixin.js";

import { store } from "../stores";
import { ENTER_KEY_CODE } from "../constants/key-codes";

import { openTodoPanel } from "../stores/navigation/navigation.action-creators";
import "./ui/form-fields/lit-textarea";

import "./ui/icon";
import "./ui/underline";

import { updateTodo } from "../stores/todos/todos.action-creators";
import logger from "../utils/logger";

class EditPanel extends connect(store)(LitElement) {
  static get styles() {
    return css`
      icon-component {
        display: inline-flex;
        flex-direction: column;
      }

      icon-component[name="trash"] {
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
  }

  @property({ type: Boolean }) active;
  @property({ type: String }) _uuid;
  @property({ type: String }) _title;
  @property({ type: String }) _comment;

  deleteTodoItem(id) {}

  onBackButtonClick() {
    store.dispatch(openTodoPanel());
  }
  onDeleteButtonClick() {
    this.deleteTodoItem(this._uuid);
  }

  onBackButtonKeydown(e) {
    if (e.code === ENTER_KEY_CODE) {
      store.dispatch(openTodoPanel());
    }
  }

  onDeleteButtonKeydown(e) {
    if (e.code === ENTER_KEY_CODE) {
      this.deleteTodoItem(this._uuid);
    }
  }

  updateTodoItem(uuid, value, column) {
    const payload = {
      uuid,
      value,
      column,
    };
  }

  onTitleChange(e) {
    const { value } = e.detail;
    this._title = value;
    this.updateTodoItem(this._uuid, this._title);
  }

  onCommentChange(e) {
    const { value } = e.detail;
    this._comment = value;
    this.updateTodoItem(this._uuid, this._comment);
  }

  constructor() {
    super();
    this.addEventListener("transitionend", () => {
      logger.Info("transition end");
    });
  }

  onTransitionEnd(e) {
    if (this.active) {
      const textAreaTitle = this.shadowRoot.querySelector(
        "lit-textarea[name=title]"
      );
      textAreaTitle.shadowRoot.querySelector("textarea").focus();
    }
  }

  render() {
    const tabIndex = this.active ? 0 : -1;
    const hidden = !this.active;
    return html`
      <div
        aria-hidden="${hidden}"
        class="edit-panel"
        @transitionend="${this.onTransitionEnd}"
      >
        <div class="edit-header">
          <icon-component
            tab-index="${tabIndex}"
            @click="${this.onBackButtonClick}"
            @keydown="${this.onBackButtonKeydown}"
            name="left-arrow"
          ></icon-component>
          <icon-component
            tab-index="${tabIndex}"
            @click="${this.onDeleteButtonClick}"
            @keydown="${this.onDeleteButtonKeydown}"
            name="trash"
          ></icon-component>
        </div>

        <div class="textarea">
          <lit-textarea
            tab-index="${tabIndex}"
            @textarea-change="${this.onTitleChange}"
            name="title"
            placeholder="Enter title"
            value="${this._title}"
          ></lit-textarea>
        </div>

        <div class="textarea">
          <lit-textarea
            tab-index="${tabIndex}"
            @textarea-change="${this.onCommentChange}"
            name="title"
            placeholder="Enter details"
            value="${this._comment}"
          ></lit-textarea>
        </div>
      </div>
    `;
  }

  stateChanged(state) {
    const currentItem = state.navigation.currentEditable;

    this._uuid = currentItem.uuid;
    this._title = currentItem.value;
    this._comment = currentItem.comment;
  }
}

customElements.define("edit-panel", EditPanel);
