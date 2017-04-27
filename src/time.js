import autoBind from 'react-autobind';
const cx = require('classnames');
const React = require('react');
const InputSlider = require('react-input-slider');

export class Time extends React.Component {
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
                    <span className="time"><input onChange={this.setHours} value={this.state.hr}/></span>
                    <span className="seperator">:</span>
                    <span className="time"><input onChange={this.setMinutes} value={this.state.min}/></span>
                    <span className="seperator"> </span>
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
    }

    componentWillReceiveProps(props) {
        this.setState({
            am: props.moment.hour() < 12,
            hr: props.moment.format('h'),
            min: props.moment.format('mm')
        });
    }

    setHours(e) {
        if (!e || !e.target.value) {
            this.setState({hr: ""});
            return false;
        }
        const m = this.props.moment;
        let number = parseInt(e.target.value, 10);
        if (number < 0 || number > 12) {
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
        if (!e) {
            return;
        }
        const m = this.props.moment;
        let number = parseInt(e.target.value, 10);
        if (number < 0 || number > 59) {
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
