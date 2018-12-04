import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './filter.less!';
import template from './filter.stache!';

export const ViewModel = Map.extend({
	define: {
		message: {
			value:
				'This is the user-nurse-student-selectorplus-manage-filter component'
		},
		filterFragment2: {
			value: 'XX'
		}
	}
});

export default Component.extend({
	tag: 'user-nurse-student-selectorplus-manage-filter',
	viewModel: ViewModel,
	template,
	events: {
		click: function(el, event) {
			if (
				$(event.target)
					.prop('tagName')
					.toLowerCase() == 'user-nurse-student-selectorplus-manage-filter'
			) {
				return;
			}
			if (['newStudentButton'].includes($(event.target).attr('id'))) {
				return;
			} 
			 event.stopPropagation();
		},
		keyup: function(el, event) {
			if ($(event.target).attr('id') == 'filterFragment') {
				const tmp = this.viewModel
					.attr('%root')
					.attr('filterFragment', $(event.target).val());
			}
			event.stopPropagation();
		}
	}
});
