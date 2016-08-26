import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './workspace.less!';
import template from './workspace.stache!';
import qtools from "node_modules/qtools-minus/";

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the conditions-workspace component'
    },
    openConditionId: {
      value: '',
      type:'string',
      set:function(value){   
		return value;
      }
    },
    newConditionFlag: {
      value: false,
      type:'boolean',
      set:function(value){
		return value;
      }
    },
    newCondition: {
    value:function(){
    return {
    	refId:qtools.newGuid(),
  		title:'',
  		shortName:'',
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