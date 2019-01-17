import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './controls.less!';
import template from './controls.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-student-receivetransfer-execute-controls component'
    }
  }
});

export default Component.extend({
  tag: 'user-nurse-student-receivetransfer-execute-controls',
  viewModel: ViewModel,
  template
});