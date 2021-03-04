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

		event.stopPropagation();

		if (element != 'new') {
			element.attr('isNew', false); //isNew is not used in guardians but I do not want any difference compared to guardians
			this.attr('selectedProvider', element);
		} else {
			const hcProviderList = this.attr('student').attr('hcProviderList');

			const blankHcProviderList = {
				isNew:true,
				description:'',
				name:'',
				street1:'',
				street2:'',
				city:'',
				state:'',
				zip:'',
				emailAddress:'',
				phoneMain:'',
				phoneFax:'',
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
