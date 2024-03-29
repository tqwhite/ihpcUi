import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './account.less!';
import template from './account.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the account component'
    }
  }
});

export default Component.extend({
  tag: 'account',
  viewModel: ViewModel,
  template
});


console.log("location.href="+location.href);

