import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './login.less!';
import template from './login.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'Welcome Back!!'
    },
    emotion: {
      value: '<span class="fa fa-smile-o fa-2x"/>'
    }
  }
});

export default Component.extend({
  tag: 'account-login',
  viewModel: ViewModel,
  template
});