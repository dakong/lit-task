import {css} from 'lit-element';
import {
	gray200
} from '../styles/colors';

export default css`
  #icon {
		height: 2.4rem;
		width: 2.4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 1000;
		border-radius: 50%;
		background-color: transparent;
		transition: background-color 0.15s;
	}

  #icon:hover {
		background-color: ${gray200};
	}

  #icon:focus {
    outline: 0;
    background-color: ${gray200};
  }
`
