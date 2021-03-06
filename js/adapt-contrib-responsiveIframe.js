/*
* adapt-contrib-responsiveIframe
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Kevin Corry <kevinc@learningpool.com>
*/
define(function(require) {

    var ComponentView = require("coreViews/componentView");
    var Adapt = require("coreJS/adapt");
    var ResponsiveIframe = ComponentView.extend({
    
        events: {
            'inview': 'inview'
        },

        preRender: function() {
            this.listenTo(Adapt, 'device:changed', this.resizeControl);

            this.checkIfResetOnRevisit();
        },

        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        },

        postRender: function() {
            var that = this;
            this.$('.responsiveIframe-iframe').ready(function() {
                that.resizeControl(Adapt.device.screenSize);
                that.setReadyStatus();
            });
        },

        inview: function(event, visible) {
            if (visible && this.model.get('_completion') == "no") {
                this.setCompletionStatus();
            }
            
            else if (visible && this.model.get('_completion') == "yes") {
                window.addEventListener("message", this.receiveMessage.bind(this), false);
                }

        },
        


        receiveMessage: function receiveMessage(event) {
            if (event.origin !== this.model.get('_origin'))
                return;
                this.setCompletionStatus();
            },
        
        localJS: function completeCourse() {
            this.setCompletionStatus();
            console.log("iFrame completed!");
        },

        resizeControl: function(size) {
            console.log("Resize event triggered!");
        }

    });

    Adapt.register("responsiveIframe", ResponsiveIframe);

});
