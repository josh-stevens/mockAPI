# Mock API Creator
This package will launch a minimalistic local API that can be used to create mock responses for a front end application to consume. The user inputs an example JSON body of what they want the endpoint response to be. The endpoints respond to POST requests. Any JSON value in the example body that is a number will be a random number between 0 and 100 in the response. This behavior can be altered in the createResponse.js file.

## Getting Started
This API requires a copy of MongoDB to be installed and running on your localhost. It will store endpoints in a collection called 'mockdb'. If you need to change the collection name to something else, it can be changed in the endpointModel.js file where the mongoose.connect() function is called.

First, clone the repo and run `npm install`. When the dependencies are installed, run `npm start` from the package's root directory. This will launch a server listening on port 8080. If you are using port 8080 for another process, change the port variable defined at the top of server.js

If you point your browser to <http://localhost:8080>, you can access a dashboard for seeing all current endpoints, creating new endpoints, testing endpoints, and deleting endpoints. To get a response directly from the endpoints, send a POST request to `http://localhost:8080/api/{endpoint}`
