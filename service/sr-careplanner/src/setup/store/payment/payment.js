import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './payment.less!';
import template from './payment.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the setup-store-payment component'
    }
  },

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['setup-store-payment'] = this;
		console.log('added: window[' + "'" + 'setup-store-payment' + "'" + ']');
		console.dir({
			"setup-store-payment": this.attr(),
			'childComponentLists':this.childComponentLists
		});
	}
});

export default Component.extend({
  tag: 'setup-store-payment',
  viewModel: ViewModel,
  template
});