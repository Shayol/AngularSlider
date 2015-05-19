var sliderApp = angular.module('sliderApp', ['ngAnimate']);

sliderApp.factory('sliderService', function(){
  return {
    initialize: function($scope){

      $scope.images = [{
        src: 'img/img1.png',
          id: 1
        }, {
          src: 'img/img2.jpg',
          id: 2
        }, {
          src: 'img/img3.jpg',
          id: 3
        }, {
          src: 'img/img4.png',
          id: 4
        }, {
          src: 'img/img5.png',
          id: 5
        }];

      $scope.shuffle = function(){
          for(var j, x, i = $scope.images.length; i; j = Math.floor(Math.random() * i), x = $scope.images[--i], $scope.images[i] = $scope.images[j], $scope.images[j] = x);
          return $scope.images;
      };

      $scope.next = function() {
          $scope.currentIndex < $scope.images.length - 1 ? $scope.currentIndex++ : $scope.currentIndex = 0;
        };

      $scope.prev = function() {
        $scope.currentIndex > 0 ? $scope.currentIndex-- : $scope.currentIndex = $scope.images.length - 1;
      };
      $scope.setCurrentSlideIndex = function (index) {
          $scope.currentIndex = index;
      };

      $scope.isCurrentSlideIndex = function (index) {
          return $scope.currentIndex === index;
      };
    }
  }
});

sliderApp.controller('SliderR', function($scope, $rootScope, $interval, sliderService) {
  sliderService.initialize($scope);

  var newImage = {src: 'img/img6.jpg', id: 6};

  $scope.add_photo = function(){
    $scope.images.push(newImage);
    };

    //watch for changes of length of images collection and broadcast them to controller SliderL

  $scope.$watchCollection('images', function(newVal, oldValue) {
    if(newVal.length != oldValue.length){
          $rootScope.$broadcast('addImage', newImage);
        }
      });

  $scope.currentIndex = 0; // Initially the index is at the first image

  // timer

  $interval( function(){ $scope.next(); }, 5000);
});

sliderApp.controller('SliderL', function($scope, $timeout, $interval, sliderService) {
  sliderService.initialize($scope);

  // listen for changes in controller SliderR

  $scope.$on('addImage', function(event,data){
    $scope.images.push(data);
  });

  $scope.currentIndex = $scope.images.length - 1;

    // timer

  $interval( function(){ $scope.prev(); }, 5000);
});