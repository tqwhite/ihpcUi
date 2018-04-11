import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './selector.less!';
import template from './selector.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the setup-store-selector component'
    }
  },
  
  chooseProduct:function(code, price, months, name){
	this.storeRootVm.attr('selectedProductCode', code);
	this.storeRootVm.attr('selectedProductPrice', price);
	this.storeRootVm.attr('selectedProductMonths', months);
	this.storeRootVm.attr('selectedProductName', name);

	this.storeRootVm.attr('purchaseDate', new Date().toLocaleDateString());
	
	this.storeRootVm.attr('showBuyButton', (this.storeRootVm.attr('selectedProductPrice') && !this.storeRootVm.attr('hasEntryErrors'))?true:false);

  },

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['setup-store-selector'] = this;
		console.log('added: window[' + "'" + 'setup-store-selector' + "'" + ']');
		console.dir({
			"setup-store-selector": this.attr(),
			'childComponentLists':this.childComponentLists
		});
	}
});

export default Component.extend({
  tag: 'setup-store-selector',
  viewModel: ViewModel,
  template
});