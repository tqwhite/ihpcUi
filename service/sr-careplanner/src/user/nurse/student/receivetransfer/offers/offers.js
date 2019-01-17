import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './offers.less!';
import template from './offers.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-student-receivetransfer-offers component'
    }
  }
});

export default Component.extend({
  tag: 'user-nurse-student-receivetransfer-offers',
  viewModel: ViewModel,
  template
});