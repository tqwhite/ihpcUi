import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './admin.less!';
import template from './admin.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the admin component'
    }
  }
});

export default Component.extend({
  leakScope: true,
  tag: 'admin',
  viewModel: ViewModel,
  template
});