import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './display.less!';
import template from './display.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-plan-display component'
    }
  }
});

export default Component.extend({
  tag: 'user-nurse-plan-display',
  viewModel: ViewModel,
  template
});