(function(fieldling) {
	try {
		var resource = fieldling.createResource('tests');
		
		resource.getMulti(function() { return [ { message : 'hello world' } ] });
		resource.getById(function(id) { return { message : 'hello world ' + r.id } })
		resource.getByIds(function(ids) {
			var results = [];
			ids.forEach(function(id) {
				results.push({ message : 'hello world ' + id });
			});
			
			return results;
		});
		
		fieldling.setup(function(app) {
			app.listen(8080);
		});
	} catch(err) {
		console.log(err);
	}
}(require('../../')))