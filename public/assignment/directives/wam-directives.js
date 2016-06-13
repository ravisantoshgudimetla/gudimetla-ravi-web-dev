(function() {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        function linker(scope, element, attributes) {
            var data = scope.data;
            var startIndex = -1;
            var endIndex = -1;

            $(element)
                .sortable({
                    axis: 'y',
                    start: function(event, ui) {
                        startIndex = ui.item.index();
                        console.log("hi")
                    },
                    stop: function (event, ui) {
                        endIndex = ui.item.index();
                        var sortedElement = scope.data.splice(startIndex, 1)[0];
                        scope.data.splice(endIndex, 0, sortedElement);
                        scope.$apply();
                        scope.reorder({start: startIndex, end: endIndex});
                    }
                });
                //.draggable();
        }
        return {
            scope: {
                data: "=",
                reorder: "&sorted"

            },
            link: linker
        }

    }
})();