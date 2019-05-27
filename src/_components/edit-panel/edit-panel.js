import { html, css, property } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import uuidv4 from 'uuid/v4';
import { PanelViewElement } from '../panel-view-element';

import { gray50 } from '../../styles/colors';
import '../icon';

import { store } from '../../store';
import { openMainPanel } from '../../app/actionCreators';

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
    `;
	};

  onBackButton() {
    store.dispatch(openMainPanel());
  }

	render() {
		return html`
			<div class="edit-panel">
        <div class="edit-header">
          <icon-component @click="${this.onBackButton}" name="left-arrow"></icon-component>
          <icon-component name="trash"></icon-component>
        </div>

        <textarea name="title" placeholder="Enter title">${this._title}</textarea>
        <textarea name="details" placeholder="Add details">${this._comment}</textarea>
			</div>
		`;
	}

  stateChanged(state) {
    const currentItem = state.app.currentEditable;
    this._uuid = currentItem.uuid,
    this._title = currentItem.value;
    this._comment = currentItem.comment;
  }
}

customElements.define('edit-panel', EditPanel);