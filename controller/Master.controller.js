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
			this.getView().setModel(this.getOwnerComponent().getModel());
		},

		onSelectionChange: function(oEvent)
		{
			try
			{
				var index = oEvent
									.getSource()
									._aSelectedPaths[0]
									.replace("/","");

				this.getRouter().navTo("list-detail",
				{
					index: index
				});
			}
			catch(ex) { alert(ex); }
		}
	});
});
