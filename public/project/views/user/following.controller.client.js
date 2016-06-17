(function() {
    angular
        .module("FotoTag")
        .controller("FollowingController", FollowingController);

    function FollowingController($location, $routeParams, UserService, RelationService) {
        var vm = this;
        //vm.updateUser = updateUser;
        //vm.unRegister = unRegister;

        vm.uid = $routeParams["uid"];

        function init() {
            //console.log('hi');
            RelationService
                .getFollowing(vm.uid)
                .then(
                    function (response) {
                        //console.log('hi')
                        vm.userIds = response.data;
                        //console.log(vm.userIds)
                        followingIds = [];
                        for(var i=0; i< vm.userIds.length; i++){
                            var userId = vm.userIds[i];
                            followingIds.push((userId["followingId"][0]));
                        }

                        vm.followingIds = followingIds;
                        users = [];
                        for(var i=0; i< followingIds.length; i++){
                            var followerId = vm.followingIds[i];
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
