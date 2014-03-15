define(['knockout', 'jquery', 'src/number'], function(ko, $, number) {

  describe('Number', function() {
    var viewModel;
    var input;
    var input2;
    var root;

    // Patch $el.is(':focus') until PhantomJS supports it properly.
    // https://code.google.com/p/phantomjs/issues/detail?id=427

    function fixPhantomJSFocus() {
      var self = this;
      self._jQuery_is = $.fn.is;

      $.fn.is = function(s) {
        if (s === ':focus') {
          return this.get(0) === document.activeElement;
        }
        return self._jQuery_is.apply(this, arguments);
      };
    }

    function makeTargetFormat(value, type) {
      if (type === 'string') return value;
      if (type === 'number') return value * 1;
    }

    before(function() {
      fixPhantomJSFocus();

      root = document.createElement('div');
      root.innerHTML = '<input id="numberInput" type="text" data-bind="number: numeric" /><input id="numberInput2" type="text" data-bind="number: numeric, valueUpdate: \'afterkeydown\'" />';
      document.body.appendChild(root);

      input = $('#numberInput');
      input2 = $('#numberInput2');
    });


    after(function() {
      //restore phantomjs fix in jquery
      $.fn.is = this._jQuery_is;
    });


    function testCase(initValue) {
      var observableTargetType = typeof initValue === 'string' ? 'string' : 'number';
      var type = typeof initValue;

      describe('Init with ' + initValue + ' (' + type + ')', function() {

        beforeEach(function() {
          viewModel = {
            numeric: ko.observable(initValue)
          };
          ko.applyBindings(viewModel, root);
        });

        afterEach(function() {
          ko.cleanNode(root);
        });


        it('strips non digit numbers',
          function() {
            input.val('123abc456');
            input.trigger('change');
            expect(input.val()).to.be('123456');
          });

        it('updates value to observable in original format (' + observableTargetType + ')', function() {
          input.val('a123a4');
          input.trigger('change');
          expect(viewModel.numeric()).to.be(makeTargetFormat('1234', observableTargetType));
        });

        it('change in the observable is reflected in the input', function() {
          viewModel.numeric('500aa');
          expect(input.val()).to.be('500');
        });

        it('change in the observable is reflected in the input only if it do not have focus', function(done) {
          expect(4);
          var obs = viewModel.numeric;

          obs('500');
          input2.focus();
          input2.val('500aa4');
          input2.trigger('keydown');

          expect(input2.is(':focus')).to.be(true);

          setTimeout(function() {
            expect(obs()).to.be(makeTargetFormat('5004', observableTargetType)); //observable should be updated
            expect(input2.val()).to.be('500aa4'); //but input should not be changed before change event
            input2.blur();
            input2.trigger('change');
            expect(input2.val()).to.be('5004'); //now it should have changed
            done();

          }, 1);
        });

        it('change in the observable to a different type than ' + observableTargetType + ' will not affect init behaviour', function() {
          viewModel.numeric(500);
          input.val('a123a4');
          input.trigger('change');
          expect(viewModel.numeric()).to.be(makeTargetFormat('1234', observableTargetType));
        });

        it('works with valueUpdate', function(done) {
          var obs = viewModel.numeric;
          input2.val('ab56aa78--');
          input2.trigger('keydown');
          setTimeout(function() {
            expect(obs()).to.be(makeTargetFormat('5678', observableTargetType));
            done();
          }, 1);
        });

      });
    }

    //Setup the actual tests
    testCase('1234'); //testing when the input is a string
    testCase('abc677agaf32'); //testing when the input is a polluted string
    testCase(123); //when it's a number
    testCase(undefined); //when it's undefinel
    testCase(null); //when it's null

  });
});
