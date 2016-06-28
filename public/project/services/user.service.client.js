(function() {
    angular
        .module("FotoTag")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            login: login,
            //register: register,
            logout: logout,
            checkLoggedin: checkLoggedin,
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            listUsers: listUsers,
            searchUserByImage:searchUserByImage,
            updateFollowing: updateFollowing,
            getFollowers: getFollowers
        };
        return api;
        
        function login(username, password) {
            var url = "/project/api/login";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }
        
        function register(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/project/api/register", user);
        }
        function logout() {
            return $http.post('/project/api/logout');
        }

        function checkLoggedin() {
            return $http.get("/project/api/loggedin");
        }
        
        function createUser(username, password, imageurl, Description) {
            var url = "/project/api/user";
            var user = {
                username: username,
                password: password,
                imageurl: imageurl,
                Description: Description
            };
            return $http.post(url, user);
        }

        function findUserById(userId) {
            var url = "/project/api/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/project/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/project/api/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url="/project/api/user/" + userId;
            return $http.delete(url);
        }

        function listUsers() {
            var url="/project/api/user";
            return $http.get(url);
        }
        
        function searchUserByImage(imageurl){
            url = "/project/user/get_images?imageurl=" + imageurl ;
            //console.log(url);
            return $http.get(url)
        }

        function updateFollowing(uid) {
        var url="/project/homepage/user/" + uid;
        return $http.put(url);
        }
        function getFollowers(uid){
            var url="/project/homepage/user/getfollowing" + uid;
            return $http.put(url);
        }

    }

})();