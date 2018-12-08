import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './manage.less!';
import template from './manage.stache!';

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-student-selectorplus-manage component'
		},
		showSelector: {
			value: false,
			serialize: false
		}
	}
});

export default Component.extend({
	tag: 'user-nurse-student-selectorplus-manage',
	viewModel: ViewModel,
	template
});
