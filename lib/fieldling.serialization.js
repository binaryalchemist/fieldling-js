(function() {
	var serialization = {};
	var serializers = {};
	
	serialization.getContentType = function(format) {
		var serializer = getSerializer(format);
		return serializer.contentType;
	}
	
	serialization.serialize = function(format, object) {
		var serializer = getSerializer(format);
		return serializer.serialize(data);
	}
	
	serialization.deserialize = function(format, data) {
		var serializer = getSerializer(format);
		return serializer.deserialize(data);
	}
	
	function getSerializer(format) {
		var serializer = serializers[format];
		
		if (!serializer) {
			throw 'No serializer found for format ' + format;
		}
		
		return serializer;
	}
	
	serialization.map = function(format, serializer) {
		serializers[format] = serializer;
	}
	
	return serialization;
}())