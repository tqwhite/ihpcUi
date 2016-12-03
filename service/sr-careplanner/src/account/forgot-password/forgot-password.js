import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './forgot-password.less!';
import template from './forgot-password.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the account-forgot-password component'
    }
  }
});

export default Component.extend({
  tag: 'account-forgot-password',
  viewModel: ViewModel,
  template
});