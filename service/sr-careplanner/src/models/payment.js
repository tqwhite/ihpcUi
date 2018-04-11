import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';

export const Payment = can.Map.extend({
	define: {},
	init: function(initData) {
		//console.dir({"initData":initData});
	},
	checkCcInfo: function(fieldName, fieldLabel) {
		let name;
		const errorList = [];
		const pmtInfo=this.attr('ccInfo');
		fieldLabel=fieldLabel?fieldLabel:fieldName;

		const checkValidation = fieldName => {
			let value = pmtInfo[fieldName]
			switch (fieldName) {
				case 'number':
					value = value.replace(/[ ]/g, '');
					if (!value || !value.length) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' cannot be empty'
						});
						break;
					}
					if (isNaN(+value)) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' can only have digits and spaces'
						});
						break;
					}
					if (value.length != 16 && value.length != 12) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' must be 16 digits (12 for Amex)'
						});
						break;
					}
					break;
				case 'zip':
					if (!value || !value.length) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' cannot be empty'
						});
						break;
					}
					if (value.length != 5) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' must be 5 digits'
						});
						break;
					}
					break;

				case 'cardCode':
					if (!value || !value.length) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' cannot be empty'
						});
						break;
					}
					if (value.length != 3 && value.length != 4) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' must be 3 digits (4 for Amex)'
						});
						break;
					}
					if (isNaN(+value)) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' must be numeric'
						});
						break;
					}
					break;
				case 'name':
					value=value;

					if (!value || !value.length) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' cannot be empty'
						});
					}
					break;

				case 'expMonth':
					value = value;
					if (!value || !value.length) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' cannot be empty'
						});
						break;
					}
					if (!value.match(/^\d\d$/) || value < 1 || value > 12) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' must be two digits between 01 and 12'
						});
						break;
					}
					break;

				case 'expYear':
					value = value;
					if (!value || !value.length) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' cannot be empty'
						});
						break;
					}
					if (!value.match(/^\d\d$/)) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' must be two digits'
						});
						break;
					}
					if (value < (+(new Date().toLocaleString('us-en', { year: '2-digit' })))
					) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' must not be in the past'
						});
						break;
					}
					break;
			}
		};

		if (fieldName) {
			checkValidation(fieldName);
		} else {
			["name", "number", "expMonth", "expYear", "cardCode", "zip"].map(
				checkValidation
			);
		}
		return errorList;
	},
	
	checkPoInfo: function(fieldName, fieldLabel) {
		let name;
		const errorList = [];
		const pmtInfo=this.attr('poInfo');
		fieldLabel=fieldLabel?fieldLabel:fieldName;

		const checkValidation = fieldName => {
			let value = pmtInfo[fieldName]

			switch (fieldName) {
				case 'number':
					if (!value || !value.length) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' cannot be empty'
						});
						break;
					}
					
					break;

				case 'authName':
					if (!value || !value.length) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' cannot be empty'
						});
						break;
					}
					
					break;

				case 'authEmail':
					if (!value || !value.length) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' cannot be empty'
						});
						break;
					}
					
					break;

				case 'authPhone':
					if (!value || !value.length) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' cannot be empty'
						});
						break;
					}
					
					break;

				case 'orgName':
					if (!value || !value.length) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' cannot be empty'
						});
						break;
					}
					
					break;

				case 'street':
					if (!value || !value.length) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' cannot be empty'
						});
						break;
					}
					
					break;

				case 'city':
					if (!value || !value.length) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' cannot be empty'
						});
						break;
					}
					
					break;

				case 'state':
					if (!value || !value.length) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' cannot be empty'
						});
						break;
					}
						const stateList=["AL", "NE", "AK", "NV", "AZ", "NH", "AR", "NJ", "CA", "NM", "CO", "NY", "CT", "NC", "DE", "ND", "DC", "OH", "FL", "OK", "GA", "OR", "HI", "PA", "ID", "PR", "IL", "RI", "IN", "SC", "IA", "SD", "KS", "TN", "KY", "TX", "LA", "UT", "ME", "VT", "MD", "VA", "MA", "VI", "MI", "WA", "MN", "WV", "MS", "WI", "MO", "WY" ];
					if (!stateList.includes(value.toUpperCase())) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldName + ' must be a two letter state code'
						});
						break;
					}
					
					break;

				case 'zip':
					if (!value || !value.length) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' cannot be empty'
						});
						break;
					}
					
					if (value.length != 5) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldLabel + ' must be 5 digits'
						});
						break;
					}
					break;
				}
		};

		if (fieldName) {
			checkValidation(fieldName);
		} else {
			["number", "authName", "authEmail", "authPhone", "orgName", "street", "city", "state", "zip"].map(
				checkValidation
			);
		}
		return errorList;
	}
});

Payment.List = can.List.extend(
	{
		Map: Payment
	},
	{
		test: function() {
			console.dir({ this: this });
		}
	}
);

import connect from 'can-connect/';
import 'can-connect/data/memory-cache/';

export const paymentConnection = superMap({
	cacheConnection: connect(['data-memory-cache'], {
		idProp: '_id',
		name: 'user-cache'
	}),
	
	parseListProp: 'data',
	parseListData: function(incomingJson) {
		const incoming = JSON.parse(incomingJson);
		return incoming.data;
	},
	parseInstanceProp: 'data',
	parseInstanceData: function(inDataItem) {
		if (typeof inDataItem == 'string') {
			inDataItem = JSON.parse(inDataItem).data[0];
		}
		return inDataItem;
	},

	url: '/api/payment',
	idProp: '_id',
	Map: Payment,
	List: Payment.List,
	name: 'payment'
});

tag('payment-model', paymentConnection);

export default Payment;
