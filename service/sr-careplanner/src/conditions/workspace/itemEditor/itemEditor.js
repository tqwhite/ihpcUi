import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './itemEditor.less!';
import template from './itemEditor.stache!';
import Boilerplate from "sr-careplanner/models/boilerplate";

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the conditions-workspace-item-editor component'
    },
	saveNotification:{
		value:false,
  		type:'*'
	},
	saveNotificationTimeoutId:{
		value:false,
  		type:'*'
	},
	saveError:{
		value:'',
  		type:'*'
	},
  workingCondition:{
  	type:'*'
  },
    openDiagnosisId: {
      value: '9',
      type:'*'
    }
  },
  
  deleteCondition:function(element){
		if (! window.confirm('Are you sure?')) {
			return;
		}
		this.attr('workingCondition').destroy();
  },
  saveCondition:function(){
  		this.attr('saveNotification', true);
  		const prevTimeoutId=this.attr('saveNotificationTimeoutId');
  		if (prevTimeoutId){
  			clearTimeout(prevTimeoutId);
  			this.attr('saveNotificationTimeoutId', '')
  		}
		new Boilerplate(this.attr('workingCondition'))
		.save()
		.then((result)=>{
				const timeoutId=setTimeout(()=>{
  					this.attr('saveNotification', false);
				}, 2000);
				this.attr('saveNotificationTimeoutId', timeoutId);
			},
			(err)=>{
			this.attr('saveError', JSON.stringify(err))
				console.dir({"err":err});
			});
  	},
  
  selectDiagnosis:function(element, inx){
	var id=$(element).attr('id');
	this.attr('openDiagnosisId', id); //sets a property that shows the correct diagnosis editor
  },
  
  newDiagnosis:function(){
	console.log("\n=-=============   newDiagnosis  =========================\n");
  },
  
  testElement:function(x){
  	console.clear();
	console.dir({"conditions-workspace-item-editor component.attr()":this.attr()});
	//this.attr('workingCondition').attr('diagnoses').attr(inx)
  },
  

});

export default Component.extend({
  tag: 'conditions-workspace-item-editor',
  viewModel: ViewModel,
  events:{
  	'input change':function(){
  		this.viewModel.saveCondition();
  	},
  	'textarea change':function(){
  		this.viewModel.saveCondition();
  	}
  
  },
  template
});