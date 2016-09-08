import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './plan.less!';
import template from './plan.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-plan component'
    }
  }
});

export default Component.extend({
  tag: 'user-nurse-plan',
  viewModel: ViewModel,
  template
});