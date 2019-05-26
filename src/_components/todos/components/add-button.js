import { html, LitElement, property, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import uuidv4 from 'uuid/v4';

import { store } from '../../../store';
import TodoDB from '../../../indexedDB/todoDB';

import { addTodo } from '../actionCreators';
import '../../icon';
import { gray200 } from '../../../styles/colors';

class TodoAdd extends connect(store)(LitElement) {
  static styles = css`
    :host {
      display: block;
      cursor: pointer;
    }

    .add-button {
      display: flex;
      flex-direction: row;
      transition: background-color 0.15s;
      border-radius: 40px
    }

    .add-button:hover {
      background-color: ${gray200};
    }

    icon-component {
      padding-left: 0.8rem;
    }

    p {
      color: #273444;
      font-family: 'system-ui';
      margin: 0;
      padding: 0.8rem 0.2rem 0.8rem 1.8rem;
    }
  `;

  addNewTodo() {
		const uuid = uuidv4();

		TodoDB.add(uuid)
			.then(todo => store.dispatch(addTodo(todo)))
			.catch(e => console.log('error while checking: ', e));
	}

  render() {
    return html`
      <div class="add-button" @click="${this.addNewTodo}">
        <icon-component name="add"></icon-component>
        <p>Add a task</p>
      </div>
    `
  }
}

customElements.define('todo-add', TodoAdd);