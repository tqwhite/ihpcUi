import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './transferhistory.less!';
import template from './transferhistory.stache!';

export const ViewModel = Map.extend({
	define: {
		message: {
			value:
				'This is the user-nurse-student-selectorplus-manage-transferhistory component'
		}
	},
	formatDate: function(inDate) {
		const date = new Date(inDate);
		return date.toLocaleDateString();
	},
	formatStudentList: function(transferObject) {
		return transferObject.attr('studentPartialList').attr().reduce(
			(a, item) => a + `\t${item.first} ${item.last}\n`,
			''
		); 
	}
});

export default Component.extend({
	tag: 'user-nurse-student-selectorplus-manage-transferhistory',
	viewModel: ViewModel,
	template
});
