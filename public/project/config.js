(function() {
    angular
        .module("FotoTag")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })

            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
                
            })
            .when("/project/admin/user/:uid", {
                templateUrl: "views/user/userlist.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/project/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }

            })
            .when("/project/home/user/followers/:uid", {
                templateUrl: "views/user/followers.view.client.html",
                controller: "FollowersController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/project/home/user/following/:uid", {
                templateUrl: "views/user/following.view.client.html",
                controller: "FollowingController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/project/home/user/:uid", {
                templateUrl: "views/user/userhome.view.client.html",
                controller: "HomePageController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
                
            })
            .when("/project/user/:uid/search_images", {
                templateUrl: "views/user/image-search.view.client.html",
                controller: "ImageSearchController",
                controllerAs: "model"
            })
            .when("/users", {
                templateUrl: "views/user/userhome.view.client.html",
                controller: "HomePageController",
                controllerAs: "model",
                
            })

            //default route - login
            .otherwise({
                // redirectTo: "views/user/login.view.client.html"
                redirectTo: "/login"
            });

        function checkLoggedIn(UserService, $q, $location, $rootScope) {
            //console.log('hello world');
            var deferred = $q.defer();
            //console.log('hi')
            UserService
                .checkLoggedin()
                .then(
                    function(response) {
                        var user = response.data;
                        if (user == '0') {
                            deferred.reject();
                            $rootScope.currentUser = null;
                            $location.url("/login");
                        }
                        else {
                            $rootScope.currentUser = user;
                            //console.log(user)
                            deferred.resolve();
                        }
                    },
                    function(error) {
                        deferred.reject();
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                );

            return deferred.promise;
        }

    
    }
})();