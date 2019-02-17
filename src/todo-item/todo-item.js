import {html, LitElement, property} from 'lit-element';
import {ENTER_KEY_CODE} from '../constants/keyCodes';
import createIcon from '../svg/create';
import circleIcon from '../svg/circle';
import doneIcon from '../svg/done';
import '../icon';

import {TODO_ITEM_CHECK, TODO_ITEM_EDIT} from './events';
import style from './style';

import './underline';

class TodoItem extends LitElement {
	static styles = style;

	@property({type: String}) id = '';
	@property({type: String, reflect: true}) value = '';
	@property({type: Boolean, reflect: true}) checked;
	@property({type: Boolean}) hover = false;

	onCheckBoxMouseOver(e) {
		this.hover = true;
	}

	onCheckBoxMouseOut(e) {
		this.hover = false;
	}

	handleEdit() {
		this.dispatchEditEvent(this.id);
	}

	handleChecked() {
		this.checked = !this.checked;
		this.dispatchCheckedEvent(this.id, this.checked);
	}

	handleCheckedKeyDown(e) {
		if (e.code === ENTER_KEY_CODE)
			this.handleChecked();
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

	dispatchEditEvent(id) {
		this.dispatchEvent(new CustomEvent(TODO_ITEM_EDIT, {
			detail: {
			  id,
			},
            bubbles: true,
            cancelable: true,
            composed: true,
		  }));
	}

	render() {
		return html`
			<div id="todo-item">
				<div id="checkbox" class="icon-wrapper" @click="${this.handleChecked}" @keydown="${this.handleCheckedKeyDown}" @mouseover="${this.onCheckBoxMouseOver}" @mouseleave="${this.onCheckBoxMouseOut}" aria-label="checkbox">
					<icon-component name="${this.checked ? 'done' : 'circle'}"></icon-component>
				</div>
				<div id="checkbox-label">
					<input value="${this.value}"/>
				</div>
				<div id="edit-icon" class="icon-wrapper" @click="${this.handleEdit}" aria-label="edit item">
					<icon-component name="create"></icon-component>
				</div>
				<todo-underline></todo-underline>
			</div>
		`;
	}
}

customElements.define('todo-item', TodoItem);