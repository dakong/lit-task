import uuidv4 from 'uuid/v4';

export const todoItems = [
	{ uuid: uuidv4(), datetime: new Date().toUTCString(), value: 'get grocery items', done: true, comment: '' },
	{ uuid: uuidv4(), datetime: new Date().toUTCString(), value: 'work on PRB\'s', done: false, comment: '' },
	{ uuid: uuidv4(), datetime: new Date().toUTCString(), value: 'story refinement', done: true, comment: '' },
];