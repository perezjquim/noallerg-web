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

	var router;

	return BaseController.extend("noallerg.controller.loginscreen", 
	{
			onInit: function(evt)
			{
				router = this.getRouter();
			},

			onPress: function (evt) 
			{
				var user = this.byId("fldUser")
					.getValue();
				
				var pass = this.byId("fldPass")
					.getValue();
				
				httpGetAsync("http://noallerg.x10host.com/check_cred.php?user="+user+"&pass="+pass,function(response)
				{
					console.log("response: \""+response+"\"");
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
								if(message == "Sucesso")
								{
									router.navTo("list");
								}
							}
						}),

						stretchOnPhone : true, // boolean, since 1.11.2
						afterClose: function() 
						{
							dialog.destroy();
						}
					});

					dialog.open();
				});
			}
	});

	
	function httpGetAsync(theUrl, callback)
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
