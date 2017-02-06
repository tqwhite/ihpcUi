import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './forms.less!';
import template from './forms.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the forms component'
    }
  }
});

export default Component.extend({
  tag: 'forms',
  viewModel: ViewModel,
  template
});