import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nurse.less!';
import template from './nurse.stache!';
import Student from "sr-careplanner/models/student";

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
			const list=Student.getList({});
			return list;
		}
	},
    showStudentEditor: {
      value: true
    }
  },
  
  showSummary:function(){
  	this.attr('showStudentEditor', false);
  },
  
  hideSummary:function(){
  	this.attr('showStudentEditor', true);
  },
  
  testElement:function(x){
  	console.clear();
	console.dir({"user-nurse":this.attr()});
  },
});

export default Component.extend({
  tag: 'user-nurse',
  viewModel: ViewModel,
  template
});