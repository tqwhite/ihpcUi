import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';

export const Student = can.Map.extend({
  define: {},
	init: function (initData) {
		//console.dir({"initData":initData});
	}
	
});

Student.List = can.List.extend({
  Map: Student
}, {});

import connect from 'can-connect/';
import 'can-connect/data/memory-cache/';

export const studentConnection = superMap({
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
	
	if (typeof(inDataItem)=='string'){
		inDataItem=JSON.parse(inDataItem).data[0];
	}
		return inDataItem;
	},
	
  url: '/api/student',
  idProp: '_id',
  Map: Student,
  List: Student.List,
  name: 'student'
});

tag('student-model', studentConnection);

export default Student;
