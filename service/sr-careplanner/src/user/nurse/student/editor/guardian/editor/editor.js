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

			if ($(event.target).attr('id')=='deleteGuardian'){

			const selectedParent = this.viewModel.attr('selectedParent');

			selectedParent.each((item, key) => {
				if (key != '_id') {
					selectedParent.attr(key, '');
				}
			});
			this.viewModel.attr('studentEditorVm').saveObject(()=>this.viewModel.attr('showEditor', false));
			}
			else if ($(event.target).attr('id')=='initFromStudent'){

				const selectedParent = this.viewModel.attr('selectedParent');

				const student=this.viewModel.attr('studentEditorVm').attr('student');

				selectedParent.attr('street1', student.attr('street1'));
				selectedParent.attr('street2', student.attr('street2'));
				selectedParent.attr('city', student.attr('city'));
				selectedParent.attr('state', student.attr('state'));
				selectedParent.attr('zip', student.attr('zip'));
				selectedParent.attr('phoneMain', student.attr('phone'));
				selectedParent.attr('emailAdr', student.attr('emailAddress'));

			//	this.viewModel.attr('studentEditorVm').saveObject();

			}
		},
		click: function(el, event) {
			event.stopPropagation(); //stop from cancelling modal
		}
	}
});
