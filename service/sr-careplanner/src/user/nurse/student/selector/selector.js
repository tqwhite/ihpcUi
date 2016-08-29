import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './selector.less!';
import template from './selector.stache!';

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-student-selector component'
		},
		showSelector: {
			value: ''
		}
	},
	displaySelector: function(control) {
		this.attr('showSelector', control);
	},
	chooseStudent: function(inx, element) {
		this.attr('parentVm').attr('newStudentFlag', false);
		this.attr('parentVm').attr('openStudentRefId', element.attr('refId'));
	},

});

export default Component.extend({
	tag: 'user-nurse-student-selector',
	viewModel: ViewModel,
	events: {
		'li click': function() {
			this.viewModel.displaySelector(false);
		}

	},
	template
});