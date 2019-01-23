import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './transitiondisplay.less!';
import template from './transitiondisplay.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-student-receivetransfer-transitiondisplay component'
    }
  }
});

export default Component.extend({
  tag: 'user-nurse-student-receivetransfer-transitiondisplay',
  viewModel: ViewModel,
  template
});