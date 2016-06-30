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
                        console.log(vm.uid)
                        vm.user = response.data;
                        console.log(vm.user);
                        vm.checkUserExists = "true";
                    },
                    function(error){
                        vm.error = "User not found";
                    }
                )
        }
    }
})();