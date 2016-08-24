import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './editor.less!';
import template from './editor.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-student-editor component'
    }
  }
});

export default Component.extend({
  tag: 'user-nurse-student-editor',
  viewModel: ViewModel,
  template
});