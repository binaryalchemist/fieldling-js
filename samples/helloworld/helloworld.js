(function(fieldling) {
	try {
		GET(["/test"], function() {
			return { message: "hello"};
		});
		
		fieldling.setup(function(app) {
			app.listen(8080);
		});
	} catch(err) {
		console.log(err);
	}
}(require('../../lib/fieldling.js')))