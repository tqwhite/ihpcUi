import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './summary.less!';
import template from './summary.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-student-summary component'
    }
  }
});

export default Component.extend({
  tag: 'user-nurse-student-summary',
  viewModel: ViewModel,
  template
});