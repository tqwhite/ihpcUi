import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './transfer.less!';
import template from './transfer.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-student-selectorplus-manage-transfer component'
    }
  }
});

export default Component.extend({
  tag: 'user-nurse-student-selectorplus-manage-transfer',
  viewModel: ViewModel,
  template
});