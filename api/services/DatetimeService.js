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
  }

};