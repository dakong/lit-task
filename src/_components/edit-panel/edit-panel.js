import { html, css, LitElement, property } from 'lit-element';
import uuidv4 from 'uuid/v4';
import { gray50 } from '../../styles/colors';
import '../icon';

class EditPanel extends LitElement {
	static get styles() {
		return css`
      :host {
        width: 375px;
        height: auto;
        display: block;
        margin: 32px auto;

        /*specific styling */
        padding: .2rem .2rem .2rem 1.6rem;

      }

      textarea {
        display: block;
        width: 100%;
        box-sizing: border-box;
        border-radius: 3px;
        font-size: 0.8rem;
				padding: 0.8rem 0.8rem;
        text-decoration: none;
        border-width: 0;
				background-color: ${gray50};
        margin: 0.8rem auto;
        resize: none;
        outline: none;
      }

      textarea[name=details] {
        min-height: 60px;
      }

      textarea[name=title] {
        min-height: 20px;
      }

      icon-component {
        display: inline-flex;
        flex-direction: column;
      }

      icon-component[name=trash] {
        float: right;
      }

      .edit-header {
        height: 32px;
      }

    `;
	};

	render() {
		return html`
			<div class="edit-panel">
        <div class="edit-header">
          <icon-component name="left-arrow"> </icon-component>
          <icon-component name="trash"></icon-component>
        </div>

        <textarea name="title" placeholder="Enter title"></textarea>
        <textarea name="details" placeholder="Add details"></textarea>
			</div>
		`;
	}
}

customElements.define('edit-panel', EditPanel);