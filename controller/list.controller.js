sap.ui.define([
	'jquery.sap.global',
	'noallerg/controller/BaseController',
	'sap/m/MessageToast',
	'sap/ui/model/json/JSONModel'
],
	function($, BaseController, MessageToast, JSONModel) {
	"use strict";

	function httpGet(theUrl)
	{
	    var xmlHttp = new XMLHttpRequest();
	    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
	    xmlHttp.send( null );
	    return xmlHttp.responseText;
	}

	return BaseController.extend("noallerg.controller.list",
	{
		onInit: function () 
		{
			var response = httpGet("http://noallerg.x10host.com/markers.php");
			console.log("response: \""+response+"\"");
			var json = JSON.parse(response);
			var model = new JSONModel(json);
			this.getView().setModel(model);
		}
	});
});
