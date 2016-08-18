import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';

export const User = can.Map.extend({
define: {}
});

User.List = can.List.extend({
Map: User
}, {});

import connect from 'can-connect/';
import 'can-connect/data/memory-cache/';

export const userConnection = superMap({
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
	
	url: '/api/user',
	idProp: '_id',
	Map: User,
	List: User.List,
	name: 'user'
});

tag('user-model', userConnection);

export default User;
