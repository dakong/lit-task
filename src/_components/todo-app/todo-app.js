import { html, LitElement, property, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../../store';

import '../todos/components/add-button';
import '../todos/components/list';
import '../todos/components/item';

import { initializeItems } from './actionCreators';

class TodoApp extends connect(store)(LitElement) {
  static styles = css`
		:host {
			width: 375px;
			height: 475px;
			display: block;
		}
	`;

  @property({type: String}) listID = '';
	@property({type: Array}) todoList = [];

	firstUpdated(changedProperties) {
		store.dispatch(initializeItems());
	}

	render() {
		return html`
      <todo-list>
				<todo-add slot="header"></todo-add>
				${this.todoList.map((item) =>
					html`
						<todo-item slot="item" .id="${item.uuid}" ?checked="${item.done}" .value="${item.uuid}">
						</todo-item>
					`
				)}
			</todo-list>
		`;
	}

	stateChanged(state) {
		this.todoList = state.todos;
	}
}

customElements.define('todo-app', TodoApp);