import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './editor.less!';
import template from './editor.stache!';
import qtools from 'lib/qtools-minus/';

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-student-editor-guardian-editor component'
		}
	}
});

export default Component.extend({
	tag: 'user-nurse-student-editor-guardian-editor',
	viewModel: ViewModel,
	template,
	events: {
		'button click': function(el, event) {
			event.stopPropagation(); //stop from cancelling modal

			const selectedParent = this.viewModel.attr('selectedParent');

			selectedParent.each((item, key) => {
				if (key != '_id') {
					selectedParent.attr(key, '');
				}
			});
			this.viewModel.attr('studentEditorVm').saveObject(()=>this.viewModel.attr('showEditor', false));
		},
		click: function(el, event) {
			event.stopPropagation(); //stop from cancelling modal
		}
	}
});
