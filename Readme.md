NodeJsNetSocketEchoServerAndClient
==================================

The code in this repository runs a server and client
using the Socket object of the Net library of Node.js.


Running
-------

1. Open a command prompt window and run Server-Start-ListenOnPort8080.bat.
2. Open a second command prompt window and run Source/Client-Start-ConnectToLocalhost8080.bat.
3. In the client window, enter a value such as "test".
4. Verify that a reversed echo of the entered value is returned, such as "tset".

As an alternative to running the client, you can communicate with the server by running:

	curl telnet://localhost:8080