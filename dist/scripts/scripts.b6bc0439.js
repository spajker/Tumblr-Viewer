"use strict";angular.module("tumblrViewerApp",["ngSanitize","ui.router"]).config(["$qProvider",function(a){a.errorOnUnhandledRejections(!1)}]).config(["$locationProvider","$urlRouterProvider","$stateProvider",function(a,b,c){a.hashPrefix("!"),b.otherwise("/home");var d={templateUrl:"views/menu.html",controllerAs:"vmm"};c.state("home",angular.extend({},d,{url:"/home"})),c.state("browse",{url:"/browse/:username",views:{"":{templateUrl:"views/browse.html"},"menu@browse":d,"viewer@browse":{templateUrl:"views/viewer.html",controller:"ViewerCtrl",controllerAs:"vmv"}}})}]),angular.module("tumblrViewerApp").controller("ViewerCtrl",["tumblrService","$stateParams","$log",function(a,b,c){var d=this;a.getUserPosts(b.username,20).then(function(a){d.error=null,d.data=a.data},function(a){d.error=a})["catch"](function(a){d.error="ERROR",c.error(a)})}]),angular.module("tumblrViewerApp").config(["$sceDelegateProvider",function(a){a.resourceUrlWhitelist(["self","http://**.tumblr.com/api/read/json**"])}]).constant("apiUrl","http://{userName}.tumblr.com/api/read/json?start={start}&num=20").service("tumblrService",["$http","apiUrl",function(a,b){var c="callback";this.getUserPosts=function(d,e){var f=b.replace("{userName}",d).replace("{start}",e);return a.jsonp(f,{jsonpCallbackParam:c})}}]),angular.module("tumblrViewerApp").run(["$templateCache",function(a){a.put("views/browse.html",'<div class="row"> <div class="col-md-3 col-md-push-9"><div ui-view="menu"></div></div> <div class="col-md-9 col-md-pull-3"><div ui-view="viewer"></div></div> </div>'),a.put("views/menu.html",'<div id="menu"> <h3>Tumblr Viewer</h3> <div class="form-group"> <label>Tumblr user name</label> <input type="text" class="form-control" placeholder="" required ng-model="vmm.tumblrUser"> </div> <button type="submit" class="btn btn-default" ui-sref="browse({username: vmm.tumblrUser})">Browse</button> </div>'),a.put("views/viewer.html",'<span ng-if="vmv.error == undefined || vmv.error == null"> <div class="viewer-header"> <h1>{{vmv.data.tumblelog.title}}</h1> <h3>{{vmv.data.tumblelog.name}}</h3> <h4>{{vmv.data.tumblelog.description}}</h4> </div> <div id="posts"> <div ng-repeat="post in vmv.data.posts" class="well well-sm"> <p class="text-right">{{post.date}}</p> <span ng-switch="post.type"> <p ng-switch-when="regular"><span ng-bind-html="post[\'regular-body\']"></span></p> <div ng-switch-when="photo" class="viewer-header"> <img ng-src="{{post[\'photo-url-250\']}}"> <img ng-repeat="photo in post.photos" ng-src="{{photo[\'photo-url-250\']}}" ng-if="$index != 0"> </div> <p ng-switch-default>Click more to see {{post.type}}</p> </span> <p><a ng-href="{{post.url}}" target="_blank">More...</a></p> <p><span ng-repeat="tag in post.tags">#{{tag}} </span></p> </div> </div> </span> <span ng-if="vmv.error != undefined && vmv.error != null"> <div class="alert alert-danger" role="alert"> Error {{vmv.error.status}}. Wrong username or other issue. </div> </span>')}]);