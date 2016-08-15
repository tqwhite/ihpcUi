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
  }
  },
  
  
  testElement:function(x){
  	console.clear();
	console.dir({"this.attr()":this.attr()});
	
  },
  

});

export default Component.extend({
  tag: 'conditions-workspace-item-editor',
  viewModel: ViewModel,
  
  events:{
  	'textarea change':function(){
  	

console.dir({"this.viewModel.attr('workingCondition')":this.viewModel.attr('workingCondition')});

new Boilerplate(this.viewModel.attr('workingCondition')).save().then(function(result){
console.dir({"result":result});



},

function(err){
console.dir({"err":err});



});


  	}
  
  },
  template
});