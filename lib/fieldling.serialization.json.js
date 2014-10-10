module.exports = (function() {
	var jsonSerializer = { 
		contentTypes : [ "application/json", "text/javascript" ],
		serialize : function(data) {
			return JSON.stringify(data);
		},
		deserialize : function(json) {
			return JSON.parse(json);
		}
	}
		
	return jsonSerializer;
}())
