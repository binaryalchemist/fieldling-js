var fieldling = (function (express, bodyParser, xmlBodyParser, objectMerger, obj2xml) {
	this.serialization = (function() {
		this.serializers = { 
			json : { 
				contentType : "application/json",
				serialize : function(data) { return JSON.stringify(data);}
			},
			xml : { 
				contentType : "application/xml",
				serialize : function(object) { return obj2xml(object);}
			}		
		};	
		
		this.getContentType = function(format) {
			var serializer = getSerializer(format);
			return serializer.contentType;
		}
		
		this.serialize = function(format, data) {
			var serializer = getSerializer(format);
			return serializer.serialize(data);
		}
		
		function getSerializer(format) {
			var serializer = serialization.serializers[format];
			
			if (!serializer) {
				throw 'No serializer found for format ' + format;
			}
			
			return serializer;
		}
		
		return this;
	}(obj2xml))		
	
	var app = express();

	function matchType(request) {
		for (var format in framework.serialization.serializers) {
			if (request.is(format) || request.accepts(format)) {
				return format;
			}
		}
	}
	
	this.onRestCall = function(method, templates, callback) {
		templates.forEach(function (template) {
			app[method](template, function(req, res) {
				var format = matchType(req);
				
				if (!format){
					responseSender.status(400).send("Bad Request");
				}
				
				var responseObject = mapRequestToCallback(req, callback);
				res.set('Content-Type', serialization.getContentType(format));
				res.end(serialization.serialize(format, responseObject));
			}); 	
		});
	}
	
	function mapRequestToCallback(request, callback) {
		var parameterizedValues = objectMerger(request.params || {}, request.query || {}, request.body || {});
		return callback(parameterizedValues, request);
	}
	
	this.setup = function(setupCallback) {
		setupCallback(app, this.serialization);
		app.use(bodyParser.json());
		app.use(xmlBodyParser());		
	}
	
	this.init = function(expressApp) {
		app = expressApp;
	}
	
	return this;
} (
		require('express'), 
		require('body-parser'), 
		require('express-xml-bodyparser'), 
		require('merge'), 
		require('object-to-xml')))


global.GET = function(templates, callback) {
	fieldling.onRestCall("get", templates, callback);
}

global.POST = function(templates, callback) {
	fieldling.onRestCall("post", templates, callback);
} 

global.PUT = function(templates, callback) {
	fieldling.onRestCall("put", templates, callback);
}

global.DELETE = function(templates, callback) {
	fieldling.onRestCall("delete", templates, callback);
}

global.OPTIONS = function(templates, callback) {
	fieldling.onRestCall("options", templates, callback);
}

global.PATCH = function(templates, callback) {
	fieldling.onRestCall("patch", templates, callback);
}

fieldling.createResource = function(resourceName) {
	this.name = resourceName;
	
	this.query = function(callback) {
		global.GET(["/" + this.name], function(obj, req) {
			return callback(req.query, obj, req);
		});
	}
	
	this.getById = function(callback) {
		global.GET(["/" + this.name + "/:id"], function(obj, req) {
			return callback(obj.id, obj, req);
		});
	}
	
	this.getByMultipleIds = function(callback) {
		global.GET(["/" + this.name + "/:ids"], function(obj) {
			return callback(obj.id.split(','), obj, req);
		});
	}
	
	this.create = function(callback) {
		global.POST(["/" + this.name], function(obj, req) {
			
		});
	}
	
	this.update = function(callback) {
		global.PATCH(["/" + this.name + "/:id"], function(obj, req) {
			
		});
	}
	
	this.deleteById = function(callback) {
		global.DELETE(["/" + this.name + "/:id"], function(obj, req) {
			return callback(obj.id, obj, req);
		});
	}
	
	this.deleteByMultipleIds = function(callback) {
		global.DELETE(["/" + this.name + "/:ids"], function(obj) {
			return callback(obj.id.split(','), obj, req);
		});
	}
	
	return this;
}

module.exports = fieldling;