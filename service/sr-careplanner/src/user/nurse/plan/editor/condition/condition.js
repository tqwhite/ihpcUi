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
		const showEditView=this.attr('showEditView');
		this.attr('editorCloseSpotState', showEditView);
		this.attr('showEditView', !showEditView);
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
		condition.diagnoses.each((item)=>{
			if (item.sourceDiagnosisRefId==diagnosis.refId){
				foundIt=true;
			}
		
		});
		return foundIt;
	},
	
	collectChildComponents:function(childType, childVm){
		if (typeof(this[childType])=='undefined'){
			this[childType]=[];
		}
		this[childType].push(childVm);
	},
	
	changeDiagnosesView:function(){
		let allSummary=false;
		const conditionList=this.childComponentLists['diagnosis'];
		for (var i=0, len=conditionList.length; i<len; i++){
			allSummary=allSummary || conditionList[i].attr('showDiagnosisEditor')
		}
		for (var i=0, len=conditionList.length; i<len; i++){
				conditionList[i].attr('showDiagnosisEditor', !allSummary)
		}
	},


	showDetail: function(element) {
		$(element).css('border', '1pt solid gray');
	},

	hideDetail: function(element) {
		$(element).css('border', 'none');

	},
	
	collectChildComponents:function(childType, childVm){
		this.childComponentLists=this.childComponentLists || {};
		this.childComponentLists[childType]=this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['user-nurse-plan-editor-condition']=this;
		console.log('added: window['+"'"+'user-nurse-plan-editor-condition'+"'"+']');
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