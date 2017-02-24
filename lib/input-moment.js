'use strict';

var cx = require('classnames');
var blacklist = require('blacklist');
var moment = require('moment');
var React = require('react');
var Calendar = require('./calendar');
var Time = require('./time');

module.exports = React.createClass({
  displayName: 'InputMoment',

  getInitialState: function getInitialState() {
    return {
      tab: 0
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      sideBySide: false,
      prevMonthIcon: 'ion-ios-arrow-left',
      nextMonthIcon: 'ion-ios-arrow-right',
      isValid: function isValid(m) {
        return true;
      }
    };
  },
  render: function render() {
    var tab = this.state.tab;
    var m = this.props.moment;
    var props = blacklist(this.props, 'className', 'moment', 'prevMonthIcon', 'nextMonthIcon', 'onSave', 'isValid', 'sideBySide');
    props.className = cx('m-input-moment', this.props.className);

    var sideBySide = this.props.sideBySide;
    return React.createElement(
      'div',
      props,
      React.createElement(
        'div',
        { className: cx('options', { 'side-by-side': sideBySide }) },
        React.createElement(
          'button',
          { type: 'button', className: cx('fa fa-calendar im-btn', { 'is-active': !sideBySide && tab === 0 }), onClick: this.handleClickTab.bind(null, 0) },
          'Date'
        ),
        React.createElement(
          'button',
          { type: 'button', className: cx('fa fa-clock-o im-btn', { 'is-active': !sideBySide && tab === 1 }), onClick: this.handleClickTab.bind(null, 1) },
          'Time'
        )
      ),
      React.createElement(
        'div',
        { className: cx('tabs', { 'side-by-side': sideBySide }) },
        React.createElement(Calendar, {
          className: cx('tab', { 'is-active': tab === 0 || sideBySide }),
          moment: m,
          onChange: this.props.onChange,
          prevMonthIcon: this.props.prevMonthIcon,
          nextMonthIcon: this.props.nextMonthIcon,
          isValid: this.props.isValid
        }),
        React.createElement(Time, {
          className: cx('tab', { 'is-active': tab === 1 || sideBySide }),
          moment: m,
          onChange: this.props.onChange
        })
      ),
      React.createElement(
        'button',
        { type: 'button', className: 'im-btn btn-save fa-check',
          onClick: this.handleSave },
        'Save'
      )
    );
  },
  handleClickTab: function handleClickTab(tab, e) {
    e.preventDefault();
    this.setState({ tab: tab });
  },
  handleSave: function handleSave(e) {
    e.preventDefault();
    if (this.props.onSave) this.props.onSave();
  }
});