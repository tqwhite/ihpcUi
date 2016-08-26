import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nurse.less!';
import template from './nurse.stache!';
import Student from "sr-careplanner/models/student";
import qtools from "node_modules/qtools-minus/";

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse component'
		},
		workingStudent: {
			value: ''
		},
		students: {
			get: function() {
				const list = Student.getList({});
				return list;
			}
		},
		showStudentEditor: {
			value: true
		},
		newStudentFlag: {
		  value: false,
		  type:'boolean',
		  set:function(value){
			return value;
		  }
		},
		newStudent: {
			value: function() {
				return {
					refId: qtools.newGuid(),
					first: '',
					last: ''
				}
			}
		},
    openStudentRefId: {
      value: '',
      type:'string',
      set:function(value){   
		return value;
      }
    },
		newStudentFlag: {
		  value: false,
		  type:'boolean',
		  set:function(value){
			return value;
		  }
		}
	},

	createNewStudent: function() {

		this.attr('workingStudent', new Student({refId:qtoolsNewGuid()}));
		this.attr('showStudentEditor', true);

	},

	showSummary: function() {
		this.attr('showStudentEditor', false);
	},

	hideSummary: function() {
		this.attr('showStudentEditor', true);
	},

	testElement: function(x) {
		console.dir({
			"user-nurse": this.attr()
		});
	},

	reinitializeDb: function() {
		$.ajax({
			url: '/api/student/reinitialize/'
		}).done((err, result) => {
			this.attr('%root').setNewPage('xxx');
			this.attr('%root').setNewPage('nurse'); //trigger reload

		});
	},
});

export default Component.extend({
	tag: 'user-nurse',
	viewModel: ViewModel,
	template
});