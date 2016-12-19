'use strict';

describe('Controller: MainCtrl', function () {

  beforeEach(module('tumblrViewerApp'));

  var tumblrService,
    $stateParams,
    scope,
    deferred;


  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    deferred = $q.defer();
    tumblrService = {getUserPosts: function(){return deferred.promise}};
    $stateParams = {username: "jan"};
    $controller('ViewerCtrl as vm', {
      $scope: scope,
      tumblrService: tumblrService,
      $stateParams: $stateParams
    });

  }));

  it('should request for external data for user', function () {
    deferred.resolve({data: "TEST"});
    scope.$apply();
    expect(scope.vm).toBeDefined();
    expect(scope.vm.data).toBe("TEST");
  });

  it('should result in error when request fail', function () {
    deferred.reject("ERROR");
    scope.$apply();
    expect(scope.vm.error).toBe("ERROR");
  });
});
