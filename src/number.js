/* jshint boss:true*/
define(['knockout', 'module'], function(ko, module) {
  'use strict';

  var bindingName = module.config().name || 'number';

  function replace(val) {
    return (val || '').replace(/[^\d]/g, '');
  }

  return ko.bindingHandlers[bindingName] = {
    init: function(element, valueAccessor, allBindings) {
      var possibleObservable = valueAccessor();
      var value = ko.utils.unwrapObservable(possibleObservable);
      var type = typeof value;
      var isNumber = type === 'number';
      var updateAsNumber = type !== 'string';

      //listen to change event by default, and any events defined in valueUpdate, space separated string or an array
      var events = ['change'];
      var extraEvents = allBindings().valueUpdate ? ko.utils.unwrapObservable(allBindings().valueUpdate) : [];
      extraEvents = Array.isArray(extraEvents) ? extraEvents : extraEvents.split(' '); //accept an array, or a space separated string of events
      events = events.concat(extraEvents); //we now have all events

      var asyncEvents = []; //what events are async
      var newEvents = [];
      events.forEach(function(e) {
        if (e.indexOf('after') === 0) {
          e = e.substring(5);
          asyncEvents.push(e);
        }
        newEvents.push(e);
      });

      //update the observable, if the original value was a number or undefined, then update it as a number

      function updateObservable(event) {
        var onlyDigits = replace(element.value);
        if (event === 'change') element.value = onlyDigits; //only updte the input itself when the change event is fired
        if (ko.isObservable(possibleObservable)) possibleObservable(updateAsNumber ? onlyDigits === '' ? undefined : parseInt(onlyDigits, 10) : onlyDigits);
      }

      //listen to all events supplied
      $(element).on(newEvents.join(' '), function(e) {
        var type = e.type;
        if (asyncEvents.indexOf(type) !== -1) {
          //asynchronous update
          setTimeout(function() {
            updateObservable(type);
          }, 0);
        } else {
          //synchronous update
          updateObservable(type);
        }
      });

      //if a number just assign the number as it, it will be converted to a string, if not then first strip any non digit values from the beginning
      element.value = isNumber ? value : replace(value);
    },
    update: function(element, valueAccessor) {
      var variable = valueAccessor();
      var value = ko.utils.unwrapObservable(variable);
      var type = typeof value;
      var isNumber = type === 'number';

      //only update input itself if it does not have focus, we don't want altering text before change event
      if (!$(element).is(':focus')) element.value = isNumber ? value : replace(value);
    },

  };
});
