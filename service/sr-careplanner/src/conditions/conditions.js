import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './conditions.less!';
import template from './conditions.stache!';
import Boilerplate from "sr-careplanner/models/boilerplate";

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the conditions component'
    },
    boilerplate: {
		get: function() {
			const list=Boilerplate.getList({});
			return list;
		}
  }
  
  },
  clearConsole:function(){
  	console.clear();
  	}
  });

export default Component.extend({
  tag: 'conditions',
  viewModel: ViewModel,
  template
});