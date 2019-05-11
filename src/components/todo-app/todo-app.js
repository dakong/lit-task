import {html, LitElement, property} from 'lit-element';
import uuidv4 from 'uuid/v4';

import '../todo-list';
import style from './style';

class TodoApp extends LitElement {
  static styles = style;

  @property({type: String}) listID = '';

	render() {
		return html`
      <todo-list></todo-list>
		`;
	}
}

customElements.define('todo-app', TodoApp);