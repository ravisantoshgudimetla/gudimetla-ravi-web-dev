(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;

        function init() {
                PageService
                    .findPageByWebsiteId(vm.wid)
                    .then(function(response){
                        vm.pages = response.data
                    },
                        function(error){
                            vm.error = error.data;
                        });
        }
        init();
    }
})();



