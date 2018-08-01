sap.ui.define([
	"sap/ui/core/UIComponent",
	'sap/ui/model/json/JSONModel',	
	"sap/ui/Device",
	"jquery.sap.global",
	"noallerg/model/models"
], function(UIComponent, JSONModel, Device, $, models) {
	"use strict";

	function httpGet(theUrl)
	{
	    var xmlHttp = new XMLHttpRequest();
	    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
	    xmlHttp.send( null );
	    return xmlHttp.responseText;
	}			

	return UIComponent.extend("noallerg.Component", {

		metadata: {
			manifest: "json"
		},

		init: function() 
		{
			UIComponent.prototype.init.apply(this, arguments);

			var response = httpGet("http://noallerg.x10host.com/markers.php");
			var json = JSON.parse(response);
			var model = new JSONModel(json);
			this.setModel(model);

			this.getRouter().initialize();
		}
	});
});