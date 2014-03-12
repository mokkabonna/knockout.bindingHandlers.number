define(['vendor/jquery/dist/jquery'], function() {
	var jquery = $; //store original jquery before deleting it from the global namespace
	$.noConflict(true); //delete $ and jQuery from the global namespace
	return jquery; //return jquery to any module that requires it
});
