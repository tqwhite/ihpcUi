import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './main-header.less!';
import template from './main-header.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the main-header component'
    }
  }
});


export default Component.extend({
  tag: 'main-header',
  viewModel: ViewModel,
  template
});