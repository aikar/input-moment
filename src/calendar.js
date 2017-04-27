import autoBind from 'react-autobind';
const cx = require('classnames');
const blacklist = require('blacklist');
const moment = require('moment');
const React = require('react');
const range = require('lodash/range');
const chunk = require('lodash/chunk');

class Day extends React.Component {
    constructor(props, ctx) {
        super(props, ctx);
        autoBind(this);
    }

    render() {
        const i = this.props.i;
        const w = this.props.w;
        let prevMonth = (w === 0 && i > 7);
        let nextMonth = (w >= 4 && i <= 14);
        const m = moment(this.props.m);
        if (prevMonth) m.subtract(1, 'month');
        if (nextMonth) m.add(1, 'month');
        m.date(i);
        let valid = this.props.isValid(m);

        const props = blacklist(this.props, 'i', 'w', 'd', 'm', 'className', 'isValid');
        props.className = cx({
            'prev-month': prevMonth,
            'next-month': nextMonth,
            'current-day': !prevMonth && !nextMonth && (i === this.props.d),
            'valid': valid,
            'invalid': !valid
        });

        return <td {...props}>{i}</td>;
    }
}
export class Calendar extends React.Component {
    constructor(props, ctx) {
        super(props, ctx);
        autoBind(this);
    }

    render() {
        const m = this.props.moment;
        const d = m.date();
        const d1 = m.clone().subtract(1, 'month').endOf('month').date();
        const d2 = m.clone().date(1).day();
        const d3 = m.clone().endOf('month').date();

        const days = [].concat(
            range(d1 - d2 + 1, d1 + 1),
            range(1, d3 + 1),
            range(1, 42 - d3 - d2 + 1)
        );

        const weeks = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

        return (
            <div className={cx('m-calendar', this.props.className)}>
                <div className="toolbar">
                    <button type="button" className="prev-month" onClick={this.prevMonth}>
                        <i className={this.props.prevMonthIcon}/>
                    </button>
                    <span className="current-date">{m.format('MMMM YYYY')}</span>
                    <button type="button" className="next-month" onClick={this.nextMonth}>
                        <i className={this.props.nextMonthIcon}/>
                    </button>
                </div>

                <table>
                    <thead>
                    <tr>
                        {weeks.map((w, i) => <td key={i}>{w}</td>)}
                    </tr>
                    </thead>

                    <tbody>
                    {chunk(days, 7).map((row, w) => (
                        <tr key={w}>
                            {row.map((i) => (
                                <Day key={i} i={i} d={d} w={w} m={this.props.moment}
                                     isValid={this.props.isValid}
                                     onClick={this.selectDate.bind(null, i, w)}
                                />
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }

    selectDate(i, w) {
        const prevMonth = (w === 0 && i > 7);
        const nextMonth = (w >= 4 && i <= 14);
        const test = moment(this.props.moment);
        if (prevMonth) test.subtract(1, 'month');
        if (nextMonth) test.add(1, 'month');
        test.date(i);
        if (this.props.isValid(test)) {
            const m = this.props.moment;

            m.date(i);
            if (prevMonth) m.subtract(1, 'month');
            if (nextMonth) m.add(1, 'month');

            this.props.onTimeChange(m);
        }
    }

    prevMonth(e) {
        e.preventDefault();
        this.props.onTimeChange(this.props.moment.subtract(1, 'month'));
    }

    nextMonth(e) {
        e.preventDefault();
        this.props.onTimeChange(this.props.moment.add(1, 'month'));
    }
}
