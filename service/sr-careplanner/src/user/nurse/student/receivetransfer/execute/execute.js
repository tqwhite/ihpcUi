import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './execute.less!';
import template from './execute.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-student-receivetransfer-execute component'
    }
  }
});

export default Component.extend({
  tag: 'user-nurse-student-receivetransfer-execute',
  viewModel: ViewModel,
  template
});