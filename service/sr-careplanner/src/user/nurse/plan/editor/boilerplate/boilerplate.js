import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './boilerplate.less!';
import template from './boilerplate.stache!';

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-plan-editor-boilerplate component'
		}
	},
	
	generateConditionRefIdList:function(){
		this.conditionRefIdList=[];
		const conditions=this.attr('planRootVm').workingPlan.conditions;

		for (var i=0, len=conditions.length; i<len; i++){
			var element=conditions[i];
				if (conditions[i].sourceConditionRefId){
					this.conditionRefIdList.push(conditions[i].sourceConditionRefId);
				}
		}
	},
	
	alreadyInPlan:function(condition){
		if (typeof(this.conditionRefIdList)=='undefined'){
			this.generateConditionRefIdList();
		}
		
		const refId=condition.refId;

		if (this.conditionRefIdList.indexOf(refId)>-1){
			return true
		}
		else{
			return false
		}
	},

	showDetail: function(element) {
		const mainElement=$(element);
		window.AAA=mainElement;
		mainElement.css('border', '1pt solid gray').find('.detail').show();
	},

	hideDetail: function(element) {
		$(element).css('border', 'none').find('.detail').hide();

	},

	testElement: function() {
		console.dir({
			"user-nurse-plan-editor-boilerplate": this.attr()
		});}
});

export default Component.extend({
  leakScope: true,
	tag: 'user-nurse-plan-editor-boilerplate',
	viewModel: ViewModel,
	template
});