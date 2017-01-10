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

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function(x) {
		window['conditions'] = this;
		console.log('added: window[' + "'" + 'conditions' + "'" + ']');
		console.dir({
			"conditions": this.attr(),
			'childComponentLists':this.childComponentLists
		});
	},
  });

export default Component.extend({
  leakScope: true,
  tag: 'conditions',
  viewModel: ViewModel,
  template
});