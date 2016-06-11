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

        function createWidget(type) {
            var newWidget = {
                type: type,
                _page: vm.pid
            };
            WidgetService
                .createWidget(vm.pid, newWidget)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + response.data._id);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }
    }
})();