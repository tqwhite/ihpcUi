import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './condition.less!';
import template from './condition.stache!';

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-plan-editor-condition component'
		},
		showEditView: {
			value: true
		},
		showNdSelector: {
			value: false
		}
	},

	toggleEditView: function() {
		this.attr('showEditView', !this.attr('showEditView'));
	},

	activateNdSelector: function(event) {
		event.stopPropagation();
		this.attr('%root').activateModal(() => {
			this.attr('showNdSelector', false);
		});
		this.attr('showNdSelector', true);
	},

	testElement: function(x) {
		console.dir({
			"user-nurse-plan-editor-condition": this.attr()
		});
	}
});

export default Component.extend({
	tag: 'user-nurse-plan-editor-condition',
	viewModel: ViewModel,
	template
});