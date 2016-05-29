(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);
    
    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;

        vm.createWidget = createWidget;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        function createWidget(widgetType) {
            var id = (new Date()).getTime();
            var newWidget = {
                _id: id,
                widgetType: widgetType,
                pageId: vm.pid
            };
            WidgetService.createWidget(vm.pid, newWidget);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + id);
        }
    }
})();