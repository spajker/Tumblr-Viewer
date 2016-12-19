'use strict';

angular
  .module('tumblrViewerApp', [
    'ngSanitize',
    'ui.router'
  ])
  .config(['$locationProvider', '$urlRouterProvider', '$stateProvider',
    function ($locationProvider, $urlRouterProvider, $stateProvider) {
      $locationProvider.hashPrefix('!');

      $urlRouterProvider.otherwise('/home');

      var homeState = {
        templateUrl: 'views/menu.html',
        controllerAs: 'vmm'
      };

      $stateProvider.state('home',
        angular.extend({}, homeState, {
          url: '/home'
        }));

      $stateProvider.state('browse', {
        url: '/browse/:username',
        views: {
          '': {
            templateUrl: 'views/browse.html'
          },
          'menu@browse': homeState,
          'viewer@browse': {
            templateUrl: 'views/viewer.html',
            controller: 'ViewerCtrl',
            controllerAs: 'vmv'
          }
        }
      });
    }]);
