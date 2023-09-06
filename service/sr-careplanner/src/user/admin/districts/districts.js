import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './districts.less!';
import template from './districts.stache!';
import District from "sr-careplanner/models/district";
export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-admin-districts component'
		},
		districts: {
			get: function() {
				const list = District.getList();
				return list;
			}
		},
		workingDistrict: {
			value: District,
			type: '*',
			set: function(value) {
				//value.attr('studentRefId', this.attr('openStudentRefId')); //used by api to create access record
				return value;
			},
			get: function(value) {
				return value;
			}
		},
		showEditor: {
			value: false
		}
	},

	createNew: function() {
		const newDistrict = new District({ displayName: '', districtId: '', ssoParameters:{redirectUrl:''} });
		this.attr('workingDistrict', newDistrict);
		this.attr('errorList', '');

		this.attr('showEditor', true);
	},

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] =
			this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement2: function() {
		// 		window['user-admin-districts'] = this;
		// 		console.log('added: window[' + "'" + 'user-admin-districts' + "'" + ']');
		// 		console.dir({
		// 			"user-admin-districts": this.attr(),
		// 			'childComponentLists':this.childComponentLists
		// 		});
		return 'GOODBYE';
	}
});

export default Component.extend({
	tag: 'user-admin-districts',
	viewModel: ViewModel,
	template
});
