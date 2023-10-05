require("dotenv").config();
const ejs = require("ejs")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");




// fichier ./secured-server.js
import https from 'https';
import fs from 'fs';

// chargement des certificats
const privateKey  = fs.readFileSync('./certs/certificat.key', 'utf8');
const certificate = fs.readFileSync('./certs/certificat.crt', 'utf8');

console.log(privateKey)
console.log(certificate)

// création du serveur HTTPS
const credentials = {
                      key : privateKey,
                      cert : certificate
                    };
const securedHttpsServer = https.createServer(
  credentials,
  (request, response) => {
  	// création et envoi de la réponse
  	response.writeHead(200, {"Content-Type": "text/html"});
  	response.write('<h1>HTTPS secured server</h1>');
	  response.end();
  }
);

securedHttpsServer.listen(8081);