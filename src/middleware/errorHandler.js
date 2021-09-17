const { models: { Log } } = require('mongoose');

module.exports = () => {
  return function(err, req, res) {
    const { message, options } = err;
    const logObj = {
      message,
      route: req.originalUrl,
      options,
      date: new Date()
    };
    if(logObj.route && logObj.route.includes('users') && !logObj.route.includes('favicon')) {
      Log.create(logObj)
    }
    res.status(500).json({
      message
    });
  };
};
