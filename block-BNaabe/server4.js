var http = require('http');
var qs = require('querystring');

var server = http.createServer(handleRequest)

function handleRequest(req,res){
    var dataFormat = req.headers("content-type")
  var store = '';
  req.on('data' , (chunk) => {
      store = store + chunk
  })

  req.on('end', () => {
      if(dataFormat === "application/json"){
          res.setHeader('Content-type', "text/html")
          var parsedData = JSON.parse(store);
          res.end(store);
      }

      if(dataFormat === "application/x-www-form-urlencoded"){
        res.setHeader('Content-type', "text/html")
          var parsedData = qs.parse(store);
          res.end(JSON.stringify(parsedData));
      }
  })
}

server.listen(3220, () => {
    console.log("Server listening on port 3220")
})