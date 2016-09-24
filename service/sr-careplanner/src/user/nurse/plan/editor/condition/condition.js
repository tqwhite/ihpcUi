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
	
	alreadyInPlan:function(diagnosis){
		const condition=this.attr('condition');
		let foundIt=false;
		console.dir({"condition":condition});
		condition.diagnoses.each((item)=>{
			if (item.sourceDiagnosisRefId==diagnosis.refId){
console.log("item.sourceDiagnosisRefId="+item.sourceDiagnosisRefId);
console.log("diagnosis.refId="+diagnosis.refId);




				foundIt=true;
			}
		
		});
console.log("foundIt="+foundIt);


		return foundIt;
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