var sliderApp = angular.module('sliderApp', ['ngAnimate']);

sliderApp.service('imageService', function() {
  var images = [{
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

  var addImage = function(newObj) {
      images.push(newObj);
  };

  var getImages = function(){
      return images;
  };

  return {
    addImage: addImage,
    getImages: getImages
  };

});

sliderApp.controller('SliderR', function($scope, $timeout, imageService) {
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

  $scope.add_photo = function(){
    imageService.addImage({src: 'img/img6.jpg', id: 6});
    $scope.images.push({src: 'img/img6.jpg', id: 6});
    };

  $scope.shuffle = function(){
      for(var j, x, i = $scope.images.length; i; j = Math.floor(Math.random() * i), x = $scope.images[--i], $scope.images[i] = $scope.images[j], $scope.images[j] = x);
      return $scope.images;
  };


  $scope.currentIndex = 0; // Initially the index is at the first image

    //slide navigation

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

    //timer

    var timer;
    var sliderFunc = function() {
      timer = $timeout(function() {
        $scope.next();
        timer = $timeout(sliderFunc, 5000);
      }, 5000);
    };

    sliderFunc();

    $scope.$on('$destroy', function() {
      $timeout.cancel(timer); // when the $scope is getting destroyed, cancel the timer
    });
});

sliderApp.controller('SliderL', function($scope, $timeout, imageService) {
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

  $scope.$watch(function () { return imageService.getImages(); }, function (newValue, oldValue) {
       if (newValue !== oldValue) $scope.images.push(newValue.last);
   });

  $scope.add_photo = function(){
        imageService.addImage({src: 'img/img6.jpg', id: 6});
    };

    $scope.shuffle = function(){
      for(var j, x, i = $scope.images.length; i; j = Math.floor(Math.random() * i), x = $scope.images[--i], $scope.images[i] = $scope.images[j], $scope.images[j] = x);
      return $scope.images;
  };
  $scope.currentIndex = $scope.images.length - 1;

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

    // timer

    var timer;
    var sliderFunc = function() {
      timer = $timeout(function() {
        // reverse the order
        $scope.prev();
        timer = $timeout(sliderFunc, 5000);
      }, 5000);
    };

    sliderFunc();

    $scope.$on('$destroy', function() {
      $timeout.cancel(timer); // when the $scope is getting destroyed, cancel the timer
    });
});