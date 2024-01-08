import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';

export const User = can.Map.extend({
	define: {},
	validate: function(fieldName) {
		let name;
		const errorList = [];

		const checkValidation = fieldName => {
			switch (fieldName) {
				case 'password':
					if (this.attr('pwhash')) {
						break;
					}

					// With the advent of SSO, it is very counterproductive to prevent login without
					// a password present. This code was suppressed but left here in case something
					// changes in the future.
					// 					if (!this.attr('refId') && !this.attr(fieldName)) {
					//
					// 						errorList.push({
					// 							fieldName: fieldName,
					// 							errorText: fieldName + " cannot be empty for new user"
					// 						});
					// 					}
					break;
				case 'first':
				case 'last':
				case 'username':
					if (!this.attr(fieldName) || !this.attr(fieldName).length) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldName + ' cannot be empty'
						});
					}
					break;
				case 'emailAddress':
					if (!this.attr(fieldName) || !this.attr(fieldName).length) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldName + ' cannot be empty'
						});
					}
					if (
						!this.attr(fieldName) ||
						!this.attr(fieldName).match(/@/) ||
						this.attr(fieldName).length < 3
					) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldName + ' must be a valid email address'
						});
					}

					break;
			}
		};

		if (fieldName) {
			checkValidation(fieldName);
		} else {
			['first', 'last', 'username', 'emailAddress', 'password'].map(
				checkValidation
			);
		}
		return errorList;
		
	}
});

User.List = can.List.extend(
	{
		Map: User
	},
	{}
);

import connect from 'can-connect/';
import 'can-connect/data/memory-cache/';

export const userConnection = superMap({
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
	
	url: '/api/user',
	idProp: '_id',
	Map: User,
	List: User.List,
	name: 'user'
});

tag('user-model', userConnection);

export default User;
