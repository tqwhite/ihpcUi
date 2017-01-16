import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';

export const ForgotPassword = can.Map.extend({
	define: {},
	validate: function(fieldName) {
		let name;
		const errorList = [];
		const checkValidation = (fieldName) => {
			switch (fieldName) {
				case 'forgotPasswordInfo':
					if (!this.attr(fieldName)) {

						errorList.push({
							fieldName: fieldName,
							errorText: "We can't do anything unless you enter a value."
						});
					}
					
					break;
			}
		}

		if (fieldName) {
			checkValidation(fieldName);
		} else {
			['forgotPasswordInfo'].map(checkValidation);
		}
		return errorList;


	}

});

ForgotPassword.List = can.List.extend({
Map: ForgotPassword
}, {});

import connect from 'can-connect/';
import 'can-connect/data/memory-cache/';

export const forgotPasswordConnection = superMap({
	cacheConnection:connect(["data-memory-cache"],{
	idProp: '_id',
	name: 'forgot-password-cache'
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
	
	url: '/api/user/forgotPassword',
	idProp: '_id',
	Map: ForgotPassword,
	List: ForgotPassword.List,
	name: 'forgot-password'
});

tag('forgot-password-model', forgotPasswordConnection);

export default ForgotPassword;
