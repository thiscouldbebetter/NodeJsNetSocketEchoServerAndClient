
var net = require("node:net");

console.log("Socket Test - Echo Server");

console.log
(
	"This program creates a server "
	+ "that waits for incoming client connections, "
	+ "logs their content, "
	+ "and echoes that content back to the client."
);

var server = net.createServer
(
	socketToClient =>
	{
		console.log("A client has just connected.");

		socketToClient.on
		(
			"data",
			dataReceived =>
			{
				console.log("Received: " + dataReceived);
				console.log("Sending: " + dataReceived);
				socketToClient.write(dataReceived);
			}
		);
	}
);

var portToListenOn = 8080;
console.log("Listening on port " + portToListenOn + "...");

server.listen(portToListenOn);
