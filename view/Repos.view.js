jQuery.sap.require("ui5bp.app.config");

sap.ui.jsview("ui5bp.view.Repos", {

	getControllerName : function() {
		return "ui5bp.view.Repos";
	},

	createContent : function(oController) {
        var oListTemplate = new sap.m.ObjectListItem({
            title: "{name}"+" - "+"http://{link}/",
            icon: "sap-icon://goal",
            intro: "{description}"
        });

        var oList = new sap.m.List({});
        oList.bindAggregation("items", "/Repos", oListTemplate);

        var oBtnLaunchpad = new sap.m.Button({
            icon : "sap-icon://home",
            visible : ui5bp.app.config.LaunchpadMode,
            tooltip : "Back to Launchpad",
            press : function(ev) {
                sap.ui.getCore().getEventBus().publish("nav", "back", {id : "Launchpad"});
            }
        });

        return new sap.m.Page({
            title: "Personal repositories",
            showNavButton: "{device>/isPhone}",
            navButtonPress: [oController.doNavBack, oController],
            content: [oList],
            headerContent: [oBtnLaunchpad],
            footer: new sap.m.Bar({})
        });
	}

});
