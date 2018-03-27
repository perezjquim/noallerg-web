sap.ui.define(['sap/m/MessageToast','sap/ui/core/mvc/Controller','sap/ui/model/json/JSONModel',],
	function(MessageToast, Controller, JSONModel) {
	"use strict";

	var PageController = Controller.extend("sapex.menu",
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
	
	function httpGet(theUrl)
	{
	    var xmlHttp = new XMLHttpRequest();
	    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
	    xmlHttp.send( null );
	    return xmlHttp.responseText;
	}
	
	return PageController;

});
