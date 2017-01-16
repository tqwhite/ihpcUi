import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';

export const Register = can.Map.extend({
	define: {},
	validate: function(fieldName) {
		let name;
		const errorList = [];
		const checkValidation = (fieldName) => {
			switch (fieldName) {
				case 'bookNumber':
					if (!this.attr(fieldName) || this.attr(fieldName).length!=6) {

						errorList.push({
							fieldName: fieldName,
							errorText: fieldName + " is exactly six characters long"
						});
					}
					break;
				case 'password':
					if (this.attr('pwhash')){
						break;
					}
				case 'first':
				case 'last':
				case 'username':
					if (!this.attr(fieldName) || !this.attr(fieldName).length) {

						errorList.push({
							fieldName: fieldName,
							errorText: fieldName + " cannot be empty"
						});
					}
					break;
				case 'emailAddress':
					if (!this.attr(fieldName) || !this.attr(fieldName).length) {

						errorList.push({
							fieldName: fieldName,
							errorText: fieldName + " cannot be empty"
						});
					break;
					}
					if (!this.attr(fieldName) || !this.attr(fieldName).match(/@/)) {

						errorList.push({
							fieldName: fieldName,
							errorText: fieldName + " must be a valid email address"
						});
					break;
					}
					
					
					break;
				case 'confirmEmail':
					if (this.attr(fieldName)!=this.attr('emailAddress')) {

						errorList.push({
							fieldName: fieldName,
							errorText: "Email Address and Confirmation Address must match"
						});
					}
					
					break;
			}
		}

		if (fieldName) {
			checkValidation(fieldName);
		} else {
			['first', 'last', 'username', 'password', 'emailAddress', 'confirmEmail'].map(checkValidation);
		}
		return errorList;


	}

});

Register.List = can.List.extend({
Map: Register
}, {});

import connect from 'can-connect/';
import 'can-connect/data/memory-cache/';

export const registerConnection = superMap({
	cacheConnection:connect(["data-memory-cache"],{
	idProp: '_id',
	name: 'register-cache'
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
	
	url: '/api/user/register',
	idProp: '_id',
	Map: Register,
	List: Register.List,
	name: 'register'
});

tag('register-model', registerConnection);

export default Register;
