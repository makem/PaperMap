var request = require('request');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.setHeader('Access-Control-Allow-Origin','http://a.tile.cloudmade.com');
  res.render('index', { title: 'Express', pretty: true  });
};

exports.coordinates = function(req, res){
    var address = req.param('address');
    console.log("Geocoordinates for "+address);
    request({url:'http://maps.google.com/maps/api/geocode/json',
             qs:{address:address, sensor:false}}, function(err, response, body) {
        if(err) { console.log(err); return; }
        var result = JSON.parse(body);
        if(result.status == 'OK'){
            var location = result.results[0].geometry.location;
           res.send({success:true, location: location});
        }
        console.log("Get response: " + response.statusCode);
        res.send({success:false});

    });
};