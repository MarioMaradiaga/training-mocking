var assert = require('assert');
var sinon = require('sinon');
var StringGenerator = require('../src/StringGenerator.js');
var FakeStringGenerator = require('../src/FakeStringGenerator.js');

describe('When using several mocking techniques:', function() {
	// Fakes are whole new objects that replace other objects
	it('Fake', function() {
		var stringGenerator = new FakeStringGenerator();
		assert.equal('I\'m soooo faaaake!!, I\'m a whole new class!!!', stringGenerator.generateString());
	});

	describe('Those that are test doubles:', function() {
		var dummyLogger, stringGenerator;
		before(function() {
			// Dummies are objects that are required for testing but not actually used.
			// This would make much more sense on a compiled language like Java or TypeScript
			// We comment the 
			dummyLogger = {
				log: function() {
					console.log('I\'m supposed to log stuff, but no one will call me so it\'s no biggie')
				}
			}
			stringGenerator = new StringGenerator(dummyLogger);
		})

		// GOTO: Before block
		it('Dummy', function() {
			assert.equal(true, stringGenerator.initialized);
		});

		// Stubs are objects that are normally used for our test to take a certain execution path
		// In this case we'll validate that an exception is thrown when our validatorFunction
		// throws an exception
		it('Stub', function() {
			var options = {
				validator: sinon.stub().throws()
			}
			assert.throws(function() {
				stringGenerator.validate(options);
			}, Error);
		});

		// Spies are objects that are normally used for our test and we need information
		// about if it was called or not.
		it('Spies', function() {
			var options = {
				validator: sinon.spy()
			};
			stringGenerator.validate(options);
			assert.equal(true, options.validator.calledOnce)
		});

		// Mocks are objects that behave like spies but have integrated assertions within them
		it('Mocks', function() {
			var options = {
				validator: function() {
					return true
				}
			};
			var mockValidator = sinon.mock(options);
			stringGenerator.validate(options);
			mockValidator.expects("validator").once();
		});
	});

});