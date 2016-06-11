(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.getTrustedHTML = getTrustedHTML;
        vm.getTrustedURL = getTrustedURL;
        vm.sorted = sorted;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pid)
                .then(
                    function(response) {
                        vm.widgets = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
        init();

        function getTrustedHTML(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getTrustedURL(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function sorted(startIndex, endIndex) {
            WidgetService
                .reorderWidget(vm.pid, startIndex, endIndex)
                .then(
                    function(response) {
                        vm.success = "Reordering successful";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )

        }
    }
})();