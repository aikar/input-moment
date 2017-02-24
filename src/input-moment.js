var cx = require('classnames');
var blacklist = require('blacklist');
var moment = require('moment');
var React = require('react');
var Calendar = require('./calendar');
var Time = require('./time');

module.exports = React.createClass({
  displayName: 'InputMoment',

  getInitialState() {
    return {
      tab: 0
    };
  },

  getDefaultProps() {
    return {
      sideBySide: false,
      prevMonthIcon: 'fa fa-fw fa-chevron-left',
      nextMonthIcon: 'fa fa-fw fa-chevron-right',
      isValid: function(m) { return true; }
    };
  },

  render() {
    var tab = this.state.tab;
    var m = this.props.moment;
    var props = blacklist(this.props, 'className', 'moment', 'prevMonthIcon', 'nextMonthIcon', 'onSave', 'isValid', 'sideBySide');
    props.className = cx('m-input-moment', this.props.className);

    let sideBySide = this.props.sideBySide;
    return (
      <div {...props}>
        <div className={cx('options', {'side-by-side': sideBySide})}>
          <button type="button" className={cx('fa fa-calendar im-btn', {'is-active': !sideBySide && tab === 0})} onClick={this.handleClickTab.bind(null, 0)}>
            Date
          </button>
          <button type="button" className={cx('fa fa-clock-o im-btn', {'is-active': !sideBySide && tab === 1})} onClick={this.handleClickTab.bind(null, 1)}>
            Time
          </button>
        </div>

        <div className={cx('tabs', {'side-by-side': sideBySide})}>
          <Calendar
            className={cx('tab', {'is-active': tab === 0 || sideBySide})}
            moment={m}
            onChange={this.props.onChange}
            prevMonthIcon={this.props.prevMonthIcon}
            nextMonthIcon={this.props.nextMonthIcon}
            isValid={this.props.isValid}
          />
          <Time
            className={cx('tab', {'is-active': tab === 1 || sideBySide})}
            moment={m}
            onChange={this.props.onChange}
          />
        </div>

        <button type="button" className="im-btn btn-save fa-check"
          onClick={this.handleSave}>
          Save
        </button>
      </div>
    );
  },

  handleClickTab(tab, e) {
    e.preventDefault();
    this.setState({tab: tab});
  },

  handleSave(e) {
    e.preventDefault();
    if(this.props.onSave) this.props.onSave();
  }
});
