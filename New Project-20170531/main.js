const http = require('http');
var apiKey = 'b433a158b5f4f8f1';
var state = process.argv.slice(3);
var city = process.argv.slice(2);

http.get('http://api.wunderground.com/api/' + apiKey + '/conditions/q/' + state + '/' + city + '.json', function(res) {

    const contentType = res.headers['content-type'];
    
    var error;
    
    if (res.statusCode !== 200) {
        error = new Error('Request failed \n: ${statusCode}');
    }
    
    if (error) {
        console.error(error.message);
        return;
    }
    
    var data ='';
    res.on('data', function (data1) {data += data1; });
    
    res.on('end', function() {
        try {
            const parsedData = JSON.parse(data);
            console.log(parsedData);
            
        } catch (e) {console.error(e.message)};
    });
}).on('error', function (e) {
  console.error('Got error: ${e.message}');

});