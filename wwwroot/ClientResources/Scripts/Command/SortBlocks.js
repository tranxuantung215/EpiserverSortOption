define([
    "dojo/topic",
    "dojo/_base/declare",
    "epi/dependency",
    "epi/shell/command/_Command"
], function (topic, declare, dependency, _Command) {

    return declare([_Command], {

        label: "Sort By Created Date",
        iconClass: "epi-iconSort", //Define your own icon css class here. -> http://ux.episerver.com/#icons
        sortByDate: true,
        constructor: function () {
        },

        _execute: function () {
            if (this.sortByDate === true) {
                this.sortByDate = false;
                this.set("label", "Sort By Name");

                topic.publish("/topic/alloy/sortByDate");
            } else {
                this.sortByDate = true;
                this.set("label", "Sort By Created Date");

                topic.publish("/topic/alloy/sortByName");
            }
        },

        _onModelChange: function () {
            this.set("canExecute", true);
        }
    });
});