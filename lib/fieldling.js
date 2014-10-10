module.exports = (function(framework){
	global.GET = function(templates, callback) {
		global.INVOKE("get", templates, callback);
	}
	
	global.POST = function(templates, callback) {
		global.INVOKE("post", templates, callback);
	} 
	
	global.PUT = function(templates, callback) {
		global.INVOKE("put", templates, callback);
	}
	
	global.DELETE = function(templates, callback) {
		global.INVOKE("delete", templates, callback);
	}
	
	global.OPTIONS = function(templates, callback) {
		global.INVOKE("options", templates, callback);
	}
	
	global.PATCH = function(templates, callback) {
		global.INVOKE("patch", templates, callback)
	}
	
	global.INVOKE = function(method, templates, callback) {
		framework.invoke(method.toLowerCase(), templates, callback);
	}
	
	this.setup = function(setupCallback) {
		framework.setup(setupCallback);
	}
}(require("./fieldling.framework.js")))
