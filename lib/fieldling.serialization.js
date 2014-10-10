module.exports = (function() {
	var serialization = { serializers : {} }
	
	serialization.getContentType = function(format) {
		var serializer = getSerializer(format);
		return serializer.contentType;
	}
	
	serialization.serialize = function(format, object) {
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
	
	return serialization;
}())