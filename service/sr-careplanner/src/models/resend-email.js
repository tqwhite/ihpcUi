import can from 'can';
import map from 'can/map/map';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';

export const ResendEmail = map.extend({
	define: {},
	validate: function(fieldName) {
		let name;
		const errorList = [];
		const checkValidation = (fieldName) => {
			switch (fieldName) {
				case 'XXX':
					if (!this.attr(fieldName) || this.attr(fieldName).length!=6) {

						errorList.push({
							fieldName: fieldName,
							errorText: fieldName + " is exactly six characters long"
						});
					}
					
					break;
			}
		}

		if (fieldName) {
			checkValidation(fieldName);
		} else {
			['AAA'].map(checkValidation);
		}
		return errorList;


	}

});

ResendEmail.List = can.List.extend({
Map: ResendEmail
}, {});

import connect from 'can-connect/';
import 'can-connect/data/memory-cache/';

export const resendEmailConnection = superMap({
	cacheConnection:connect(["data-memory-cache"],{
	idProp: '_id',
	name: 'resend-email-cache'
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
	
	url: '/api/user/resendEmail',
	idProp: '_id',
	Map: ResendEmail,
	List: ResendEmail.List,
	name: 'resend-email'
});

tag('resend-email-model', resendEmailConnection);

export default ResendEmail;
