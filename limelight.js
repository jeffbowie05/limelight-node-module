// Crypto functionality for LL API.
var CryptoJS = require('crypto-js');

exports.LLAuthenticateRequest = function( host, url_path, access_key, secret, params ) {
	
	var str_to_sign = 'get' + '|' + host + '|' + url_path + '|';
	// strtolower
	str_to_sign.toLowerCase();
	
	var url = host + url_path + '?';
	
	if ( params == null ) var params = [];
	
	if ( !("expires" in params ) ) params['expires'] = new Date().getTime() + 300;
	params['access_key'] = access_key;
	
	var keys = Object.keys(params);
	keys.sort();
	
	for ( var prop in keys ) {
		
		str_to_sign += keys[prop] + '=' + params[keys[prop]] + '&';
		url += encodeURIComponent( keys[prop] ) + '=' + encodeURIComponent( params[keys[prop]] ) + '&';
		
	}
	
	if ( str_to_sign.substring( str_to_sign.length, str_to_sign.length - 1)  == '&' ) {
		
		str_to_sign = str_to_sign.substring(0, str_to_sign.length - 1 );
		
	}
	
	var hash = CryptoJS.HmacSHA256(str_to_sign, secret);
	var signature = CryptoJS.enc.Base64.stringify(hash);

	url += 'signature=' + encodeURIComponent(signature);
	
	return url;
	
}