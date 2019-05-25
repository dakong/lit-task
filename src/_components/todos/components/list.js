import {html, LitElement} from 'lit-element';

class TodoList extends LitElement {
	render() {
		return html`
			<slot name="header"></slot>
			<slot name="item"></slot>
		`;
	}
}

customElements.define('todo-list', TodoList);