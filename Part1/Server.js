// Simple web server for testing purpose
//PROG2005 Programmimng Mobile Systems

var port = 8080; // http port for listening
console.log("Listening on port " + port + ".");

var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
var querystring = require("querystring");

var requests = 0; // keep count of requests

var server = http
  .createServer(function (req, res) {
    requests++;
    console.log(">>> " + requests + ": " + req.url); // log the request URL

    // Add CORS headers to all responses
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight requests
    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    var pathname = url.parse(req.url).pathname; // extract the path name from the URL

    // Set the base directory to public
    let filePath = path.join(
      __dirname,
      "public",
      pathname === "/" ? "index.html" : pathname
    );

    if (req.method == "POST") {
      // also log HTTP POST data on console
      var data = "";
      req.on("data", function (d) {
        // save all data events
        data += d;
      });
      req.on("end", function () {
        // when end of data write to console
        console.log(data);
      });
    }

    // now form the HTTP response to send to the client
    fs.stat(filePath, function (err, stat) {
      if (err) {
        console.log(err.code + ": " + filePath); //       log all of the error object
        res.writeHead(404, {
          "Content-type": "text/html",
          "Access-Control-Allow-Origin": "*",
        });
        res.end();
        return;
      } else if (stat.isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }
      fs.readFile(filePath, function (err, data) {
        // does file exist?
        if (err) {
          // NO->  bad path name
          console.log(err.code + ": " + filePath); //       log all of the error object
          res.writeHead(404, {
            "Content-type": "text/html",
            "Access-Control-Allow-Origin": "*",
          });
        } else {
          // YES-> file exists so send it back to client
          let headers = {
            "Access-Control-Allow-Origin": "*",
          };

          if (pathname.endsWith(".css")) {
            headers["Content-type"] = "text/css";
          } else if (pathname.endsWith(".js")) {
            headers["Content-type"] = "text/javascript";
          } else {
            headers["Content-type"] = "text/html";
          }

          res.writeHead(200, headers);
          res.write(data);
        }
        res.end();
      });
    });
  })
  .listen(port); // listen on configured port

//
// print some interface information
//
var ipList = require("os").networkInterfaces(); // list of interfaces
for (var device in ipList) {
  // for each device in the list of interfaces
  var ipData = ipList[device];
  console.log("Interface " + device); // header for each device
  for (var j = 0; j < ipData.length; j++) {
    // for each interface of device print infor
    console.log(
      "    " +
        (ipData[j].internal ? "INTERNAL " : "EXTERNAL ") +
        ipData[j].family +
        ": " +
        ipData[j].address
    );
  }
}
