# Mock API Creator
This package will launch a minimalistic local API that can be used to create mock responses for a front end application to consume.

## Getting Started
This API requires a copy of MongoDB to be installed and running on your localhost. It will store endpoints in a collection called 'mockdb'. If you need to change the collection name to something else, it can be changed in the endpointModel.js file where the mongoose.connect() function is called.

First, clone the repo and run `npm install`. When the dependencies are installed, run `npm start` from the package's root directory. This will launch a server listening on port 8080. If you are using port 8080 for another process, change the port variable defined at the top of server.js
