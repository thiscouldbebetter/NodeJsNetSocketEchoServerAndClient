
var net = require("net");
var readline = require("node:readline");

console.log("Socket Test - Echo Client");

console.log
(
	"This program prompts the user for input, "
	+ "sends that input to a server, "
	+ "then displays the server's response, "
	+ "which should be an echo of what was sent."
);

var readlineInterface = readline.createInterface
(
	{
		input: process.stdin,
		output: process.stdout
	}
);

var socketToServer = net.Socket();
var portToConnectTo = 8080;
console.log("Connecting to server at port " + portToConnectTo + "...");
socketToServer.connect(portToConnectTo);
socketToServer.on
(
	"data",
	dataFromServer =>
	{
		console.log("Received: " + dataFromServer);
		promptUserForInputInRecursiveLoop
		(
			readlineInterface, socketToServer
		);
	}
);

promptUserForInputInRecursiveLoop
(
	readlineInterface, socketToServer
);

function promptUserForInputInRecursiveLoop
(
	readlineInterface, socketToServer
)
{
	readlineInterface.question
	(
		"Enter a message to be sent to the server, or '/quit' to quit: ",
		messageToSendToServer =>
		{
			if (messageToSendToServer == "/quit")
			{
				console.log("Quitting.");
				socketToServer.end();
				readlineInterface.close();
			}
			else
			{
				console.log("Sending: " + messageToSendToServer);
				socketToServer.write(messageToSendToServer);
			}
		}
	);

}

