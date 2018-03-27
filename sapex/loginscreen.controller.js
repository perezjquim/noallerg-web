sap.ui.define(['sap/m/MessageToast','sap/ui/core/mvc/Controller','sap/m/Dialog', 'sap/m/Button', 'sap/m/Text'],
	function(MessageToast, Controller, Dialog, Button, Text) {
	"use strict";

	var PageController = Controller.extend("sapex.loginscreen", {

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
									var app = sap.ui.getCore()
										.byId("app");
									
									app.removeAllPages();
									var pgMenu = sap.ui.view({id: "menu" , viewName:"sapex.menu", type:sap.ui.core.mvc.ViewType.XML});
									app.addPage(pgMenu);	
								}
							}
						}),
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
	
	return PageController;

});
