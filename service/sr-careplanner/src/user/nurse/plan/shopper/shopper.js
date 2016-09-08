import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './shopper.less!';
import template from './shopper.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-plan-shopper component'
    }
  }
});

export default Component.extend({
  tag: 'user-nurse-plan-shopper',
  viewModel: ViewModel,
  template
});