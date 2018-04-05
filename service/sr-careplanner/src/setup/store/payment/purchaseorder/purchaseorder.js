import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './purchaseorder.less!';
import template from './purchaseorder.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the setup-store-payment-purchaseorder component'
    }
  },

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['setup-store-payment-purchaseorder'] = this;
		console.log('added: window[' + "'" + 'setup-store-payment-purchaseorder' + "'" + ']');
		console.dir({
			"setup-store-payment-purchaseorder": this.attr(),
			'childComponentLists':this.childComponentLists
		});
	}
});

export default Component.extend({
  tag: 'setup-store-payment-purchaseorder',
  viewModel: ViewModel,
  template
});