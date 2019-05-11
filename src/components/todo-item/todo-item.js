import {html, LitElement, property} from 'lit-element';
import {ENTER_KEY_CODE} from '../../constants/keyCodes';
import createIcon from '../../svg/create';
import circleIcon from '../../svg/circle';
import doneIcon from '../../svg/done';
import '../../icon';

import {TODO_ITEM_CHECK, TODO_ITEM_EDIT} from './events';
import style from './style';

import './underline';

class TodoItem extends LitElement {
	static styles = style;

	@property({type: String}) id = '';
	@property({type: String, reflect: true}) value = '';
	@property({type: Boolean, reflect: true}) checked;

	handleEdit() {
		// this.dispatchEditEvent(this.id);
	}

	handleChecked() {
		this.checked = !this.checked;
		this.dispatchCheckedEvent(this.id, this.checked);
	}

	handleCheckedKeyDown(e) {
		if (e.code === ENTER_KEY_CODE)
			this.handleChecked();
	}

	onInputChange(e) {
		const {value} = e.target;

		this.value = value;
		this.dispatchEditEvent(this.id, value);
	}

	dispatchCheckedEvent(id, checked) {
		this.dispatchEvent(new CustomEvent(TODO_ITEM_CHECK, {
			detail: {
			  id,
			  checked,
			},
            bubbles: true,
            cancelable: true,
            composed: true,
		  }));
	}

	dispatchEditEvent(id, value) {
		this.dispatchEvent(new CustomEvent(TODO_ITEM_EDIT, {
			detail: {
			  id,
				value,
			},
            bubbles: true,
            cancelable: true,
            composed: true,
		  }));
	}

	render() {
		return html`
			<div class="todo-item">
				<div
					@click="${this.handleChecked}"
					@keydown="${this.handleCheckedKeyDown}"
					aria-label="todo item checkbox"
					class="todo-checkbox-icon icon-wrapper"
				>
					<icon-component name="${this.checked ? 'done' : 'circle'}"></icon-component>
				</div>

				<div class="todo-input">
					<input @keyup="${this.onInputChange}" value="${this.value}"/>
				</div>

				<div
					@click="${this.handleEdit}"
					aria-label="edit todo item"
					class="todo-edit-icon icon-wrapper"
				>
					<icon-component name="create"></icon-component>
				</div>

				<todo-underline></todo-underline>
			</div>
		`;
	}
}

customElements.define('todo-item', TodoItem);