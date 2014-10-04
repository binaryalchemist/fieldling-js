(function() {
	var jsonSerializer = { 
		contentType : "application/json;text/javascript;charset=utf-8",
		serialize : function(data) {
			return JSON.stringify(data);
		},
		deserialize : function(json) {
			return JSON.parse(json);
		}
	}
		
	return jsonSerializer;
}())
