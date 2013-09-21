var coord = [55.7026, 21.1352];
$(function(){
    var map = L.map('map').setView(coord, 13);
    L.tileLayer('http://{s}.tile.cloudmade.com/8c987a18d65b4a50b31fd567f87ba4c3/997/256/{z}/{x}/{y}.png', {
        attribution: '',
        maxZoom: 18
    }).addTo(map);
    L.marker(coord).bindPopup('Охрененная резиденция в виде домика у моря для <b>Павла Михайловича</b> и <b>Светланы Валерьевны</b>').addTo(map);
});


function MapCtrl($scope){
    $scope.cityName = 'Klaipėda';
    $scope.address = '';
    $scope.refresh = function(){

      $scope.address = '';
    };
};