(function() {
    angular
        .module("FotoTag")
        .controller("ImageSearchController", ImageSearchController);

    function ImageSearchController($location, $routeParams,$http) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        //vm.selectPhoto = selectPhoto;
        var uid = $routeParams["uid"];
        

        function searchPhotos(imageurl) {
            url = "/project/user/get_images?imageurl=" + imageurl ;
            console.log(url);
            vm.users = $http.get(url)

        }

        
    }
})();