module.exports = {
  init: init,
  home: home,
}

function init(opts) {
  logger = opts.logger
}

function home(req, res, next) {
  res.redirect(302, 'https://github.com/kingnebby/hymnal-api')
  next()
}