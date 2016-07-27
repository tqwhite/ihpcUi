import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './plan-editor.less!';
import template from './plan-editor.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the plan-editor component'
    }
  }
});

export default Component.extend({
  tag: 'plan-editor',
  viewModel: ViewModel,
  template
});