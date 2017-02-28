var cx = require('classnames');
var React = require('react');
var InputSlider = require('react-input-slider');

module.exports = React.createClass({
  displayName: 'Time',

  getInitialState() {
    return {
      am: this.props.moment.hour() < 12
    };
  },

  toggleAM(am) {
    if (this.state.am === am) {
      return;
    }
    var m = this.props.moment;
    if (am) {
      m.add({hours: -12});
    } else {
      m.add({hours: 12});
    }
    this.state.am = am;
    this.setState({am: am});
    this.props.onChange(m);
  },
  render() {
    var m = this.props.moment;

    return (
      <div className={cx('m-time', this.props.className)}>
        <div className="showtime">
          <span className="time">{m.format('hh')}</span>
          <span className="seperator">:</span>
          <span className="time">{m.format('mm')}</span>
          <span className="seperator">:</span>
          <span className={cx('ampm')}>
            <span className={cx('am', {'active': this.state.am})}
                  onClick={() => this.toggleAM(true)}
            >AM</span>
            <span className={cx('pm', {'active': !this.state.am})}
                  onClick={() => this.toggleAM(false)}
            >PM</span>
          </span>
        </div>

        <div className="sliders">
          <div className="time-text">Hours:</div>
          <InputSlider
            className="u-slider-time"
            xmin={0}
            xmax={11}
            x={m.hour() % 12}
            onChange={this.changeHours}
          />
          <div className="time-text">Minutes:</div>
          <InputSlider
            className="u-slider-time"
            xmin={0}
            xmax={59}
            x={m.minute()}
            onChange={this.changeMinutes}
          />
        </div>
      </div>
    );
  },

  changeHours(pos) {
    var m = this.props.moment;
    let number = parseInt(pos.x, 10);
    if (!this.state.am) {
      number += 12;
    }
    m.hours(number);
    this.props.onChange(m);
  },

  changeMinutes(pos) {
    var m = this.props.moment;
    m.minutes(parseInt(pos.x, 10));
    this.props.onChange(m);
  }
});
