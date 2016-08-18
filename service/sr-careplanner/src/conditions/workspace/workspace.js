import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './workspace.less!';
import template from './workspace.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the conditions-workspace component'
    },
    openConditionId: {
      value: '9',
      type:'*'
    },
    newConditionFlag: {
      value: false,
      type:'boolean'
    },
    newCondition: {
    value:function(){
    return {
  		title:'test',
  		shortName:'ND1',
  		diagnoses:[]
  	}
  	}
    }
  },
  
  closeCondition:function(event){
	event.stopPropagation();
  	this.attr('newConditionFlag', false);
	this.attr('openConditionId', '');
  },
  
  selectCondition:function(id){
  	this.attr('newConditionFlag', false);
	this.attr('openConditionId', id);
  },
  
  addEmptyCondition:function(){
  	
  	this.attr('newConditionFlag', true);
  	
//   	const newCond=new can.Map({
//   		title:'',
//   		shortName:'ND1',
//   		diagnoses:[
//   			{
//   				nursingDiagnosis:'',
//   				goals:'',
//   				interventions:'',
//   				outcomes:''
//   			}
//   		]
//   	});
//   	
// console.dir({"newCond":newCond});
// 
// 
//   	this.attr('newCondition', newCond);

  },
  
  testElement:function(x){
  	console.clear();
	console.dir({"conditions-workspace.attr()":this.attr()});
	//this.attr('workingCondition').attr('diagnoses').attr(inx)
  },
  
});

export default Component.extend({
  tag: 'conditions-workspace',
  viewModel: ViewModel,
  template
});