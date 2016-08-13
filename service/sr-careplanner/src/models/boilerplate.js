import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';

export const Boilerplate = can.Map.extend({
  define: {}
});

Boilerplate.List = can.List.extend({
  Map: Boilerplate
}, {});

import connect from 'can-connect/';
import 'can-connect/data/memory-cache/';
console.log("model/boilerplate says: change back to localStorage cache");

export const boilerplateConnection = superMap({
	cacheConnection:connect(["data-memory-cache"],{
	idProp: '_id',
	name: 'user-cache'
  }),
	

	parseListProp: "data",
	parseListData:function(incomingJson){ 
		const incoming=JSON.parse(incomingJson);
		return incoming.data;
	},
 	parseInstanceProp: "data",
	parseInstanceData:function(inDataItem){ 
		return inDataItem;
	},
	
  url: '/api/boilerplate',
  idProp: '_id',
  Map: Boilerplate,
  List: Boilerplate.List,
  name: 'boilerplate'
});

tag('boilerplate-model', boilerplateConnection);

export default Boilerplate;
