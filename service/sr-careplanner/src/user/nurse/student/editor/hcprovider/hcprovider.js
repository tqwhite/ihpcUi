import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './hcprovider.less!';
import template from './hcprovider.stache!';
import qtools from 'lib/qtools-minus/';

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-student-editor-hcprovider component'
		},
		showEditor: {
			value: false
		}
	},

	activateEditor: function(event, element) {
		console.clear();
		console.log(
			'clearing in user-nurse-student-editor-hcprovider (selectedParent was proved correct here)'
		);


		event.stopPropagation();

		if (element != 'new') {
			this.attr('selectedProvider', element);
		} else {
			const hcProviderList = this.attr('student').attr('hcProviderList');

			const blankHcProviderList = {
				name: '',
				phone: '',
				emailAdr: '',
				description: ''
			};
			const newProvider = new Map(blankHcProviderList);
			hcProviderList.push(newProvider);
			this.attr('selectedProvider', newProvider);
		}

		this.attr('showEditor', true);
		this.attr('%root').activateModal(() => {
			this.attr('showEditor', false);
		});
	}
});

export default Component.extend({
	tag: 'user-nurse-student-editor-hcprovider',
	viewModel: ViewModel,
	template
});
