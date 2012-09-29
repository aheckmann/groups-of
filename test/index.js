
var groupsOf = require('../')
var assert = require('assert')

describe('groups-of', function(){
  it('expors a function', function(){
    assert.equal('function', typeof groupsOf);
  })

  it('expects a callback', function(){
    assert.throws(function () {
      groupsOf()
    }, /invalid callback/)
    assert.doesNotThrow(function () {
      groupsOf(4, [], function(){})
    })
    assert.doesNotThrow(function () {
      groupsOf(4, 'woot', function(){})
    })
  })

  describe('divides into 1 group', function(){
    describe('of arrays', function(){
      it('when group size > length', function(){
        var called = 0;
        var o = [3,5,7,8,9,1,4]

        groupsOf(10, o, function (group) {
          ++called;
          assert.ok(Array.isArray(group));
          assert.equal(7, group.length);
        })

        assert.strictEqual(1, called);
      })

      it('when group size == length', function(){
        var called = 0;
        var o = [3,5,7,8,9,1,4]

        groupsOf(o.length, o, function (group) {
          ++called;
          assert.equal(7, group.length);
          assert.equal(3, group[0]);
          assert.equal(4, group[6]);
        })

        assert.strictEqual(1, called);
      })
    })

    describe('of strings', function(){
      it('when group size > length', function(){
        var called = 0;
        var o = "hello!";

        groupsOf(10, o, function (group) {
          ++called;
          assert.equal('string', typeof group);
          assert.equal(6, group.length);
        })

        assert.strictEqual(1, called);
      })

      it('when group size == length', function(){
        var called = 0;
        var o = "hello!"

        groupsOf(o.length, o, function (group) {
          ++called;
          assert.equal(6, group.length);
          assert.equal('hello!', group);
        })

        assert.strictEqual(1, called);
      })
    })
  })

  describe('divides into 2 groups', function(){
    describe('of arrays', function(){
      it('when group size < array length/2', function(){
        var called = 0;
        var o = [3,5,7,8,9,1,4]

        groupsOf(6, o, function (group) {
          ++called;
          switch (called) {
            case 1:
              assert.equal(6, group.length);
              assert.equal(3, group[0]);
              assert.equal(1, group[5]);
              break;
            case 2:
              assert.equal(1, group.length);
              assert.equal(4, group[0]);
              break;
            default:
              throw new Error('called too many times')
          }
        })

        assert.strictEqual(2, called);
      })
    })
    describe('of strings', function(){
      it('when group size < length/2', function () {
        var called = 0;
        var o = "hello Mars!";

        groupsOf(6, o, function (group) {
          ++called;
          switch (called) {
            case 1:
              assert.equal('hello ', group);
              break;
            case 2:
              assert.equal('Mars!', group);
              break;
            default:
              throw new Error('called too many times')
          }
        })

        assert.strictEqual(2, called);
      })
    })
  })

  describe('divides into 3 groups', function(){
    it('of arrays', function(){
      var called = 0;
      var o = [3,5,7,8,9,1]

      groupsOf(2, o, function (group) {
        ++called;
        assert.equal(2, group.length);
        switch (called) {
          case 1:
            assert.equal(3, group[0]);
            assert.equal(5, group[1]);
            break;
          case 2:
            assert.equal(7, group[0]);
            assert.equal(8, group[1]);
            break;
          case 3:
            assert.equal(9, group[0]);
            assert.equal(1, group[1]);
            break;
          default:
            throw new Error('called too many times')
        }
      })

      assert.strictEqual(3, called);
    })
    it('of strings', function(){
      var called = 0;
      var o = "three groups here";

      groupsOf(6, o, function (group) {
        ++called;
        switch (called) {
          case 1:
            assert.equal(6, group.length);
            assert.equal('three ', group);
            break;
          case 2:
            assert.equal(6, group.length);
            assert.equal('groups', group);
            break;
          case 3:
            assert.equal(5, group.length);
            assert.equal(' here', group);
            break;
          default:
            throw new Error('called too many times')
        }
      })

      assert.strictEqual(3, called);
    })
  })

  it('does not create obscure bugs by reusing the group array', function(){
    var called = 0;
    var o = [3,5,7,8,9,1,4]
    var arr1, arr2;

    groupsOf(4, o, function (group) {
      ++called;

      switch (called) {
        case 1:
          arr1 = group;
          break;
        case 2:
          arr2 = group;
          break;
      }
    })

    assert.notEqual(arr1, arr2)
    assert.equal(4, arr1.length)
    assert.equal(3, arr2.length)
    assert.equal(3, arr1[0]);
    assert.equal(5, arr1[1]);
    assert.equal(8, arr1[3]);
    assert.equal(9, arr2[0]);
    assert.equal(1, arr2[1]);
    assert.equal(4, arr2[2]);
  })
})
