module.exports = {


  /**
   * Format a JSON-formatted date into time ago format.
   *
   * @required {String} date   e.g. 138818Z
   * 
   * @return {String}         e.g. "10 days ago"
   */
  getTimeAgo: function (options) {
    var Datetime = require('machinepack-datetime');


    var niceTimeAgoString = Datetime.timeFrom({
      toWhen: Datetime.parse({
        datetime: options.date
      }).execSync(),
      fromWhen: new Date().getTime()
    }).execSync();

    return niceTimeAgoString;
  },

  getHoursMinutesSeconds: function(options) {
    
    var hours = Math.floor(options.totalSeconds/ 60 / 60);
    var minutes = Math.floor(options.totalSeconds / 60 % 60);
    var seconds = options.totalSeconds % 60;

    var hoursMinutesSeconds = hours + 'h ' + minutes + 'm ' + seconds + 's ';

    return {
      hoursMinutesSeconds: hoursMinutesSeconds,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

};