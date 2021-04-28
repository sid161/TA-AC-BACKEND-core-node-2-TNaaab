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
          
          var parsedData = JSON.parse(store);
          res.setHeader('Content-type', "text/html")
          res.end(`<h2>${parsedData.name}</h2>`);
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