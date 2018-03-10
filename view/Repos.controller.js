sap.ui.controller("ui5bp.view.Repos", {

    onInit: function() {
        this.getView().setModel(new sap.ui.model.json.JSONModel("model/repos.json"));
        this.bus = sap.ui.getCore().getEventBus();
    },

    doNavBack: function(event) {
        this.bus.publish("nav", "back");
    }    

});
