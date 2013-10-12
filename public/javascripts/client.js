var coord = [55.7026, 21.1352];
var map;
var scope;

function MapCtrl($scope, $http){
    scope = $scope;
    $scope.cityName = 'Klaipėda';
    $scope.address = '';
    $scope.points = [];
    $scope.mapWidth = 500;
    $scope.mapHeight = 500;
    $scope.width = 500;
    $scope.height = 500;


    $scope.changeMapSize = function(){
        $scope.mapHeight = $scope.height;
        $scope.mapWidth = $scope.width;
        map.invalidateSize();
    };
    $scope.generateMap = function(){
        if(map){
            map.remove();
        }
        map = L.map('map',{attributionControl: false, zoomControl:false}).setView(coord, 13);
        L.tileLayer('http://{s}.tile.cloudmade.com/8c987a18d65b4a50b31fd567f87ba4c3/997/256/{z}/{x}/{y}.png', {
            maxZoom: 18
        }).addTo(map);
        if($scope.points.length > 0){
            $scope.points.forEach(function(point){
               addPointToMap(point);
            });
        }
    };
    $scope.refresh = function(){

      $scope.address = '';
    };

    $scope.fullAddress = function(){
      return $scope.cityName +", "+$scope.address;
    };
    function addPointToMap(point){
        var icon =  L.divIcon({className: 'rounded-icon', html: '<span>'+point.number+'</span>', iconSize: new L.Point(20,20)});
        point.marker = L.marker([point.location.lat, point.location.lng],{icon: icon}).bindPopup(point.fullAddress);
        point.marker.addTo(map);
    };
    $scope.add = function(){
        var fullAddress = $scope.fullAddress();
        var point = {name: fullAddress, location:null, state:'locating', number:$scope.points.length+1};
        $scope.points.push(point);
        $http.get('/coordinates',{params:{address:fullAddress}})
            .success(function(result) {
                if(result.success)
                {
                    point.location = result.location;
                    point.fullAddress = fullAddress;
                    point.state = 'located';
                    addPointToMap(point);
                    $scope.address='';
                }
                else{
                    point.state = 'fail';
                }
            })
            .error(function(){
                point.state = 'fail';
            });
    };

    $scope.remove = function(point){
        var i = $scope.points.indexOf(point);
        if(i != -1) {
            $scope.points.splice(i, 1);
            point.marker.setOpacity(0);
        }
    };


    $scope.saveImage = function(){
        leafletImage(map, doImage);
    };



    function doImage(err, url) {
        console.log(url);
/*
        var img = document.createElement('img');
        var dimensions = map.getSize();
        img.width = dimensions.x;
        img.height = dimensions.y;
        img.src = canvas.toDataURL();
        document.getElementById('images').innerHTML = '';
        document.getElementById('images').appendChild(img);
*/
    }
};

$(function(){
    scope.generateMap();
});