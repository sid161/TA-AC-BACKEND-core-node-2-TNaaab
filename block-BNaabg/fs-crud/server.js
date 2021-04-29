var http = require('http');
var fs = require('fs');
var qs = require('qs');
var url = require('url');

var server = http.createServer(handleRequest);
var userPath = __dirname + "/users/"

function handleRequest(req,res){
var parsedUrl = url.parse(req.url, true);
var store = "";
req.on("data", (chunk) => {
store = store + chunk;
})
req.on('end', () => {
if(req.method === "POST" && req.url === "/users"){
    var username = JSON.parse(store).username;
    fs.open(userPath + username + '.json', 'wx', (err,fd) => {   // to open file and wx to ensure username not repeating
    if(err) return console.log(err)
    fs.writeFile(fd, store, (err) => {
    if(err) return console.log(err);                     // here fd represents file which we going to send
    fs.close(fd, () => {
        res.end(`${username} was created succesfully`);
    })

    })
        
    })
}

    if(req.method === "GET" && parsedUrl.pathname === "/users"){
       // console.log(parsedUrl); 
        var username = parsedUrl.query.user  // extract username
        fs.readFile(userPath + username + '.json' , (err,content) => {
            res.setHEader('Content-Type', 'application/json')
            res.end(content);
        })

    }

    if(req.method === "PUT" && parsedUrl.pathname === "/users"){
        var username = parsedUrl.query.user // extract username
        fs.open(userPath + username + '.json', 'r+', (err, fd) => {
            if(err) return console.log(err)
            fs.truncate(fd, (err) => {
                if(err) return console.log(err);
                fs.writeFile(fd, store, (err) => {
                    if(err) return console.log(err);
                    fs.close(fd, () => {
                        res.end(`${username} updated succesfully`)
                    })
                })
            })
        })
    }

    if(req.method === "DELETE" && parsedUrl.pathname === '/users'){
        var username = parsedUrl.query.user  // extract username
        fs.unlink(userPath + username + '.json', (error) => {
            if(err) return console.log(err);
            res.end(`${username} is deleted`);
        })
    }

        res.statusCode = 404;
        return res.end("page not found");

})

}

server.listen(3300, () => {
    console.log("Server listening on port 3300")
})