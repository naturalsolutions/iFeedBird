define(['marionette', '../layouts/IndexLayout'], function(Marionette, IndexLayout) {

    var HomePageController = Marionette.Controller.extend({
    	
    	initialize: function(options){
			this.mainRegion = options.mainRegion;
		},
        
        homeAction : function(options){
        	this.mainRegion.show(new IndexLayout())
            console.log("homeAction controller")
        }
    });

    return HomePageController;

});