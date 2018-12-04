import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './switch.less!';
import template from './switch.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-student-selectorplus-manage-switch component'
    }
  }
});

export default Component.extend({
  tag: 'user-nurse-student-selectorplus-manage-switch',
  viewModel: ViewModel,
  template
});