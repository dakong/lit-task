import {html, LitElement, property} from 'lit-element';
import '../todo-item';

class TodoList extends LitElement {
	@property({type: String}) id = '';
	@property({type: Array}) list = [
		'todo item one',
		'todo item two',
		'todo item three',
	];

	firstUpdated(changedProperties) {
		this.addEventListener('TODO_ITEM/CHECK', (e) => {
			console.log(e);
		});

		this.addEventListener('TODO_ITEM/EDIT', (e) => {
			console.log(e);
		});
	}

	render() {
		return html`
			${this.list.map((item, idx) => html`<todo-item id="${idx}" value="${item}"></todo-item>`)}
		`;
	}
}

customElements.define('todo-list', TodoList);