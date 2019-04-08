# web-app-dsa

Node.js Version: v10.15.3
Express Inatallation: npm install express --save -g
Mondodb installation: MongoDB server version: 4.0.3
Start the mongodb: sudo mongod
database name: dsa; no password.

Start Up environemnt:
sudo Mongod
nevagate to dsa: npm start

var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

// 或者使用最新的对象分隔符语法，你可以这么写：
// var newPlayer = {...player, score: 2};
