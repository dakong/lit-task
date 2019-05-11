import {html, LitElement, property} from 'lit-element';
import '../todo-item';
import TodoDB from '../../indexedDb/todoDB';

class TodoList extends LitElement {
	@property({type: String}) id = '';
	@property({type: Array}) list = [];

	async initDB() {
		await TodoDB.initializeDB();
		const todos = await TodoDB.getAll();
		todos.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
		this.list = todos;
	}

	firstUpdated(changedProperties) {
		this.initDB();

		this.addEventListener('TODO_ITEM/CHECK', (e) => {
			const {id, checked} = e.detail;
			const payload = {
					uuid: id,
					column: 'done',
					value: checked,
			};

			TodoDB.update(payload);
		});

		this.addEventListener('TODO_ITEM/EDIT', (e) => {
			 const { id, value } = e.detail;
			const payload = {
					value,
					uuid: id,
					column: 'value',
			};

			TodoDB.update(payload);
		});
	}

	render() {
		return html`
			${this.list.map((item) => html`<todo-item id="${item.uuid}" ?checked="${item.done}" value="${item.value}"></todo-item>`)}
		`;
	}
}

customElements.define('todo-list', TodoList);