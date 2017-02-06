import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';

export const SessionKeepAlive = can.Map.extend({
  define: {
  }
});

SessionKeepAlive.List = can.List.extend({
  Map: SessionKeepAlive
}, {});

export const sessionKeepAliveConnection = superMap({
  url: '/api/session/keepAlive',
  idProp: '_id',
  Map: SessionKeepAlive,
  List: SessionKeepAlive.List,
  name: 'sessionKeepAlive',

	parseListProp: "data",
	parseListData:function(incomingJson){ 
		const incoming=JSON.parse(incomingJson);
		return incoming.data;
	},
 	parseInstanceProp: "data",
	parseInstanceData:function(inJsonItem){ 
		const incoming=JSON.parse(inJsonItem);
		return incoming.data;
	}
	
 
});

tag('sessionKeepAlive-model', sessionKeepAliveConnection);

export default SessionKeepAlive;
