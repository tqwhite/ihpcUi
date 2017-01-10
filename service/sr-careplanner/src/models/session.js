import can from 'can';
import map from 'can/map/map';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';

export const Session = map.extend({
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
		return incoming.data;
	},
 	parseInstanceProp: "data",
	parseInstanceData:function(inJsonItem){ 
		const incoming=JSON.parse(inJsonItem);
		return incoming.data;
	}
	
 
});

tag('session-model', sessionConnection);

export default Session;
