import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';

import connect from 'can-connect/';

const parseInstanceData=function(inDataItem) {
			if (typeof inDataItem == 'string') {
				inDataItem = JSON.parse(inDataItem).data;
			}
			return inDataItem;
		};
const parseListData=function(incomingJson) {
			const incoming = JSON.parse(incomingJson);
			return incoming.data;
		};		
		
const baseModel = {
	define: {},
	validate: function(fieldName) {
		let name;
		const errorList = [];

		const checkValidation = fieldName => {
			switch (fieldName) {
				case 'receivingNurseUserName':
					if (!this.attr(fieldName)) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldName + ' is required'
						});
					}
					break;
				case 'transferStudentList':
					if (
						this.attr('executeTransfer') === true &&
						(!this.attr(fieldName) || !this.attr(fieldName).length)
					) {
						errorList.push({
							fieldName: fieldName,
							errorText: fieldName + ' cannot be empty'
						});
					}
					break;
			}
		};

		if (fieldName) {
			checkValidation(fieldName);
		} else {
			['receivingNurseUserName', 'transferStudentList'].map(checkValidation);
		}
		return errorList;
	}
};

const baseSuperMap = {
		
		parseListProp: 'data',
		parseListData: parseListData,
		
		parseInstanceProp: 'data',
		parseInstanceData: parseInstanceData
	
	//url: '/api/transfer',
	//idProp: 'refId',
	//Map: Transfer,
	//List: Transfer.List,
	//name: 'transfer'
};

export const Transfer = can.Map.extend(baseModel);
Transfer.List = can.List.extend(
	{
		Map: Transfer
	},
	{}
);

const transferMap = baseSuperMap;
transferMap.url = '/api/transfer';
transferMap.Map = Transfer;
transferMap.List = Transfer.List;
transferMap.name = 'transfer';
transferMap.idProp = 'refId';

export const transferConnection = superMap(transferMap);













const createEligibility = () => {
/*
	this is wrapped in a function because I couldn't otherwise make it so that it created an
	entirely new server access each time. There was merging of data and what appeared
	to be caching issues (even though I stripped caching out of this).
*/

	
	const Eligibility = can.Map.extend({});

	Eligibility.List = can.List.extend(
		{
			Map: Eligibility
		},
		{}
	);

	superMap({
		
		parseListProp: 'data',
		parseListData: parseListData,
		
		parseInstanceProp: 'data',
		parseInstanceData: parseInstanceData,
		
		url: '/api/transfer/eligibility',
		idProp: 'receivingNurseUserName',
		Map: Eligibility,
		List: Eligibility.List,
		name: 'eligibility'
	});


	return Eligibility;
};  

export default { Transfer: Transfer, createEligibility: createEligibility };
