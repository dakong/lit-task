import {html, LitElement, property} from 'lit-element';
import createIcon from '../svg/create';
import circleIcon from '../svg/circle';
import doneIcon from '../svg/done';

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
			case 'create':
				return html`${createIcon}`;
			case 'done':
				return html`${doneIcon}`;
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