import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './summary.less!';
import template from './summary.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the nurse-student-summary component'
    }
  }
});

export default Component.extend({
  tag: 'nurse-student-summary',
  viewModel: ViewModel,
  template
});