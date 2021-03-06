var a = require('assert')
var im = require('..')

describe('im.array', function(){

	it('freezes arrays on creation if available', function(){
		if ( !Object.freeze ) return

		var arr = im.array()

		arr.x = 3
		a.equal(a.x, undefined)
	})

	describe('.assoc', function(){

		it('should allow a new version to be made with added properties', function(){

			var arr1 = im.array()
				.assoc(1, 'first')
				.assoc({ x: 'x val' })

			var arr2 = arr1.assoc(['a', 'b', 'c'])

			a.equal(arr1.get(1), 'first')
			a.equal(arr1.get('x'), 'x val')
			a.equal(arr1.length, 2)

			a.equal(arr2.get(1), 'b')
		})

		it('should return an im.array', function(){
			a.ok(im.array() instanceof im.array)
		})

		it('shouldn\'t copy over properties on the prototype', function(){
			var F = function(){}
			F.prototype.foo = 'my-val'

			var arr = im.array([1, 2, 3]).assoc(new F)
			a.equal(arr.get('foo'), undefined)
		})
	})

	describe('length', function(){
		it('should get updated to be the largest int + 1', function(){
			var arr1 = im.array([1, 2, 3])
			a.equal(arr1.length, 3)

			var arr2 = arr1.assoc(3, 1)
			a.equal(arr2.length, 4)

			var arr3 = arr1.assoc(4, 1)
			a.equal(arr3.length, 5)

			var arr4 = arr1.assoc(100, 3)
			a.equal(arr4.length, 101)
		})

	})

	describe('.mutable', function(){
		it('should return an array with all properties copied', function(){
			var arr = im.array({ x: 3, 0: 1, 2: 3 }).mutable()

			a.equal(arr[0], 1)
			a.equal(arr[2], 3)
			a.equal(arr.length, 3)

			a.equal(arr.x, 3)
			a.ok(arr instanceof Array)
		})
	})

	describe('.toJSON', function(){
		it('should be an alias for .mutable', function(){
			var arr = im.array()
			a.equal(arr.mutable, arr.toJSON)
		})
	})
})
