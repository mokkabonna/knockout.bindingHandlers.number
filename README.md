# Number binding for knockout

## Usage

HTML

	<input type="text" data-bind="number : myNumber" >

JS

	ko.applyBindings({
		myNumber : ko.observable()
	});


This binding is written in AMD. Just require it to init it. It will attach itself to knockout globally. No need to require it more than once. It will also return knockout.

	define(['somefolder/number'], function(ko){
		//use knockout
	});

## Behaviour


If the observable on init contains a string then the value inserted into the input will also initially be stripped of any non digit characters. 


When the change event fires on the input, all non digits are stripped and reflected back to the observable. If the original value was a string, the reflected value will also be a string. Empty string when input is empty.

Otherwise it will be converted to a number and put in the observable. If no digits in the input the value will be undefined.


### valueUpdate

This binding supports the valueUpdate binding. If for instance you use afterkeydown the value of the input will immediately be stripped of non digits and updated to the observable. The input will still have the value you typed as long as it has focus.


## Demo

There is a demo html in the repo. demo/index.html

## Dependencies

- knockout
- jquery

For accurate versions check bower.json

## Contributing

Clone, then run (assuming you have node)

    npm install
    grunt bower //this is to install all bower packages

You can now use grunt to run tests, lint etc.

    grunt
