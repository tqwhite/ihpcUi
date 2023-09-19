import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';

export const Session = can.Map.extend({
  define: {
  },
	validate: function(fieldName) {
	},
	
    get:function(name){
    	//this is mine, not an auto access system function
	  const user=this.attr('0');
  	if (user){
console.log(`user[${name}]=${user[name]}  [session.js.[ anonymous ]]`);
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
		users.transfersRecipient=incoming.data.transfersRecipient;
		users.transfersSender=incoming.data.transfersSender;
		return [users]; //originally, api sent a list of one. change in 1/2019 so it sends individual.
	}
	
});

tag('session-model', sessionConnection);

export default Session;
