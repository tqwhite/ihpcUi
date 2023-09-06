import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';

export const District = can.Map.extend({
	define: {},
	validate: function(fieldName) {
console.log(`\n=-=============   validate  ========================= [district.js.validate]\n`);


		let name;
		const errorList = [];

		const checkValidation = (fieldName) => {
			switch (fieldName) {
				case 'XXXXX':
					if (this.attr('XXXXX')=='PLACEHOLDER') {

						errorList.push({
							fieldName: fieldName,
							errorText: fieldName + " is a placeholder"
						});
					}
					break;
			}
		}

		if (fieldName) {
			checkValidation(fieldName);
		} else {
			['XXXXX'].map(checkValidation);
		}
		return errorList;


	}

});

District.List = can.List.extend({
Map: District
}, {});

import connect from 'can-connect/';
import 'can-connect/data/memory-cache/';


// =======================================================================
//
// This is a special model called with non-standard call in app.js 
// before the system is initialized to get information to allow redirect
// for SSO workflow. Not used elsewhere. See models/district.js. It's normal.
//
// =======================================================================



export const districtConnection = superMap({
	cacheConnection:connect(["data-memory-cache"],{
	idProp: 'districtId',
	name: 'district-cache'
  }),
	

	parseListProp: "data",
	parseListData:function(incomingJson){ 
		const incoming=JSON.parse(incomingJson);
		return incoming.data;
	},
 	parseInstanceProp: "data",
	parseInstanceData: function(inDataItem) {
		if (typeof (inDataItem) == 'string') {
			inDataItem = JSON.parse(inDataItem).data[0];
		}
		return inDataItem;
	},
	
	url: '/api/districtSso',
	idProp: 'refId',
	Map: District,
	List: District.List,
	name: 'district'
});

tag('district-model', districtConnection);

export default District;
