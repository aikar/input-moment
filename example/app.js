import autoBind from 'react-autobind';
require('../src/less/input-moment.less');
require('./app.less');


const moment = require('moment');
const React = require('react');
const ReactDOM = require('react-dom');
const InputMoment = require('../src/input-moment').InputMoment;
const packageJson = require('../package.json');

class App extends React.Component {
    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            m: moment().add({hours: 13})
        };
        autoBind(this);
    }

    render() {
        return (
            <div className="app">
                <h1>{packageJson.name}</h1>
                <h2>{packageJson.description}</h2>
                <form>
                    <div className="input">
                        <input
                            type="text"
                            value={this.state.m.format('llll')}
                            readOnly
                        />
                    </div>

                    <div className="example">
                        <InputMoment
                            sideBySide
                            moment={this.state.m}
                            onChange={this.handleChange}
                            onSave={this.handleSave}
                            isValid={((date) => {
                                const valid = moment().startOf('day');
                                const test = moment(date.startOf('day'));
                                return test.isSameOrAfter(valid);
                            })}
                            />
                    </div>
                    <div className="example">
                        <InputMoment
                            moment={this.state.m}
                            onChange={this.handleChange}
                            onSave={this.handleSave}
                        />
                    </div>
                </form>
            </div>
        );
    }

    handleChange(m) {
        const now = moment();
        now.add({minute: 1});
        if (m.isBefore(now)) {
            this.setState({m: now});
        } else {
            this.setState({m: m});
        }
    }

    handleSave() {
        console.log('saved', this.state.m.format('llll'));
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
