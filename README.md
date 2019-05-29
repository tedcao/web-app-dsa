# web-app-dsa

Development Environment building

dsa: front end folder - check detail information in readme.md
dsa-api: back end folder - check detail information in readme.md

Installation Instruction:

Node.js Version: v10.15.3
Mondodb installation:
MongoDB shell version v4.0.3
git version: 7ea530946fa7880364d88c8d8b6026bbc9ffa48c
allocator: system
modules: none
build environment:
distarch: x86_64
target_arch: x86_64

Environment Set up:

1. Enable the NodeSource repository with the following curl command:
   \$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

2. Once the NodeSource repository is enabled, install Node.js and npm by typing:
   \$ sudo apt install nodejs

3. Use \$node --version and \$npm --version to confirm the version
   \$sudo npm update -g to update npm

4. Install Mongodb (if not installed before)
   sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   //start the mongodb server
   sudo service mongod start
   vim /var/log/mongodb/mongod.log //check for [initandlisten] waiting for connections on port 27017

// first time run the application

5. FTP the file into the server. - do not move node_modules folder and package-lock.json file

6. navigate to dsa-api/src foler, run
   sudo npm i -g nodemon
   sudo npm install
   sudo nodemon index --run the dsa-api server

7. open another command
   navigate to dsa foler, run
   npm install
   npm start

8. Access <Serverip>:3000

Regular process to start up the app:
Start the mongodb: sudo mongod
navigate to dsa:
sudo npm start
navigate to dsa-api
sudo nodemon index
