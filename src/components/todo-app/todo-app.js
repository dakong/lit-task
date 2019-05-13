import { html, LitElement, property } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import uuidv4 from 'uuid/v4';

import { store } from '../../store';
import TodoDB from '../../indexedDB/todoDB';

import '../todo-add';
import '../todo-item';
import '../todo-list';

import style from './style';

import {
	ADD_TODO,
	TOGGLE_CHECK_TODO,
	EDIT_TODO,
	updateTodo,
	initializeItems,
	addTodo,
} from '../../actions/todo';

class TodoApp extends connect(store)(LitElement) {
  static styles = style;

  @property({type: String}) listID = '';
	@property({type: Array}) todoList = [];

	firstUpdated(changedProperties) {
		store.dispatch(initializeItems());
		this.addEventListener(TOGGLE_CHECK_TODO, (e) => {
			const {id, checked} = e.detail;
			const payload = {
					uuid: id,
					column: 'done',
					value: checked,
			};
			TodoDB.update(payload)
				.then((data) => store.dispatch(updateTodo(data)))
				.catch((e) => console.log('error while checking: ', e));
		});

		this.addEventListener(EDIT_TODO, (e) => {
			const { id, value } = e.detail;
			const payload = {
					value,
					uuid: id,
					column: 'value',
			};

			TodoDB.update(payload);
		});
	}

	addNewTodo() {
		const uuid = uuidv4();
		TodoDB.add(uuid)
			.then((todo) => store.dispatch(addTodo(todo)))
			.catch((e) => console.log('error while checking: ', e));
	}

	render() {
		return html`
      <todo-list>
				<todo-add @click="${this.addNewTodo}" slot="header"></todo-add>
				${this.todoList.map((item) =>
					html`
						<todo-item slot="item" .id="${item.uuid}" ?checked="${item.done}" .value="${item.value}">
						</todo-item>
					`
				)}
			</todo-list>
		`;
	}

	stateChanged(state) {
		this.todoList = state.todos.todos;
	}
}

customElements.define('todo-app', TodoApp);