angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

    //Add a listing
    $scope.addListing = function() {
	     $scope.listings.push($scope.newListing);
        $scope.newListing = {};
    };

    //delete a listing
    $scope.deleteListing = function(id) {
	     $scope.listings.splice(index, 1);

    };

    //show details of a listing
    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);
