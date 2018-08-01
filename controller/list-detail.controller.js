sap.ui.define([
	'jquery.sap.global',
	'noallerg/controller/BaseController',
	'sap/m/MessageToast',
	'sap/ui/model/json/JSONModel'
],
	function($, BaseController, MessageToast, JSONModel, index) {
	"use strict";

	return BaseController.extend("noallerg.controller.list-detail",
	{
		onInit: function ()
		{
			this.getRouter()
				.attachRouteMatched(function(oEvent)
				{
					try
					{
						var index = oEvent
												.getParameter("arguments")
												.index;								

						var data = this
											.getOwnerComponent()
											.getModel()
											.getData()
											[index];

						var model = new JSONModel([data]);
						this.getView().setModel(model);						
					}
					catch(ex) { alert(ex); }

			 	}, this);
		}
	});
});
