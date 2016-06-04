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
            WidgetService
                .findWidgetById(vm.wgid)
                .then(
                    function(response) {
                        vm.widget = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
        init();

        function updateWidget() {
            WidgetService
                .updateWidget(vm.wgid, vm.widget)
                .then(
                    function(response) {
                        vm.success = "Widget successfully updated";
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.wgid)
                .then(
                    function(response) {
                        vm.success = "Widget successfully deleted";
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
    }
})();