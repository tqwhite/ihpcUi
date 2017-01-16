import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';

export const ChangePassword = can.Map.extend({
	define: {},
	validate: function(fieldName) {
		let name;
		const errorList = [];
		const checkValidation = (fieldName) => {
			switch (fieldName) {
				case 'newPassword':
					if (!this.attr(fieldName) || this.attr(fieldName).length<6) {

						errorList.push({
							fieldName: fieldName,
							errorText: fieldName + " has to be at least six characters long"
						});
					}
					if (this.attr(fieldName)!=this.attr('newConfirmPassword')) {

						errorList.push({
							fieldName: fieldName,
							errorText: fieldName + " does not match the confirmation field"
						});
					}
					
					break;
			}
		}

		if (fieldName) {
			checkValidation(fieldName);
		} else {
			['newPassword'].map(checkValidation);
		}
		return errorList;


	}

});

ChangePassword.List = can.List.extend({
Map: ChangePassword
}, {});

import connect from 'can-connect/';
import 'can-connect/data/memory-cache/';

export const changePasswordConnection = superMap({
	cacheConnection:connect(["data-memory-cache"],{
	idProp: '_id',
	name: 'change-password-cache'
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
	
	url: '/api/user/changePassword',
	idProp: '_id',
	Map: ChangePassword,
	List: ChangePassword.List,
	name: 'change-password'
});

tag('change-password-model', changePasswordConnection);

export default ChangePassword;
