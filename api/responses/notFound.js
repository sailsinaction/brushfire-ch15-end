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


  // If the requesting user-agent is logged in, we'll look up their user
  // record in the database and provide it to the 404 view as a local(`me`).
  // If the user is not logged in, we don't need to worry about looking up
  // anything.
  (function ifThenFinally (cb){
    
    // If we don't need to take the detour, just keep going to `afterwards()`
    if (!req.session.userId) {
      return cb();
    }

    // Our asynchonous detour:
    User.findOne({ id: req.session.userId }).exec(function(err,user){
      if (err) return cb(err);
      return cb(null, user);
    });

  })(function afterwards(err,loggedInUser){
    if (err) { return res.serverError(err); }

    // If the requesting user-agent is logged in, we'll provide `me`
    // as a local to the 404.ejs view.  Otherwise we'll set it to `null`.
    // (this is so we can render the logged-in navbar state, etc.)
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

    // Build up locals we'll use below:
    // We provide the argument passed in to res.notFound() as `data`
    // and provide the relevant parts of the logged in user record as `me`
    // (if there is no logged in user, set `me: null`)
    var locals = {
      data: data,
      me: me
    };

    // If a view was provided in options, serve it.
    // Otherwise try to guess an appropriate view, or if that doesn't
    // work, just send JSON.
    if (options.view) {
      // As locals, provide the argument passed in to res.notFound() as `data`
      // and provide the relevant parts of the logged in user record as `me`
      // (if there is no logged in user, set `me: null`)
      return res.view(options.view, locals);
    }

    // If no second argument provided, try to serve the default view,
    // but fall back to sending JSON(P) if any errors occur.
    else return res.view('404', locals, function (err, html) {

      // If a view error occured, fall back to JSON(P).
      if (err) {
        //
        // Additionally:
        // • If the view was missing, ignore the error but provide a verbose log.
        if (err.code === 'E_VIEW_FAILED') {
          sails.log.verbose('res.notFound() :: Could not locate view for error page (sending JSON instead).  Details: ',err);
        }
        // Otherwise, if this was a more serious error, log to the console with the details.
        else {
          sails.log.warn('res.notFound() :: When attempting to render error page view, an error occured (sending JSON instead).  Details: ', err);
        }
        return res.jsonx(data);
      }

      return res.send(html);
    });
  });

};

