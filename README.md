# Number binding for knockout

[![Build status](https://travis-ci.org/mokkabonna/knockout.bindingHandlers.number.png)](https://travis-ci.org/mokkabonna/knockout.bindingHandlers.number)

## Usage

HTML

    <input data-bind="number: myobs" >

JS

    ko.applyBindings({
        myobs : ko.observable()
    });


This binding is written in AMD. It returns the binding object. It will attach itself to `knockout.bindingHandlers.number` once required for the first time. This can be overridden with a config section in your requirejs config like shown below.

```
requirejs.config({
    config: {
        'bower_components/knockout.bindingHandlers.number/src/number': {
            name: 'someOtherName'
    }
});
```

## Behaviour


If the observable on init contains a string then the value inserted into the input will also initially be stripped of any non digit characters.


When the change event fires on the input, all non digits are stripped and reflected back to the observable. If the original value was a string, the reflected value will also be a string. Empty string when input is empty.

Otherwise it will be converted to a number and put in the observable. If no digits in the input the value will be undefined.


### valueUpdate

This binding supports the valueUpdate binding. If for instance you use afterkeydown the value of the input will immediately be stripped of non digits and updated to the observable. The input will still have the value you typed as long as it has focus.


## Demo

There is a demo at http://mokkabonna.github.io/knockout.bindingHandlers.number

## Dependencies

- knockout
- jquery

For accurate versions check bower.json

## Contributing

Clone, then run (assuming you have node)

    npm install & bower install

You can now use grunt develop for a ready made watch task for development. Tests, linting..

    grunt develop
