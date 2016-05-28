module.exports = {


  /**
   * `DatetimeService.getTimeAgo()`
   * 
   * Build a "time ago" string (e.g. "Less than a minute ago") from the provided JSON-formatted timestamp.
   * This does rely on this server having an up-to-date clock, but it is also timezone-agnostic.
   * 
   * -------------------------------------------------------------------------------------------------------
   * @required {String} date
   *    A JSON-formatted (ISO 8601 datetime string)
   *    e.g. "2016-05-28T22:25:43.516Z"
   * 
   * @returns {String}
   *    A human-readable timeago string.
   *    e.g. "10 days ago"
   * -------------------------------------------------------------------------------------------------------
   * 
   * For reference info on how this works, see:
   *  • http://node-machine.org/machinepack-datetime/parse
   *  • http://node-machine.org/machinepack-datetime/time-from
   */
  getTimeAgo: function (options) {
    var Datetime = require('machinepack-datetime');
  
    var jsTimestamp = Datetime.parse({ datetime: options.date }).execSync();
    var niceTimeAgoString = Datetime.timeFrom({
      toWhen: jsTimestamp
    }).execSync();

    return niceTimeAgoString;
  },


  /**
   * `DatetimeService.getHoursMinutesSeconds()`
   * 
   * Compute additional information about the given number of seconds, including:
   *   • how many hours
   *   • how many minutes
   *   • how many seconds
   *   • a short, human-readable string
   *     (e.g. "2h 30m 10s")
   *  
   * This is useful for interpreting e.g. the play length of a video.
   * -------------------------------------------------------------------------------------------------------
   * @required {Number} totalSeconds
   *    The number of seconds
   *    e.g. 9010
   * 
   * @returns {Dictionary}
   *    @property {String} hoursMinutesSeconds
   *    @property {Number} hours
   *    @property {Number} minutes
   *    @property {Number} seconds
   *   e.g.
   *   ```
   *   {
   *     hoursMinutesSeconds: "2h 30m 10s",
   *     hours: 2,
   *     minutes: 30,
   *     seconds: 10
   *   }
   *   ```
   * -------------------------------------------------------------------------------------------------------
   */
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
