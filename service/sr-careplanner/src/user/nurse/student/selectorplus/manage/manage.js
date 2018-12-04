import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './manage.less!';
import template from './manage.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-student-selectorplus-manage component'
    },
    showSelector:{
    	value:false,
    	serialize:false
    },
    functionMode:{
    	value:'selector',
    	serialize:false
    }
  },
  toggleFunction:function(event){
	  event.stopPropagation();
		const mode=this.attr('functionMode');
		this.attr('functionMode', (mode=='selector')?'transfer':'selector');
	  },
	applyFilterSpec:function(event){
	
console.dir({"event [manage.js.applyFilterSpec]":event});


	
	}
});

export default Component.extend({
  tag: 'user-nurse-student-selectorplus-manage',
  viewModel: ViewModel,
  template
});