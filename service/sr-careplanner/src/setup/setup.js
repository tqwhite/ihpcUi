import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './setup.less!';
import template from './setup.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the setup component'
    }
  }
});

export default Component.extend({
  tag: 'setup',
  viewModel: ViewModel,
  template
});