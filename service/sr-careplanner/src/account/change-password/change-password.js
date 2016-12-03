import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './change-password.less!';
import template from './change-password.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the account-change-password component'
    }
  }
});

export default Component.extend({
  tag: 'account-change-password',
  viewModel: ViewModel,
  template
});