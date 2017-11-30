import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';

export const Session = can.Map.extend({
  define: {
  },
    get:function(name){
    	//this is mine, not an auto access system function
	  const user=this.attr('0');
  	if (user){
  		return user[name];
  	}
  	else{
  		return;
  	}
  }
});

Session.List = can.List.extend({
  Map: Session
}, {});

export const sessionConnection = superMap({
  url: '/api/session',
  idProp: '_id',
  Map: Session,
  List: Session.List,
  name: 'session',

	parseListProp: "data",
	parseListData:function(incomingJson){ 
		const incoming=JSON.parse(incomingJson);
		return incoming.data; //not used I think, tqii, 11/29/17
	},
 	parseInstanceProp: "data",
	parseInstanceData:function(inJsonItem){ 
		const incoming=JSON.parse(inJsonItem);
		const users=incoming.data.users;
		return users;
	}
	
 
});

tag('session-model', sessionConnection);

export default Session;
