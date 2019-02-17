import {css} from 'lit-element';
import {
	gray50, gray100, gray300, blueGray100, blueA200
} from '../styles/colors';

export default css`
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

	#todo-item {
		border-width: 0 0 1px;
		border-style: solid;
		border-color: ${gray300};
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}

	#todo-item:focus-within {
		background-color: ${gray50};
	}

	todo-underline {
		position: absolute;
		bottom: 0;
		width: 100%;
		display: none;
	}

	#todo-item:focus-within todo-underline {
		display: block;
	}

	.icon-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#checkbox {
		padding-left: 0.8rem;
	}

	#checkbox-label {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		line-height: normal;
		width: 100%;
		box-sizing: border-box;
		padding: .2rem 1.6rem .2rem 1.6rem;
	}

	:host([checked]) input {
		text-decoration: line-through;
	}

	input {
		font-size: 0.8rem;
		padding: 1.2rem 0.2rem;
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

	#edit-icon {
		position: absolute;
		display: none;
		cursor: pointer;
		right: 1.6rem;
		z-index: 0;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	#todo-item:hover #edit-icon,
	#todo-item:focus-within #edit-icon {
		display: flex;
	}
`;