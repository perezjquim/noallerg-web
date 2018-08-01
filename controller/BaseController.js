sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/m/MessageToast',
	"sap/ui/core/UIComponent",
	"sap/ui/core/BusyIndicator"	
], function (Controller, MessageToast, UIComponent, BusyIndicator) {
	"use strict";

	return Controller.extend("noallerg.controller.BaseController", 
	{
		/* ROUTING-RELATED STUFF */
		getRouter: function ()
		{
			return UIComponent.getRouterFor(this);
		},
		navTo : function (destination,args,noHistory)
		{
			this.showBusyIndicator();
			this.getRouter().navTo(destination,args,noHistory);
			this.hideBusyIndicator();
		},

		/* MODEL-RELATED STUFF */
		getModel: function (sName)
		{
			return this.getView().getModel(sName);
		},
		setModel: function (oModel, sName)
		{
			return this.getView().setModel(oModel, sName);
		},
		getGlobalModel: function (sName)
		{
			return this.getOwnerComponent().getModel(sName);
		},
		setGlobalModel: function (oModel,sName)
		{
			return this.getOwnerComponent().setModel(oModel, sName);
		},

		/* BUSY INDICATOR-RELATED STUFF */
		showBusyIndicator: function()
		{
			BusyIndicator.show();
		},
		hideBusyIndicator: function()
		{
			BusyIndicator.hide();
		},

		/* TOAST MESSAGES */
		toast: function(msg)
		{
			MessageToast.show(msg);
		}
	});
});