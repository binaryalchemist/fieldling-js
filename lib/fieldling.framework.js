(function(express, serializer) {
	var app = express();
	var framework = {};
	
	framework.invoke = function(method, templates, callback) {
		forEach(templates, function (template) {
			app[method](template, function(req, res) {
				var response = mapRequestToCallback(req, callback);
				sendResponse(res, response);
			}); 	
		});
	}
	
	var sendResponse = function(responseSender, responseObject) {
		responseSender.send(serializer.serialize(responseObject));
	}
	
	var mapRequestToCallback = function(request, callback) {
		 var paramNames = getParamNames(callback);
		
		 var paramsCollection = {};
		 
		 forEach(paramNames, function(paramName) {
			 if (paramName == "body") {
				 
			 } else {
				 paramsCollection[paramName] = request.getparam(paramName);
			 }
		 });
	}
	
	var forEach = function(collection, callback) {
		for (var i = 0; i < collection.length; i++) {
			callback(collection[i]);
		}
	}
	
	var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
	var ARGUMENT_NAMES = /([^\s,]+)/g;
	this.getParamNames = function(func) {
	  var fnStr = func.toString().replace(STRIP_COMMENTS, '')
	  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES)
	  if(result === null) { result = []; }
	  return result;
	}
	
	return framework;
} (require('express'), require('fieldling.serialization')))
