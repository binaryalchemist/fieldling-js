module.exports = (function(obj2xml, xml2obj) {
	var xmlSerializer = { 
		contentType : "application/xml",
		serialize : function(object) {
			return obj2xml(object);
		}
	}
	
	return xmlSerializer;
}(require('object-to-xml'), require('xml2js')))
