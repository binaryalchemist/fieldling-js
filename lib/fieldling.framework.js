(function(express, objectMerger, serialization, jsonSerializer, xmlSerializer) {
	var app = express();
	var framework = { serialization : serialization }
	
	framework.invoke = function(method, templates, callback) {
		forEach(templates, function (template) {
			app[method](template, function(req, res) {
				var response = mapRequestToCallback(req, callback);
				sendResponse(res, response);
			}); 	
		});
	}
	
	function sendResponse(responseSender, responseObject) {
		var format = "json";
		responseSender.send(serialization.serialize(format, responseObject));
	}
	
	function mapRequestToCallback(request, callback) {
		var parameterizedValues = objectMerger(request.params, request.query, request.body);
		return callback(parameterizedValues, request);
	}
	
	function forEach(collection, callback) {
		for (var i = 0; i < collection.length; i++) {
			callback(collection[i]);
		}
	}
	
	framework.setup = function(setupCallback) {
		setupCallback(app, framework.serialization);
		
		if (!framework.serialization.json && !framework.serializer.JSON) {
			framework.serialization.json = framework.serialization.JSON = jsonSerializer;
		}
		
		if (!framework.serialization.xml && !framework.serializer.XML) {
			framework.serialization.xml = framework.serialization.XML = xmlSerializer;
		}
	}
	
	return framework;
} (
		require('express'), 
		require('merge'), 
		require('fieldling.serialization'), 
		require('fieldling.serialization.json'), 
		require('fieldling.serialization.xml')
	)
)
