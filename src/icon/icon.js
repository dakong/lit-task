import {html, LitElement, property} from 'lit-element';
import editIcon from '../svg/edit';
import circleIcon from '../svg/circle';
import doneIcon from '../svg/done';
import addIcon from '../svg/add';
import trashIcon from '../svg/trash';

import style from './style';

class Icon extends LitElement {
	static styles = style;

	@property({type: String}) id = '';
	@property({type: String, reflect: true}) value = '';
	@property({type: Boolean, reflect: true}) checked;
	@property({type: Boolean}) hover = false;
	@property({type: String}) name = '';

	onIconHover(e) {
		this.hover = true;
	}

	renderIcon() {
		switch(this.name) {
			case 'circle':
				return html`${circleIcon}`;
			case 'edit':
				return html`${editIcon}`;
			case 'done':
				return html`${doneIcon}`;
			case 'add':
				return html`${addIcon}`;
			case 'trash':
				return html`${trashIcon}`;
		}
	}

	render() {
		return html`
				<div id="icon" @onhover="${this.onIconHover}" tabindex="0">
					${this.renderIcon()}
				</div>
		`;
	}
}

customElements.define('icon-component', Icon);