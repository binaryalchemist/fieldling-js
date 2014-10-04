(function(obj2xml, xml2obj) {
	var xmlSerializer = { 
		contentType : "text/xml;application/xml;charset=utf-8", 
		serialize : function(object) {
			return obj2xml(object);
		},
		deserialize : function(xml) {
			return xml2obj(xml);
		}
	}
	
	return xmlSerializer;
}(require('object-to-xml'), require('xml2js')))
