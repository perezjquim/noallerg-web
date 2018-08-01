sap.ui.define([
	'jquery.sap.global',
	'noallerg/controller/BaseController',
	'sap/m/MessageToast',
	'sap/m/Dialog', 
	'sap/m/Button', 
	'sap/m/Text'
], function (
	$,
	BaseController,
	MessageToast,
	Dialog,
	Button,
	Text) {
	"use strict";

	return BaseController.extend("noallerg.controller.loginscreen", 
	{
			onInit: function(evt)
			{
				this.setupEnterListener();
				var oModel = this.getOwnerComponent().getModel("meta");
				oModel.read("/Customers('ALFKI')",null,null,true,
						function(data) 
						{
								alert();
								var oModelCheckpoint = new sap.ui.model.json.JSONModel();
                oModelCheckpoint.setData(data);
				    },
				    function(err) 
				    {
				    		alert(err);
				    });				
							
			},

			onPress: function (evt) 
			{
				const controller = this;

				var user = this.byId("fldUser")
					.getValue();
				
				var pass = this.byId("fldPass")
					.getValue();

				this.httpGetAsync("http://noallerg.x10host.com/check_cred.php?user="+user+"&pass="+pass,function(response)
				{
					var message = "";
					switch(response)
					{
						case "":
							message = "Insucesso";
							break;
						
						case "falta user e pass":
							message = "Faltou username ou password";
							break;
							
						default:
							message = "Sucesso";
							break;
					}
					var dialog = new Dialog(
					{
						title: 'Login',
						type: 'Message',
							content: new Text(
							{
								text: message
							}),
						beginButton: new Button(
						{
							text: 'OK',
							press: function () 
							{
								dialog.close();
							}
						}),

						stretchOnPhone : false, // boolean, since 1.11.2
						afterClose: function() 
						{
							dialog.destroy();		
							if(message == "Sucesso")
							{
								controller.getRouter().navTo("list",{index:0});
							}
							else
							{
								controller.setupEnterListener();
							}							
						}
					});

					dialog.open();
				});
			},

			setupEnterListener : function()
			{
				const ENTER_KEY = 13;
				const controller = this;
				$(document).on('keydown',function(e)
				{
			    if(e.keyCode == ENTER_KEY)
			    {
			    	controller.onPress();
			    	$(document).off('keydown');
			    }
				});
			},

	 		httpGetAsync : function (theUrl, callback)
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
