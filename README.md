#groups-of
===========

Divides arrays into groups of a specified cardinality.

[![Build Status](https://secure.travis-ci.org/aheckmann/groups-of.png)](http://travis-ci.org/aheckmann/groups-of)

##Usage

```js
var groupsOf = require('groups-of');
var array = [3,4,5,6,7];

groupsOf(3, array, function (group) {
  console.log('the group is %s', group);
});

// Outputs:
// the group is [3,4,5]
// the group is [6,7]
```

Even works with strings:

```js
var string = "oh say can you say";

groupsOf(8, string, function (group) {
  console.log('the group is %s', group);
})

// Outputs:
// the group is "oh say c";
// the group is "an you s";
// the group is "ay";
```

## install

    npm install groups-of

[LICENSE](https://github.com/aheckmann/sliced/blob/master/LICENSE)
