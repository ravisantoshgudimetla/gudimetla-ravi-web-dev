(function() {
    angular
        .module("FotoTag")
        .controller("ImageSearchController", ImageSearchController);

    function ImageSearchController($location, $routeParams,UserService) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        //vm.selectPhoto = selectPhoto;
        vm.uid = $routeParams["uid"];
        

        function searchPhotos(imageurl) {
           UserService
               .searchUserByImage(imageurl)
                .then(
                    function(response){
                        vm.user = response.data;
                    },
                    function(error){
                        vm.users = "User not found"
                    }
                )
        }
    }
})();