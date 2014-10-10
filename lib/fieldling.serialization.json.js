module.exports = (function() {
	var jsonSerializer = { 
		contentType : "application/json",
		serialize : function(data) {
			return JSON.stringify(data);
		}
	}
		
	return jsonSerializer;
}())
