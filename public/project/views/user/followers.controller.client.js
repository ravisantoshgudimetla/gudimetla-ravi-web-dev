(function() {
    angular
        .module("FotoTag")
        .controller("FollowersController", FollowersController);

    function FollowersController($location, $routeParams, UserService, RelationService) {
        var vm = this;
        //vm.updateUser = updateUser;
        //vm.unRegister = unRegister;

        vm.uid = $routeParams["uid"];

        function init() {
            //console.log('hi');
            RelationService
                .getFollowers(vm.uid)
                .then(
                    function (response) {
                        //console.log('hi')
                        vm.userIds = response.data;
                        //console.log(vm.userIds)
                        followerIds = [];
                        for(var i=0; i< vm.userIds.length; i++){
                            var userId = vm.userIds[i];
                            followerIds.push((userId["followerId"][0]));
                        }

                        vm.followerIds = followerIds;
                        users = [];
                        for(var i=0; i< followerIds.length; i++){
                            var followerId = vm.followerIds[i];
                            UserService
                                .findUserById(followerId)
                                .then(function(res){
                                    user = res.data;
                                    users.push(user); 
                                })
                        }
                        vm.users = users;
                        //vm.currentuid = uid
                        //$location.url("/project/api/user/");
                        //vm.test = "hello"
                    },
                    function (error) {
                        vm.error = "User not found";
                    }
                )
        }

        init();
    }
})();
