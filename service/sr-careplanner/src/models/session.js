import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';

export const Session = can.Map.extend({
  define: {},
    get:function(name){
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
  name: 'session'
});

tag('session-model', sessionConnection);

export default Session;
