# input-moment-ex
FORKED FROM [https://github.com/wangzuo/input-moment]

React datetime picker powered by [momentjs](http://momentjs.com)

The design is from https://dribbble.com/shots/1439965-Due-Date-and-Time-Picker.


## Changes in this version of input-moment
 - Added isValid support based on [https://github.com/wangzuo/input-moment/pull/17]
 - Added a sideBySide boolean property to show the time picker beside the date picker
 - Changed icons to use font-awesome instead of ion.
 - Updated lodash

### Installation
``` sh
npm i input-moment-ex --save
```

**Notice:** This module requires [moment](https://www.npmjs.com/package/moment) as a [peerDependency](https://docs.npmjs.com/files/package.json#peerdependencies).

### Demo
http://aikar.github.io/input-moment

### Usage
``` javascript
<InputMoment
  moment={this.state.moment}
  onChange={this.handleChange}
  onSave={this.handleSave}
  sideBySide
  isValid={(date) => {
      return date.isAfter(moment());
  }}
  prevMonthIcon="ion-ios-arrow-left" // default
  nextMonthIcon="ion-ios-arrow-right" // default
/>
```
Check [app.js](https://github.com/aikar/input-moment-ex/blob/master/example/app.js) for a working example.

### Development
- npm install
- npm start
- http://localhost:8888

### License
ISC
