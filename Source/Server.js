
var net = require("node:net");

console.log("Socket Test - Reversing Echo Server");

console.log
(
	"This program creates a server "
	+ "that waits for incoming client connections, "
	+ "logs their content, "
	+ "reverses the order of the content string, "
	+ "and echoes that back to the client."
);

var commandLineArguments = process.argv;

console.log("Arguments: " + commandLineArguments.slice(2).join(", ") );

var server = net.createServer
(
	socketToClient =>
	{
		console.log("A client has just connected.");

		socketToClient.on
		(
			"data",
			dataReceivedAsBuffer =>
			{
				var dataReceived = dataReceivedAsBuffer.toString();
				console.log("Received: " + dataReceived);
				var dataToSend = "";
				for (var i = 0; i < dataReceived.length; i++)
				{
					var dataChar = dataReceived[i];
					dataToSend = dataChar + dataToSend;
				}
				console.log("Sending: " + dataToSend);
				socketToClient.write(dataToSend);
			}
		);
	}
);

var argPort = commandLineArguments.find(x => x.startsWith("--port=") );
var portToListenOn =
	argPort == null
	? 8080
	: parseInt(argPort.split("=")[1]);

console.log("Listening on port " + portToListenOn + "...");

server.listen(portToListenOn);
