import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';

export const Payment = can.Map.extend({
	define: {},
	init: function(initData) {
		//console.dir({"initData":initData});
	}

});

Payment.List = can.List.extend({
	Map: Payment
}, {

test:function(){

console.dir({"this":this});


}


});

import connect from 'can-connect/';
import 'can-connect/data/memory-cache/';

export const paymentConnection = superMap({
	cacheConnection: connect(["data-memory-cache"], {
		idProp: '_id',
		name: 'user-cache'
	}),


	parseListProp: "data",
	parseListData: function(incomingJson) {
		const incoming = JSON.parse(incomingJson);
		return incoming.data;
	},
	parseInstanceProp: "data",
	parseInstanceData: function(inDataItem) {

		if (typeof (inDataItem) == 'string') {
			inDataItem = JSON.parse(inDataItem).data[0];
		}
		return inDataItem;
	},

	url: '/api/payment',
	idProp: '_id',
	Map: Payment,
	List: Payment.List,
	name: 'payment'
});

tag('payment-model', paymentConnection);

export default Payment;
