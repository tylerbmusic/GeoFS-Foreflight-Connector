const http = require("http");
const dgram = require("dgram");
const url = require("url");

const PORT = 80; //HTTP port
const UDP_PORT = 49002;

const socket = dgram.createSocket("udp4");

socket.bind(() => {
  socket.setBroadcast(true);
});

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  const parsed = url.parse(req.url, true);

  if (parsed.pathname === "/udp") {
    const str = parsed.query.str;

    if (!str) {
      res.writeHead(400);
      return res.end("Missing ?str=");
    }

    const message = Buffer.from(str);
    console.log("Received: " + str);

    socket.send(message, 0, message.length, UDP_PORT, "255.255.255.255", (err) => {
      if (err) {
        res.writeHead(500);
        return res.end("UDP send failed");
      }

      res.writeHead(200);
      res.end("Sent");
    });
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(PORT, () => {
  console.log(`Server started. Press Ctrl+C (or Cmd+C, probably) to stop the server.`);
});