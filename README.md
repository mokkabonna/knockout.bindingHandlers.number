# Number binding for knockout

## Usage

HTML

	<input type="text" data-bind="number : myNumber" >

JS

	ko.applyBindings({
		myNumber : ko.observable()
	});


This binding is written in AMD. Just require it to init it. It will attach itself to knockout globally. No need to require it more than once.

	define(['somefolder/number'])

## Behaviour


If the observable on init contains a string then the value inserted into the input will also initially be stripped of any non digit characters. 


When the change event fires on the input, all non numerical characters are stripped and reflected back to the observable. If the original value was a string, the reflected value will also be a string.

If the observable was a number or undefined, then the value inserted in the observable after a change will be parsed to a number. (Or set to undefined if the input is empty);



## Contributing

Clone, then run (assuming you have node)

    npm install

You can now use grunt to run tests, lint etc.

    grunt
