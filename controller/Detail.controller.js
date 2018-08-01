sap.ui.define([
	'jquery.sap.global',
	'noallerg/controller/BaseController',
	'sap/m/MessageToast',
	'sap/ui/model/json/JSONModel'
],
	function($, BaseController, MessageToast, JSONModel) {
	"use strict";

	return BaseController.extend("noallerg.controller.Detail",
	{
		onInit: function ()
		{
			this.getRouter()
				.getRoute("Detail")
				.attachMatched(function(oEvent)
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
