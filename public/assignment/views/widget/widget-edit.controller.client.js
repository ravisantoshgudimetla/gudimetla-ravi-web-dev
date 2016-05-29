(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);
    
    function WidgetEditController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        function init() {
            vm.widget = angular.copy(WidgetService.findWidgetById(vm.wgid));
        }
        init();

        function updateWidget() {
            WidgetService.updateWidget(vm.wgid, vm.widget);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.wgid);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        }
    }
})();