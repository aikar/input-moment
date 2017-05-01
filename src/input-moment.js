import autoBind from 'react-autobind';
const cx = require('classnames');
const blacklist = require('blacklist');
const moment = require('moment');
const React = require('react');
const Calendar = require('./calendar').Calendar;
const Time = require('./time').Time;

export class InputMoment extends React.Component {

    constructor(props, ctx) {
        super(props, ctx);

        autoBind(this);
        this.state = {
            tab: 0
        };
    }

    static defaultProps = {
        sideBySide: false,
        prevMonthIcon: 'fa fa-fw fa-chevron-left',
        nextMonthIcon: 'fa fa-fw fa-chevron-right',
        isValid: function (m) {
            return true;
        }
    };

    render() {
        const tab = this.state.tab;
        const m = this.props.moment;
        const props = blacklist(this.props, 'className', 'moment', 'prevMonthIcon', 'nextMonthIcon', 'onChange', 'onSave', 'isValid', 'sideBySide');
        props.className = cx('m-input-moment', this.props.className);

        let sideBySide = this.props.sideBySide;
        return (
            <div {...props}>
                <div className={cx('options', {'side-by-side': sideBySide})}>
                    <button type="button"
                            className={cx('fa fa-calendar im-btn', {'is-active': !sideBySide && tab === 0})}
                            onClick={this.handleClickTab.bind(null, 0)}>
                        Date
                    </button>
                    <button type="button"
                            className={cx('fa fa-clock-o im-btn', {'is-active': !sideBySide && tab === 1})}
                            onClick={this.handleClickTab.bind(null, 1)}>
                        Time
                    </button>
                </div>

                <div className={cx('tabs', {'side-by-side': sideBySide})}>
                    <Calendar
                        className={cx('tab', {'is-active': tab === 0 || sideBySide})}
                        moment={m}
                        onTimeChange={(e) => {
                            this.props.onChange(e);
                        }}
                        prevMonthIcon={this.props.prevMonthIcon}
                        nextMonthIcon={this.props.nextMonthIcon}
                        isValid={this.props.isValid}
                    />
                    <Time
                        className={cx('tab', {'is-active': tab === 1 || sideBySide})}
                        moment={m}
                        onTimeChange={(e) => {
                            this.props.onChange(e);
                        }}
                        isValid={this.props.isValid}
                    />
                </div>

                <button type="button" className="im-btn btn-save fa-check"
                        onClick={this.handleSave}>
                    Save
                </button>
            </div>
        );
    }

    handleClickTab(tab, e) {
        e.preventDefault();
        this.setState({tab: tab});
    }

    handleSave(e) {
        e.preventDefault();
        if (this.props.onSave) this.props.onSave();
    }
}
export default InputMoment;
