sap.ui.define([
	'jquery.sap.global',
	'noallerg/controller/BaseController',
	'sap/m/Button',
	'sap/ui/model/json/JSONModel'
], function ($,BaseController,Button,JSONModel) {
	"use strict";

	return BaseController.extend("noallerg.controller.Login", 
	{
			onInit: function(evt)
			{
				this.setupEnterListener();				
			},

			onPress: function (evt) 
			{
				const self = this;

				self.showBusyIndicator();

				var user = this.byId("fldUser")
					.getValue();
				
				var pass = this.byId("fldPass")
					.getValue();

				const URL = "http://noallerg.openode.io/markers";
				const HEADERS =
        {
           "Authorization" : "Basic " + btoa(user + ":" + pass),
        };
 
				var model = new JSONModel();
				model.attachRequestCompleted((oEvent)=>
				{
					self.hideBusyIndicator();
					if(oEvent.getParameters().success)
					{
			    	$(document).off('keydown');						
						self.toast("Autenticado com sucesso!");
						self.setGlobalModel(model,"markers");						
						self.navTo("master");					
					}
					else
					{
						self.toast("Credenciais erradas!");						
					}
				});
				model.attachRequestFailed((oEvent)=>
				{
					self.hideBusyIndicator();
					if(oEvent.getParameters().statusCode == "401")
					{
						self.toast("Credenciais erradas!");
					}
					else
					{
						self.toast("Erro no servidor, tente mais tarde!");						
					}
				});						
				model.loadData(URL,null,true,"GET",null,false,HEADERS);
			},

			setupEnterListener : function()
			{
				const ENTER_KEY = 13;
				const self = this;
				$(document).on('keydown',function(e)
				{
			    if(e.keyCode == ENTER_KEY)
			    {
			    	self.onPress();
			    }
				});
			},

	 		httpGet: function (theUrl, callback)
			{
			    var xmlHttp = new XMLHttpRequest();
			    xmlHttp.onreadystatechange = function() { 
			        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			            callback(xmlHttp.responseText);
			    }
			    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
			    xmlHttp.send(null);
			}						
	});
});
