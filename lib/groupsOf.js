// groupsOf

module.exports = exports = function groupsOf (cardinality, obj, cb) {
  if ('function' != typeof cb) throw new TypeError('invalid callback')
  if (!cardinality) return

  var str = 'string' == typeof obj
    , ret = []
    , card
    , i

  for (i = 0; i < obj.length; ++i) {
    card = i % cardinality

    if (i > 0 && 0 === card) {
      cb(str ? ret.join('') : ret)
      ret = []
    }

    ret[card] = obj[i]
  }

  if (ret.length)
    cb(str ? ret.join('') : ret)
}
