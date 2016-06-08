(function() {
    angular
        .module("FotoTag")
        .controller("ImageSearchController", ImageSearchController);

    function ImageSearchController($location, $routeParams,$http) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        //vm.selectPhoto = selectPhoto;

        

        function searchPhotos(imageurl) {
            url = "/project/user/:userId/search_images?imageurl=" + imageurl ;
            vm.users = $http.get(url)

        }

        
    }
})();