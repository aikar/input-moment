import autoBind from 'react-autobind';
import React from "react";
const cx = require('classnames');
const InputSlider = require('react-input-slider');

export class Time extends React.Component {
    static tabIndex = 1;
    constructor(props, ctx) {
        super(props, ctx);

        autoBind(this);
        this.state = {
            am: this.props.moment.hour() < 12,
            hr: this.props.moment.format('h'),
            min: this.props.moment.format('mm')
        };
    }

    toggleAM(am) {
        if (this.state.am === am) {
            return;
        }
        const m = this.props.moment;
        if (am) {
            m.add({hours: -12});
        } else {
            m.add({hours: 12});
        }
        this.state.am = am;
        this.setState({am: am});
        this.props.onTimeChange(m);
    };

    render() {
        const m = this.props.moment;

        return (
            <div className={cx('m-time', this.props.className)}>
                <div className="showtime">
                    <span className="time">
                        <input
                            tabIndex={Time.tabIndex++}
                            onChange={this.setHours}
                            onKeyDown={this.onKeyHours.bind(this, true)}
                            onKeyUp={this.onKeyHours.bind(this, false)}
                            onFocus={this.onFocusHours}
                            onBlur={this.onBlurHours}
                            value={this.state.hr}
                        />
                    </span>
                    <span className="seperator">:</span>
                    <span className="time">
                        <input
                            tabIndex={Time.tabIndex++}
                            onChange={this.setMinutes}
                            onKeyDown={this.onKeyMinutes.bind(this, true)}
                            onKeyUp={this.onKeyMinutes.bind(this, false)}
                            onFocus={this.onFocusMinutes}
                            onBlur={this.onBlurMinutes}
                            value={this.state.min}
                        />
                    </span>
                    <span className="seperator"> </span>
                    <span className={cx('ampm')}>
            <span className={cx('am', {'active': this.state.am})}
                  tabIndex={Time.tabIndex++}
                  onKeyDown={this.onKeyAMPM.bind(this, true)}
                  onKeyUp={this.onKeyAMPM.bind(this, false)}
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
    }

    componentWillReceiveProps(props) {
        this.setState({
            am: props.moment.hour() < 12,
            hr: props.moment.format('h'),
            min: props.moment.format('mm')
        });
    }
    onFocusHours(e) {
        this.setState({
            hrprev: this.props.moment.format('H'),
            amprev: this.state.am
        });
    }
    onFocusMinutes(e) {
        this.setState({minprev: this.props.moment.format('mm')});
    }
    onBlurHours(e) {
        if (!parseInt(e.target.value)) {
            const m = this.props.moment;
            m.hours(this.state.hrprev);
            this.props.onTimeChange(m);
        }
    }
    onBlurMinutes(e) {
        if (e.target.value === "") {
            const m = this.props.moment;
            m.minutes(this.state.minprev);
            this.props.onTimeChange(m);
        }
    }

    onKeyAMPM(down, e) {
        const isUp = e.keyCode === 38;
        const isDown = e.keyCode === 40;
        if (down && (isUp || isDown)) {
            this.toggleAM(!this.state.am);
        }
        e.preventDefault();
        return false;
    }

    onKeyHours(down, e) {
        const code = e.keyCode;
        const isUp = code === 38;
        const isDown = code === 40;
        if (!isDown && !isUp) {
            if (!this.isValidKey(code)) {
                e.preventDefault();
            }
            return;
        }
        const m = this.props.moment;
        if (down) {
            if (isUp) {
                m.hours(m.hours() + 1);
            } else if (isDown) {
                m.hours(m.hours() - 1);
            }
            this.props.onTimeChange(m);
        }
    }
    onKeyMinutes(down, e) {
        const code = e.keyCode;
        const isUp = code === 38;
        const isDown = code === 40;
        if (!isDown && !isUp) {
            if (!this.isValidKey(code)) {
                e.preventDefault();
            }
            return;
        }
        const m = this.props.moment;
        if (down) {
            if (isUp) {
                m.minutes(m.minutes() + 1);
            } else if (isDown) {
                m.minutes(m.minutes() - 1);
            }
            this.props.onTimeChange(m);
        }
    }

    isValidKey(code) {
        return (code >= 35 && code <= 40)
            || code === 8
            || code === 9
            || code === 27
            || code === 46
            || code === 144
            || (code >= 48 && code <= 57)
            || (code >= 96 && code <= 105)
            ;
    }

    setHours(e) {
        if (!e || !e.target.value) {
            this.setState({hr: ""});
            return false;
        }
        const m = this.props.moment;
        let number = parseInt(e.target.value, 10);
        if (isNaN(number) || number < 0 || number > 12) {
            return;
        }
        this.setState({hr: number || ""});
        if (!this.state.am) {
            number += 12;
        }
        if (e.target.value.length) {
            m.hours(number);
            this.props.onTimeChange(m);
        }
    }

    setMinutes(e) {
        if (!e || (e.target.value === "")) {
            this.setState({min: ""});
            return;
        }

        const m = this.props.moment;
        let number = parseInt(e.target.value, 10);
        if (isNaN(number) || number < 0 || number > 59) {
            return;
        }
        this.setState({min: number || ""});

        if (e.target.value.length) {
            m.minutes(number);
            this.props.onTimeChange(m);
        }
    }
    changeHours(pos) {
        const m = this.props.moment;
        let number = parseInt(pos.x, 10);
        if (!this.state.am) {
            number += 12;
        }
        m.hours(number);
        this.props.onTimeChange(m);
    }

    changeMinutes(pos) {
        const m = this.props.moment;
        m.minutes(parseInt(pos.x, 10));
        this.props.onTimeChange(m);
    }
}
