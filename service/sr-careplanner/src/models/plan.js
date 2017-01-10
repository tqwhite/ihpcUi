import can from 'can';
import map from 'can/map/map';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';

export const Plan = map.extend({
  define: {}
});

Plan.List = can.List.extend({
  Map: Plan
}, {});

import connect from 'can-connect/';
import 'can-connect/data/memory-cache/';

export const planConnection = superMap({
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
  url: '/api/plan',
  idProp: '_id',
  Map: Plan,
  List: Plan.List,
  name: 'plan'
});

tag('plan-model', planConnection);

export default Plan;
