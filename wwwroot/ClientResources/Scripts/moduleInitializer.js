define([
    "dojo",
    "dojo/_base/declare",
    "epi/_Module",
    "epi-cms/plugin-area/assets-pane",
    "alloy/Command/SortBlocks",
    "dojo/topic",
    "epi-cms/asset/HierarchicalList"
], function (dojo,
    declare,
    _Module,
    assetPanePluginArea,
    SortBlocks,
    topic,
    HierarchicalList
) {
    return declare("alloy.moduleInitializer", [_Module], {
        initialize: function () {
            this.inherited(arguments);

            // Do any custom module initialization here

            // Add Sort button to the Asset Pane
            assetPanePluginArea.add(SortBlocks);

            // Extend postCreate method for HierarchicalList
            var original = HierarchicalList.prototype.postCreate;
            HierarchicalList.prototype.postCreate = function () {
                // call the original function
                original.apply(this, arguments);

                // subscribe to custom events
                this.own(
                    topic.subscribe("/topic/alloy/sortByDate", function () {
                        this.list.grid._sort = [{ attribute: "created", descending: true }];
                        this.model._selectedTreeItemsSetter(this.model.selectedTreeItems);
                    }.bind(this)),
                    topic.subscribe("/topic/alloy/sortByName", function () {
                        this.list.grid._sort = [{ attribute: "name", descending: false }];
                        this.model._selectedTreeItemsSetter(this.model.selectedTreeItems);
                    }.bind(this))
                );
            }
        }
    });
});
