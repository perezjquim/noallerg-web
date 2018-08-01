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
				.getRoute("detail")
				.attachMatched(function(oEvent)
				{
					var path = "/" + oEvent.getParameter("arguments").path;									
          this.getView().bindElement(
          {
                      path: path,
                      model: "markers"
          });

          this.hideBusyIndicator();
			 	}, this);
		}
	});
});
