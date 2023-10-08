const express = require('express');
const appServer = express();
const path = require('path');
const credentialVerifier = require('./credentialVerifier');

const host = 'localhost';
const port = 3030;

appServer.use(express.static(__dirname));
appServer.use(express.json());

appServer.get('/', (clientRequire, clientResponse) => {
  clientResponse.sendFile(path.join(__dirname, 'src', 'pages', 'login.html'));
});

appServer.get('/favicon.ico', (clientRequire, clientResponse) => clientResponse.status(204));

appServer.post('/verifier',async (clientRequire, clientResponse) => {
    const userData = clientRequire.body;
    const user = userData.userValue;
    const password = userData.passwordValue;

    const status = await credentialVerifier.verifier(user,password);
    try{
      clientResponse.status(200);
      clientResponse.json(status);
    }catch(error){
      clientResponse.status(500);
      clientResponse.send(error)
    }
});

appServer.listen(port, host, () => {
  console.log(`Server is running in the port: ${port}`);
});
