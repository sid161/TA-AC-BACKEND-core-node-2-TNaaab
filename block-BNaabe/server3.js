var http = require('http');
var qs = require('querystring');

var server = http.createServer(handleRequest);


function handleRequest(req,res){
    var dataFormat = req.headers('Content-Type')
    let store = '';
   req.on('data', (chunk) => {
       store = store + chunk;
   })

    req.on('end', () => {
        if(dataFormat === 'application/JSON'){
         var parsedData = JSON.parse(store);
         res.end(store);
        }

        if(dataFormat === 'application/x-www-form-urlencoded'){
            var parsedData = qs.parse(store)
            res.end(parsedData);
        }
    })


}


server.listen(9000, () => {
    console.log("Server listeningt on port 9000")
})