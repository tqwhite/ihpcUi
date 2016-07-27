import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './help.less!';
import template from './help.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the help component'
    }
  }
});

export default Component.extend({
  tag: 'help',
  viewModel: ViewModel,
  template
});