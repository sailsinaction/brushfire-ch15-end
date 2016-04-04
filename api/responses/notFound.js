/**
 * 404 (Not Found) Handler
 *
 * Usage:
 * return res.notFound();
 * return res.notFound(err);
 * return res.notFound(err, 'some/specific/notfound/view');
 *
 * e.g.:
 * ```
 * return res.notFound();
 * ```
 *
 * NOTE:
 * If a request doesn't match any explicit routes (i.e. `config/routes.js`)
 * or route blueprints (i.e. "shadow routes", Sails will call `res.notFound()`
 * automatically.
 */

module.exports = function notFound (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(404);

  // Log error to console
  if (data !== undefined) {
    sails.log.verbose('Sending 404 ("Not Found") response: \n',data);
  }
  else sails.log.verbose('Sending 404 ("Not Found") response');

  // Only include errors in response if application environment
  // is not set to 'production'.  In production, we shouldn't
  // send back any identifying information about errors.
  if (sails.config.environment === 'production') {
    data = undefined;
  }

  // If the user-agent wants JSON, always respond with JSON
  if (req.wantsJSON) {
    return res.jsonx(data);
  }

  // If second argument is a string, we take that to mean it refers to a view.
  // If it was omitted, use an empty object (`{}`)
  options = (typeof options === 'string') ? { view: options } : options || {};

  (function ifThenFinally (cb){
    if (!req.session.userId) {
      return cb();
    }

    User.findOne({ id: req.session.userId }).exec(function(err,user){
      if (err) return cb(err);
      return cb(null, user);
    });

  })(function afterwards(err,loggedInUser){
    if (err) { return res.serverError(err); }

    var me;   
    if (!loggedInUser) {
      me = null;
    }
    else {
      me = {
        email: loggedInUser.email,
        gravatarURL: loggedInUser.gravatarURL,
        username: loggedInUser.username,
        admin: loggedInUser.admin
      };
    }

    var locals = {
      data: data,
      me: me
    };

    if (options.view) {
      return res.view(options.view, locals);
    }
    else return res.view('404', locals, function (err, html) {
      if (err) {
        if (err.code === 'E_VIEW_FAILED') {
          sails.log.verbose('res.notFound() :: Could not locate view for error page (sending JSON instead). Details: ',err);
        }
        else {
          sails.log.warn('res.notFound() :: When attempting to render error page view, an error occured (sending JSON instead). Details: ', err);
        }
        return res.jsonx(data);
      }
      return res.send(html);
    });
  });
};