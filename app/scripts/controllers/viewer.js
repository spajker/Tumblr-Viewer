'use strict';

angular.module('tumblrViewerApp')
  .controller('ViewerCtrl', ['tumblrService', '$stateParams', '$log',
    function(tumblrService, $stateParams, $log){
    var vm = this;
    tumblrService.getUserPosts($stateParams.username, 20).then(
      function(response){
        vm.error = null;
        vm.data = response.data;
      },
      function (response) {
        vm.error = response;
      }
    ).catch(function(error){
      vm.error = "ERROR";
      $log.error(error);
    });

  }]);
