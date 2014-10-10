module.exports = (function(express, objectMerger, serialization, jsonSerializer, xmlSerializer) {
	var app = express();
	var framework = { serialization : serialization }
	
	framework.invoke = function(method, templates, callback) {
		forEach(templates, function (template) {
			app[method](template, function(req, res) {
				var response = mapRequestToCallback(req, callback);
				sendResponse(req, res, response);
			}); 	
		});
	}
	
	function sendResponse(request, responseSender, responseObject) {
		var format = matchType(request);
		if (!format){
			responseSender.status(400).send("Bad Request");
		}
		
		responseSender.send(serialization.serialize(format, responseObject));
	}
	
	function matchType(request) {
		for (var format in framework.serialization.serializers) {
			if (request.is(format) || request.accepts(format)) {
				return format;
			}
		}
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
		
		var serializers = framework.serialization.serializers;
		
		if (!serializers.json && !serializers.JSON) {
			serializers.json = serializers.JSON = jsonSerializer;
		}
		
		if (!serializers.xml && !serializers.XML) {
			serializers.xml = serializers.XML = xmlSerializer;
		}
	}
	
	return framework;
} (
		require('express'), 
		require('merge'), 
		require('./fieldling.serialization.js'),
		require('./fieldling.serialization.json.js'), 
		require('./fieldling.serialization.xml.js')
	)
)
