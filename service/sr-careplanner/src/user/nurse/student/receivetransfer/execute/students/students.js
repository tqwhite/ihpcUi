import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './students.less!';
import template from './students.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-student-receivetransfer-execute-students component'
    }
  }
});

export default Component.extend({
  tag: 'user-nurse-student-receivetransfer-execute-students',
  viewModel: ViewModel,
  template
});