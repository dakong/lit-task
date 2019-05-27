import { html, css, LitElement, property } from 'lit-element';
import uuidv4 from 'uuid/v4';

import { ENTER_KEY_CODE } from '../../../constants/keyCodes';
import '../../icon';

import { deleteTodo, updateTodo, addTodo } from '../actionCreators';
import { openEditPanel } from '../../../app/actionCreators';

import '../../ui/underline';

import {
	gray50, gray100, gray300, blueGray100, blueA200
} from '../../../styles/colors';

import TodoDB from '../../../indexedDB/todoDB';
import { COLUMN_DONE, COLUMN_VALUE } from '../../../indexedDB/constants';

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
				padding: .2rem .2rem .2rem 1.6rem;
			}

			:host([checked]) input {
				text-decoration: line-through;
			}

			input {
				font-size: 0.8rem;
				padding: 0.8rem 0.2rem;
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

			.icon-wrapper {
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.todo-checkbox-icon {
				padding-left: 0.8rem;
			}

			.todo-edit-icon {
				cursor: pointer;
				padding-right: 0.8rem;
			}

			.todo-edit-icon icon-component {
				display: none;
			}

			.todo-item:hover .todo-edit-icon > icon-component,
			.todo-item:focus-within .todo-edit-icon > icon-component {
				display: block;
			}

			todo-underline {
				position: absolute;
				bottom: 0;
				width: 100%;
				display: none;
			}

			.todo-item:focus-within todo-underline {
				display: block;
			}
	`
	};

	@property({type: String}) id = '';
	@property({type: String, reflect: true}) value = '';
	@property({type: Boolean, reflect: true}) checked;

	// Handle when todo item is checked.
	onChecked() {
		this.checked = !this.checked;

		const payload = {
			uuid: this.id,
			column: COLUMN_DONE,
			value: this.checked,
		}

		this.updateCheckedValue(this.id, this.checked);
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
	onDelete() {
		this.deleteTodoItem(this.id);
	}

	onFullEdit() {
		store.dispatch(openEditPanel({
			uuid: this.id,
			value: this.value,
			comment: this.comment,
		}));
	}

	addNewTodo() {
		const uuid = uuidv4();

		TodoDB.add(uuid)
			.then(todo => store.dispatch(addTodo(todo)))
			.catch(e => console.log('error while checking: ', e));
	}

	// Add ability to check a todo item using the enter key.
	onCheckedKeyDown(e) {
		if (e.code === ENTER_KEY_CODE)
			this.handleChecked();
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

	render() {
		const iconName = this.checked ? 'done' : 'circle';
		const isDisabled = !!this.checked;
		const editIcon = html`
				<div
					@click="${this.onFullEdit}"
					aria-label="edit todo item"
					class="todo-edit-icon icon-wrapper"
				>
					<icon-component name="edit"></icon-component>
				</div>
		`;
		const deleteIcon = html`
			<div
					@click="${this.onDelete}"
					aria-label="delete todo item"
					class="todo-edit-icon icon-wrapper"
				>
					<icon-component name="trash"></icon-component>
				</div>
		`;
		const actionIcon = this.checked ? deleteIcon : editIcon;

		return html`
			<div class="todo-item">
				<div
					@click="${this.onChecked}"
					@keydown="${this.onCheckedKeyDown}"
					aria-label="todo item checkbox"
					class="todo-checkbox-icon icon-wrapper"
				>
					<icon-component name="${iconName}"></icon-component>
				</div>

				<div class="todo-input">
					<input @keyup="${this.onInputChange}" value="${this.value}" ?disabled="${isDisabled}"/>
				</div>
				${actionIcon}
				<todo-underline></todo-underline>
			</div>
		`;
	}
}

customElements.define('todo-item', TodoItem);