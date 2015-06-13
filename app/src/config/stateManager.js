angular.module('stateManager', [
    'stateHelperServiceProvider',
    'siteModules'
])
    .config(function($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider, stateHelperServiceProvider) {
        $locationProvider.html5Mode(false); //false for gh-pages as .htaccess cannot be configured

        $urlRouterProvider.otherwise(function ($injector, $location) {
            var $state = $injector.get('$state');

            $state.go('app.public.error', {
                title: "Page not found",
                message: 'Could not find a state associated with url "'+$location.$$url+'"',
                url: $location.$$absUrl
            });
        });

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

        //add base state
        $stateProvider
            .state('app', {
                abstract: true
            })
        ;
        // Create state for Default Layout
        $stateProvider
            .state('app.public', {
                abstract: true,
                views: {
                    'app@': { // Points to the ui-view in the index.html
                        templateUrl: 'templates/app/_layouts/default.tpl.html'
                    },
                    'navigation@app.public': { // Points to the ui-view="navigation" in default.tpl.html
                        templateUrl: 'templates/app/_partials/navigation.tpl.html',
                        controller: 'stateManager.navigation.controller'
                    }
                },
                data: {
                    role: 'public'
                }
            })
        ;

        // Loop through each sub-module state and register them
        angular.forEach(stateHelperServiceProvider.getStates(), function(state) {
            $stateProvider.state(state.name, state.options);
        });

    })

    .run(function($rootScope){

    })

    .controller('stateManager.navigation.controller', function($scope, stateHelperService) {

        var navigation = [
            {
                title : 'Home',
                state : 'app.public.home',
                icon: 'home'
            },
            {
                title : 'Features',
                state : 'app.public.features',
                icon: 'rocket',
                children: [
                    {
                        title : 'API',
                        state : 'app.public.features.api',
                        icon: 'cloud'
                    }
                ]
            }
        ];

        $scope.navigation = navigation;

        $scope.childStates = stateHelperService.getChildStates('app.public');

    })
;