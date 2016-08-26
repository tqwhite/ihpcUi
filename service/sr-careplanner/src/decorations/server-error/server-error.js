import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './server-error.less!';
import template from './server-error.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the decorations-server-error component'
    }
  }
});

export default Component.extend({
  tag: 'decorations-server-error',
  viewModel: ViewModel,
  template
});