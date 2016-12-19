'use strict';

angular.module('tumblrViewerApp')
  .config(['$sceDelegateProvider', function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://**.tumblr.com/api/read/json**'
    ]);
  }])
  .constant('apiUrl', 'http://{userName}.tumblr.com/api/read/json?start={start}&num=20')
  .service('tumblrService', function ($http, apiUrl) {
    var callbackName = 'callback';
    this.getUserPosts = function (userName, start) {
      var url = apiUrl.replace('{userName}', userName)
        .replace('{start}', start);
      return $http.jsonp(url, {jsonpCallbackParam: callbackName});
    };
  });
