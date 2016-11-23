import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './forgotpw.less!';
import template from './forgotpw.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'Forgot Password!'
    }
  }
});

export default Component.extend({
  tag: 'account-forgotpw',
  viewModel: ViewModel,
  template
});