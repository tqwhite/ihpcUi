import can from 'can';
import map from 'can/map/map';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';

export const FeedbackSupport = map.extend({
	define: {},
	validate: function(fieldName) {
		let name;
		const errorList = [];
		const checkValidation = (fieldName) => {
			switch (fieldName) {
				case 'feedbackMessage':
					if (!this.attr(fieldName)) {

						errorList.push({
							fieldName: fieldName,
							errorText: "Please type something."
						});
					}
					
					break;
			}
		}

		if (fieldName) {
			checkValidation(fieldName);
		} else {
			['feedbackMessage'].map(checkValidation);
		}
		return errorList;


	}

});

FeedbackSupport.List = can.List.extend({
Map: FeedbackSupport
}, {});

import connect from 'can-connect/';
import 'can-connect/data/memory-cache/';

export const feedbackSupportConnection = superMap({
	cacheConnection:connect(["data-memory-cache"],{
	idProp: '_id',
	name: 'feedback-support-cache'
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
	
	url: '/api/user/feedback',
	idProp: '_id',
	Map: FeedbackSupport,
	List: FeedbackSupport.List,
	name: 'feedback-support'
});

tag('feedback-support-model', feedbackSupportConnection);

export default FeedbackSupport;
