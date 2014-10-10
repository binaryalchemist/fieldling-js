module.exports = (function() {
	var jsonSerializer = { 
		serialize : function(data) {
			return JSON.stringify(data);
		}
	}
		
	return jsonSerializer;
}())
