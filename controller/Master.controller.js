sap.ui.define([
	'jquery.sap.global',
	'noallerg/controller/BaseController',
	'sap/m/MessageToast',
	'sap/ui/model/json/JSONModel'
],
	function($, BaseController, MessageToast, JSONModel) {
	"use strict";

	return BaseController.extend("noallerg.controller.Master",
	{
		onInit: function ()
		{
			//
		},

		onSelectionChange: function(oEvent)
		{
			this.showBusyIndicator();

			var item = oEvent.getSource();
			var path = item.getBindingContext("markers").getPath().substr(1);
			this.getRouter().navTo("detail",{ path: path });
		}
	});
});
