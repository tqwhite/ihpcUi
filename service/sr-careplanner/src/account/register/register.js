import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './register.less!';
import template from './register.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'Care Planner Registration'
    }
  }
});

export default Component.extend({
  tag: 'account-register',
  viewModel: ViewModel,
  template
});