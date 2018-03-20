import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './store.less!';
import template from './store.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the setup-store component'
    },
    unpaid:{
    	value:true,
    	serialize:false
    }
  },

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['setup-store'] = this;
		console.log('added: window[' + "'" + 'setup-store' + "'" + ']');
		console.dir({
			"setup-store": this.attr(),
			'childComponentLists':this.childComponentLists
		});
	}
});

export default Component.extend({
  tag: 'setup-store',
  viewModel: ViewModel,
  template
});