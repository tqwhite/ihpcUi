import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './main-footer.less!';
import template from './main-footer.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the main-footer component'
    }
  }
});

export default Component.extend({
  tag: 'main-footer',
  viewModel: ViewModel,
  template
});