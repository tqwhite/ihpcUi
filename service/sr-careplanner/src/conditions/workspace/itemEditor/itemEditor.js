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
  workingCondition:{
  	type:'*'
  },
    openDiagnosisId: {
      value: '9',
      type:'*'
    }
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
  	
	console.dir({"this.attr()":this.attr()});
console.dir({"this.attr('workingCondition').attr('diagnoses').attr(openDiagnosisInx)":this.attr('workingCondition').attr('diagnoses').attr(1)});


  },
  

});

export default Component.extend({
  tag: 'conditions-workspace-item-editor',
  viewModel: ViewModel,
  events:{
  	'input change':function(){
  		this.save();
  	},
  	'textarea change':function(){
  		this.save();
  	},
  save:function(){
  		console.clear();
		new Boilerplate(this.viewModel.attr('workingCondition'))
		.save()
		.then(function(result){
				console.dir({"result":result});
			},
			function(err){
				console.dir({"err":err});
			});
  	}
  
  },
  template
});