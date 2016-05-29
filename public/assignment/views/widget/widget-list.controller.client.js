(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);
    
    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.getTrustedHTML = getTrustedHTML;
        vm.getTrustedURL = getTrustedURL;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        
        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
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
    }
})();