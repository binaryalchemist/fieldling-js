(function(framework){
	function GET(templates, callback) {
		INVOKE("get", templates, callback);
	}
	
	function POST(templates, callback) {
		INVOKE("post", templates, callback);
	} 
	
	function PUT(templates, callback) {
		INVOKE("put", templates, callback);
	}
	
	function DELETE(templates, callback) {
		INVOKE("delete", templates, callback);
	}
	
	function OPTIONS(templates, callback) {
		INVOKE("options", templates, callback);
	}
	
	function PATCH(templates, callback) {
		INVOKE("patch", templates, callback)
	}
	
	function INVOKE(method, templates, callback) {
		framework.invoke(method.toLowerCase(), templates, callback);
	}
}(require("fieldling.framework")))
