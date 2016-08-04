import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nurse.less!';
import template from './nurse.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse component'
    }
  }
});

export default Component.extend({
  tag: 'user-nurse',
  viewModel: ViewModel,
  template
});