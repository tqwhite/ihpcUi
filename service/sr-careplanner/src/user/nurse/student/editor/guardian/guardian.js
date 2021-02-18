import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './guardian.less!';
import template from './guardian.stache!';
import qtools from 'node_modules/qtools-minus/';

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-student-editor-guardian component'
		},
		showEditor: {
			value: false
		}
	},

	activateEditor: function(event, element) {
		console.clear();
		console.log('clearing in user-nurse-student-editor-guardian (selectedParent was proved correct here)');
		
		event.stopPropagation();
		
		
		
		
		if (element!='new'){
			this.attr('selectedParent', element);
		}
		else{
			const guardianList=this.attr('student').attr('guardianList');
			
			const blankGuardian={
			
				relationship:'',
				name:'',
				street1:'',
				street2:'',
				city:'',
				state:'',
				zip:'',
				emailAdr:'',
				phoneMain:'',
				phoneAlt:'',
			
			}
			const newParent=new Map(blankGuardian);
			guardianList.push(newParent);
			this.attr('selectedParent', newParent);

		}
			
			
		this.attr('showEditor', true);
		this.attr('%root').activateModal(() => {
			this.attr('showEditor', false);

		});
	}
});

export default Component.extend({
	tag: 'user-nurse-student-editor-guardian',
	viewModel: ViewModel,
	template
});
