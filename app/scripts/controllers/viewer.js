'use strict';

angular.module('tumblrViewerApp')
  .controller('ViewerCtrl', ['tumblrService', '$stateParams',
    function(tumblrService, $stateParams){
    var vm = this;
    vm.error;
    tumblrService.getUserPosts($stateParams.username, 20).then(
      function(response){
        vm.error = null;
        vm.data = response.data;
        console.log(response.data);
      },
      function (response) {
        console.log(response);
        vm.error = response;
      }
    ).catch(function(error){
      console.log(error);
      vm.error = response;
    });

  }]);
