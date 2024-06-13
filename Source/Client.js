
var net = require("net");
var readline = require("node:readline");

console.log("Socket Test - Echo Client");

console.log
(
	"This program prompts the user for input, "
	+ "sends that input to a server, "
	+ "then displays the server's response, "
	+ "which should be an reversed echo of what was sent."
);

var commandLineArguments = process.argv;

console.log("Arguments: " + commandLineArguments.slice(2).join(", ") );

var readlineInterface = readline.createInterface
(
	{
		input: process.stdin,
		output: process.stdout
	}
);

var socketToServer = net.Socket();

var argHost = commandLineArguments.find(x => x.startsWith("--host=") );
var hostToConnectTo =
	argHost == null
	? "localhost"
	: argHost.split("=")[1];

var argPort = commandLineArguments.find(x => x.startsWith("--port=") );
var portToConnectTo =
	argPort == null
	? 8080
	: parseInt(argPort.split("=")[1]);

console.log
(
	"Connecting to server at host " + hostToConnectTo
	+ ", port " + portToConnectTo + "..."
);

socketToServer.connect(portToConnectTo, hostToConnectTo);

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

socketToServer.on
(
	"error",
	error =>
	{
		console.log("Error communicating with server: " + error);
	}
)

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

